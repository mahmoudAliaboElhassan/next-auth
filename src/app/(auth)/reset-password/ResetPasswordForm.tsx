"use client";
// i can get token by useSearchParams directly in client component
import { resetPasswordAction } from "@/app/actions/resetPasswordAction.action";
import { useState } from "react";

import { IoMdLogIn } from "react-icons/io";

function ResetPasswordForm({ token }: { token: string }) {
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("from client ", newPassword);
    resetPasswordAction(token, newPassword);
    setNewPassword(""); // clear the input
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="newPassword">New Password</label>
      <input
        id="newPassword"
        type="password"
        placeholder="new password"
        className="border-2 border-gray-300 p-2 rounded-md w-full mt-2"
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md w-full mt-2"
      >
        <IoMdLogIn />
        reset Password
      </button>
    </form>
  );
}

export default ResetPasswordForm;

// installing prisma and @prisma/client
// npx prisma init
