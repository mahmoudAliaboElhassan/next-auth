"use client";

import { useState } from "react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";
import { loginAction } from "@/app/actions/login";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("from client ", email, password);
    loginAction(email, password);
    setEmail(""); // clear the input
    setPassword(""); // clear the input
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
      <label htmlFor="Password">Password</label>
      <input
        type="password"
        placeholder="password"
        className="border-2 border-gray-300 p-2 rounded-md w-full mt-2"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md w-full mt-2"
      >
        <IoMdLogIn />
        Login
      </button>
      <div className="flex justify-between mt-2">
        <FcGoogle className="text-red-500" size={30} />{" "}
      </div>
      <div className="flex justify-between mt-2">
        <FaGithub className="text-black" size={30} />{" "}
      </div>
    </form>
  );
}

export default LoginForm;

// installing prisma and @prisma/client
// npx prisma init
