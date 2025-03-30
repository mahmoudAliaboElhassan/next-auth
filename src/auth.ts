import NextAuth from "next-auth";
import { prisma } from "./utils/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
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
