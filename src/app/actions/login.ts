"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
export async function loginAction(email: string, password: string) {
  // here i make validation and other
  // make try catch and work like endpoints i made before
  try {
    console.log("email from server", email);
    console.log("password from server", password);
    await signIn("credentials", { email, password, redirectTo: "/profile" });
  } catch (error) {
    console.log("error", error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, message: "Invalid credentials" };
        default:
          return { success: false, message: "something went wrong" };
      }
    }
    throw error;
  }
  return { success: true, message: "Logged In Successfully" };
}
