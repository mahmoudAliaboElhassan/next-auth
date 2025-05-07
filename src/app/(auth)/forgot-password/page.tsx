import Link from "next/link";
import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ForgotPasswordForm from "./ForgotPassword";

async function ForgotPassword() {
  return (
    <div>
      <section className="w-2/5">
        <h1>forgot password</h1>
        <div className="bg-white shadow-md rounded-md p-5 flex flex-items-center justify-center">
          <p>
            <ForgotPasswordForm />
          </p>
        </div>
      </section>
    </div>
  );
}
export default ForgotPassword;
