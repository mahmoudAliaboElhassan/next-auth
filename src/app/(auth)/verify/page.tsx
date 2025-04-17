import { checkVerification } from "@/app/actions/checkVerification";
import React from "react";

interface VerifyPageProps {
  // search params has become async in next 15
  searchParams: Promise<{ token: string }>;
}

async function VerifyPage({ searchParams }: VerifyPageProps) {
  const currentSearchParams = await searchParams;
  console.log("currentSearchParams", currentSearchParams);
  checkVerification(currentSearchParams.token);
  return <div className="text-3xl">Your Email has been Verified </div>;
}

export default VerifyPage;
