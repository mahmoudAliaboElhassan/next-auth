"use server";

import { prisma } from "@/utils/prisma";
import { ActionType } from "@/utils/types";
import * as bcrypt from "bcryptjs";

export async function resetPasswordAction(
  token: string,
  newPassword: string
): Promise<ActionType> {
  try {
    console.log("from server ", { token, newPassword });
    const resetPasswordToken = await prisma.resetPasswordToken.findUnique({
      where: { token },
    });
    if (!resetPasswordToken) {
      console.log("not token exists");
      return {
        success: false,
        message: "token does not exist to reset password",
      };
    }
    const isExpired = resetPasswordToken.expires < new Date();
    if (isExpired) {
      console.log("token expired");
      return { success: false, message: "token is expired" };
    }
    const user = await prisma.user.findUnique({
      where: { email: resetPasswordToken.email },
    });
    if (!user) {
      console.log("no user exists");
      return { success: false, message: "user is not exists" };
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
      },
    });
    await prisma.resetPasswordToken.delete({
      where: { id: resetPasswordToken.id },
    });
    console.log("password reset successfully");
    return { success: true, message: "password changed successfully" };
  } catch (error) {
    return {
      success: false,
      message: "something went worng when changing password",
    };
  }
}
