import React from "react";
import { auth } from "@/auth";
import LogOut from "./LogOut";
import Image from "next/image";
import ToggleTwoStep from "../components/ToggleTwoStep";

async function Profile() {
  const session = await auth();

  console.log("session from profile", session);
  // session here is undefined if not logged in
  // session here is object if logged in

  return (
    <div>
      <p className="mb-5">{JSON.stringify(session)}</p>
      <div>{session && <div>{session.user?.name}</div>}</div>;
      <img src={session?.user?.image as string} alt="my image" />
      <LogOut />
      {session?.user?.id && (
        <ToggleTwoStep
          userId={session?.user?.id}
          isTwoStepEnabled={session?.user.isTwoStepEnableds}
        />
      )}
    </div>
  );
}

export default Profile;
