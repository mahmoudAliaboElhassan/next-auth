import NextAuth from "next-auth";
import { prisma } from "./utils/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import * as bcrypt from "bcryptjs";
import Facebook from "next-auth/providers/facebook";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      async authorize(data) {
        // data here is email and password from from
        // validation comes here
        // const validation=LoginSchema.safeParse(data)
        const { email, password } = data;
        const user = await prisma.user.findUnique({
          where: { email: email as string },
        });
        if (!user || !user.password) {
          // logging with google provider or github will not make password
          // so i make condition here user.password
          return null;
        }
        const isPasswordMatch = await bcrypt.compare(
          password as string,
          user.password
        );
        if (isPasswordMatch) {
          return user;
        } else return null;
      },
    }),
  ],
});

// credential means email and password
