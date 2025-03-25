import React from "react";
import { auth } from "@/auth";
import LogOut from "./LogOut";
async function Profile() {
  const session = await auth();
  console.log(session);
  return (
    <div>
      <div>{session && <div>{session.user?.name}</div>}</div>;
      <LogOut />
    </div>
  );
}

export default Profile;
