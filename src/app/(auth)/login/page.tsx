import Link from "next/link";
import React from "react";
import LoginForm from "./LoginForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

async function Login() {
  const session = await auth();
  if (session) {
    // Redirect to profile page if user is already logged in
    redirect("/profile");
  }
  return (
    <div>
      <section className="w-2/5">
        <div className="bg-white shadow-md rounded-md p-5 flex flex-items-center justify-center">
          <LoginForm />
          <p>
            Do not have an account? <Link href="register">Register</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
export default Login;
