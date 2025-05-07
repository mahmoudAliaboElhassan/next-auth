"use client";

import { useState } from "react";

import { CiMail } from "react-icons/ci";
import { loginAction } from "@/app/actions/login";
import Link from "next/link";
import { forgotPasswordAction } from "@/app/actions/password.action";

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ email });
    console.log("from client ", email);
    forgotPasswordAction(email);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="">Email</label>
      <input
        type="text"
        placeholder="Email"
        className="border-2 border-gray-300 p-2 rounded-md w-full mt-2"
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md w-full mt-2 cursor-pointer"
      >
        <CiMail />
        Send Email
      </button>

      <div>
        <Link href="/login " className="underline">
          back to login
        </Link>
      </div>
    </form>
  );
}

export default ForgotPasswordForm;

// installing prisma and @prisma/client
// npx prisma init
