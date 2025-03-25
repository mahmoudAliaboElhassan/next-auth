import { auth as middleware } from "@/auth"; // Ensure this is the NextAuth auth function
import { NextRequest, NextResponse } from "next/server";

export default middleware((req: any) => {
  const { pathname } = req.nextUrl;
  const authRoutes = ["/login", "/register", "/profile"];
  const isUsserLoogedIn = Boolean(req.auth);
  console.log("req", req);
  console.log("auth", middleware);
  if (authRoutes.includes(pathname) && isUsserLoogedIn) {
    return NextResponse.redirect(new URL("/profile", req.nextUrl));
  }
});

export const config = {
  matcher: [
    // "/login", "/register", "/profile"
  ],
};

// age run time
