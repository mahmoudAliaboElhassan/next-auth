import authConfig from "./auth.config";
import NextAuth from "next-auth";

import { NextResponse } from "next/server";
const { auth: middleware } = NextAuth(authConfig);

const authRoutes = ["/login", "/register"];
const protectedRoutes = ["/profile"];

export default middleware((req) => {
  const { pathname } = req.nextUrl;
  const isUsserLoogedIn = Boolean(req.auth);
  console.log("req", req);
  console.log("auth", middleware);
  if (authRoutes.includes(pathname) && isUsserLoogedIn) {
    return NextResponse.redirect(new URL("/profile", req.nextUrl));
  }
  if (protectedRoutes.includes(pathname) && !isUsserLoogedIn) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
});

export const config = {
  matcher: [
    // "/login", "/register", "/profile"
  ],
};
