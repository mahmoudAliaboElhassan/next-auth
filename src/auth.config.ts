import type { NextAuthConfig } from "next-auth";
import { prisma } from "./utils/prisma";
import Credentials from "next-auth/providers/credentials";
import * as bcrypt from "bcryptjs";

// Notice this is only an object, not a full Auth.js instance
export default {
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
} satisfies NextAuthConfig;
