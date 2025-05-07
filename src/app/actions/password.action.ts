"use server";
import { sendForgotPassworToken } from "@/mail";
import { generateForgotPasswordToken } from "@/utils/generateToken";
import { prisma } from "@/utils/prisma";
import { ActionType } from "@/utils/types";

export const forgotPasswordAction = async (
  email: string
): Promise<ActionType> => {
  try {
    console.log("email from server", email);
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return { success: false, message: "this user is not exists" };
    }

    const resetPasswordToken = await generateForgotPasswordToken(email);
    await sendForgotPassworToken(email, resetPasswordToken.token);
    return {
      success: true,
      message: "email sent check your email to reset password",
    };
  } catch (error) {
    console.log("error ", error);
    return { success: false, message: "something error happened" };
  }
};
