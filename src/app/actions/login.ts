"use server";

import { signIn } from "@/auth";
import { sendVerificationToken } from "@/mail";
import { generateVerificationToken } from "@/utils/generateToken";
import { prisma } from "@/utils/prisma";
import { AuthError } from "next-auth";

export async function loginAction(email: string, password: string) {
  try {
    console.log("email from server", email);
    console.log("password from server", password);

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.email || !user.password) {
      return { success: false, message: "Invalid Credentials" };
    }

    if (!user.emailVerified) {
      const verifiacationToken = await generateVerificationToken(email);
      await sendVerificationToken(email, verifiacationToken.token);
      return { success: true, message: "Verify your email inbox" };
    }

    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!response || response.error) {
      return { success: false, message: "Invalid credentials" };
    }

    return { success: true, message: "Logged In Successfully" };
  } catch (error) {
    console.log("error", error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, message: "Invalid credentials" };
        default:
          return { success: false, message: "Something went wrong" };
      }
    }
    throw error;
  }
}
