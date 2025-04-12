import type { NextAuthConfig } from "next-auth";
import { prisma } from "./utils/prisma";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import Gooole from "next-auth/providers/google";
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
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Gooole({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
} satisfies NextAuthConfig;

// github => developer setting in github website =>oAuth Apps
// Authorization callback URL => api/auth/providers

// google => google cloud console => api and services => oAuth consent screen
// external
// api and services => credentials => create credential =>oAuth client id

// may user login with google and github which throw execption
// that next-auth handle it

// email verification will be for credentials only
// and with github or google it will be verified
