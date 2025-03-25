"use client";
import React from "react";
import { logOutAction } from "../actions/logout";

function LogOut() {
  return <button onClick={() => logOutAction()}>LogOut</button>;
}

export default LogOut;
