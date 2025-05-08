import NextAuth from "next-auth";
import { prisma } from "./utils/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async jwt({ token }) {
      token.newField = "new value"; // here we can add custom properties to token object
      console.log("jwt callback", token);
      return token;
    },
    // when logging in, this callback is called
    // when logging out, this callback is called
    // next-auth make jwt and verify it
    // sub in token is id of user
    async session({ session, token }) {
      console.log("session callback", { session, token });
      // here we can add custom properties to session object
      // like user id or other properties
      if (session.user && token.sub) {
        session.user.id = token.sub;
        const user = await prisma.user.findUnique({ where: { id: token.sub } });
        if (user) {
          session.user.role = user.role;
          session.user.isTwoStepEnableds = user.isTwoStepEnabled;
        }
      }
      session.user.image = token.picture; // here we can add custom properties to session object
      // here we can add custom properties to session object
      return session;
    },
    async redirect({ url, baseUrl }) {
      // When a user completes an authentication action, such as signing in, NextAuth automatically redirects them to a URL. By default, it redirects users back to the page they came from or a default page      if (url.startsWith(baseUrl)) {
      console.log("redirect callback", { url, baseUrl });
      if (url === `${baseUrl}/login`) return `${baseUrl}/profile`;
      else {
        return baseUrl; // Default to home page if redirect URL is external
      }
    },
    // it is as layer of security
    // next auth will not make user that is not verified to login
    async signIn({ user, account }) {
      // signIn here works for every login providers or credentials
      // return true; // make user login
      // // return false will not be able to login and will throw execption

      if (account?.provider !== "credentials") {
        return true;
        // make github google provider login
      }

      console.log("User form callback", user);

      const userFromDb = await prisma.user.findUnique({
        where: { id: user.id },
      });

      if (!userFromDb?.emailVerified) {
        console.log("User from db", userFromDb);
        return false;
      } else {
        return true;
      }
    },
  },
  events: {
    async linkAccount({ user, account, profile }) {
      console.log("user form events", user);
      await prisma.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});

// credential means email and password

// make a problem in edge
// logging between client and server website server uploaded to
// take some time as distance is very high
// edge runtime
// serverless function
// prisma does not work in edge runtime
// edge runtime is  serverless function which means
// it is not a server
// edge compatiblity is not available in prisma
