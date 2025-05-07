"use server";

import { prisma } from "@/utils/prisma";

export const checkVerification = async (token: string) => {
  const existsToken = await prisma.verificationToken.findFirst({
    where: { token },
  });

  if (!existsToken) {
    return { success: false, message: "token does not exist" };
  }

  const user = await prisma.user.findUnique({
    where: { email: existsToken.email },
  });

  if (!user) {
    return { success: false, message: "user not found" };
  }
  if (existsToken.expires < new Date()) {
    console.log("token has expired");
    // التوكن منتهي الصلاحية
    return { error: "Token has expired" };
  }

  // ✅ Update user's emailVerified field to true
  await prisma.user.update({
    where: { email: existsToken.email },
    data: { emailVerified: new Date() },
  });

  // Optional: delete token after verification
  await prisma.verificationToken.delete({
    where: { id: existsToken.id },
  });

  return { success: true, message: "Email verified successfully" };
};
export const changePassword = async (token: string) => {
  const existsToken = await prisma.resetPasswordToken.findFirst({
    where: { token },
  });

  if (!existsToken) {
    return { success: false, message: "token does not exist" };
  }

  const user = await prisma.user.findUnique({
    where: { email: existsToken.email },
  });

  if (!user) {
    return { success: false, message: "user not found" };
  }
  if (existsToken.expires < new Date()) {
    console.log("token has expired");
    // التوكن منتهي الصلاحية
    return { error: "Token has expired" };
  }

  // ✅ Update user's emailVerified field to true

  await prisma.user.update({
    where: { email: existsToken.email },
    data: { emailVerified: new Date() },
  });

  // Optional: delete token after verification
  await prisma.verificationToken.delete({
    where: { id: existsToken.id },
  });

  return { success: true, message: "Email verified successfully" };
};
