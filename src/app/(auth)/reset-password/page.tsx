import Link from "next/link";
import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ResetPasswordForm from "./ResetPasswordForm";

interface ResetPasswordProps {
  // search params has become async in next 15
  searchParams: Promise<{ token: string }>;
}
async function ResetPassword({ searchParams }: ResetPasswordProps) {
  const currentSearchParams = await searchParams;

  return (
    <div>
      <section className="w-2/5">
        <h1>Reset your Password</h1>
        <div className="bg-white shadow-md rounded-md p-5 flex flex-items-center justify-center">
          <ResetPasswordForm token={currentSearchParams.token} />
        </div>
      </section>
    </div>
  );
}
export default ResetPassword;
