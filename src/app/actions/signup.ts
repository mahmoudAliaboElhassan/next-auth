"use server";

import { prisma } from "@/utils/prisma";
import * as bcrypt from "bcryptjs";
import { generateVerificationToken } from "@/utils/generateToken";
import { sendVerificationToken } from "@/mail";

export async function signUpAction(
  userName: string,
  email: string,
  password: string
) {
  try {
    // if i work with zod
    // const validation = RegisterScheme.safeParse(data);
    // const { userName, email, password }=validation.data
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (user) {
      console.log("Email Exists");
      return { success: false, message: "User Exists before" };
    }
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    console.log("Hashed", hashed);
    await prisma.user.create({
      data: { name: userName, email, password: hashed },
    });
    const verifiacationToken = await generateVerificationToken(email);
    console.log("verifiacationToken", verifiacationToken);
    // send email
    await sendVerificationToken(email, verifiacationToken.token);
    console.log("user name from server", userName);
    console.log("email from server", email);
    console.log("password from server", password);
    return {
      success: true,
      message: "Email Sent Successfully Verify your email inbox",
    };
  } catch (error) {
    console.log("Error", error);
  }
}
// AUTH_SECRET in env is what encrypt jwt
// we does not make jwt next auth create it
