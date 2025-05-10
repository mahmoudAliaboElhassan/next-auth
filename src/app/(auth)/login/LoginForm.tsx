"use client";

import { useState } from "react";

import { IoMdLogIn } from "react-icons/io";
import { loginAction } from "@/app/actions/login";
import SocialProviders from "@/app/components/SocialProviders";
import Link from "next/link";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showTwoStep, setShowTwoStep] = useState(false);
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("from client ", email, password);
    loginAction(email, password, code).then((data) => {
      if (!data.success) {
        alert(data.message);
        return;
      }
      alert(data.message);
      if (data.twoStep) {
        setShowTwoStep(true);
      }
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      {showTwoStep ? (
        <>
          <label htmlFor="code">Two Factor Code</label>
          <input
            type="text"
            id="code"
            placeholder="Two Factor Code"
            className="border-2 border-gray-300 p-2 rounded-md w-full mt-2"
            onChange={(e) => setCode(e.target.value)}
          />
        </>
      ) : (
        <>
          <label htmlFor="">Email</label>
          <input
            type="text"
            placeholder="Email"
            className="border-2 border-gray-300 p-2 rounded-md w-full mt-2"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            placeholder="password"
            className="border-2 border-gray-300 p-2 rounded-md w-full mt-2"
            onChange={(e) => setPassword(e.target.value)}
          />
        </>
      )}
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md w-full mt-2"
      >
        <IoMdLogIn />
        {showTwoStep ? "Confirm code" : "Login"}
      </button>
      <SocialProviders />

      <div>
        <Link className="underline text-[blue]" href="forgot-password">
          forgot password{" "}
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;

// installing prisma and @prisma/client
// npx prisma init
