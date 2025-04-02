"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

// import { IoMdLogIn } from "react-icons/io";
import { BsPersonPlus } from "react-icons/bs";
import { useState } from "react";
import { signUpAction } from "@/app/actions/signup";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("from client ", email, password, userName);
    signUpAction(userName, email, password).then((result) => {
      setLoading(true);
      if (result?.success) {
        alert(result.message);
        setLoading(false);
      } else {
        alert(result?.message);
        setLoading(false);
      }
    });
    setUserName(""); // clear the input
    setEmail(""); // clear the input
    setPassword(""); // clea  r the input
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="">UserName</label>
      <input
        type="text"
        placeholder="UserName"
        className="border-2 border-gray-300 p-2 rounded-md w-full mt-2"
        onChange={(e) => setUserName(e.target.value)}
      />

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
        style={{ cursor: "pointer" }}
        disabled={loading}
      >
        <BsPersonPlus />
        SignUp
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

export default RegisterForm;

// we make npm run build
// then npm start
// problem is host not trusted
