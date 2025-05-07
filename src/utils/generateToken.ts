import { prisma } from "./prisma";
import { randomUUID } from "crypto";

export const generateVerificationToken = async (email: string) => {
  const verificationToken = await prisma.verificationToken.findFirst({
    where: { email },
  });
  if (verificationToken) {
    await prisma.verificationToken.delete({
      where: { id: verificationToken.id },
    });
  }
  const newVerficationToken = await prisma.verificationToken.create({
    data: {
      token: randomUUID(), // give me userid random string
      expires: new Date(new Date().getTime() + 3600 * 2 * 1000),
      email,
      //   2 hours of expiration
    },
  });
  return newVerficationToken;
};

// generate reset password token
export const generateForgotPasswordToken = async (email: string) => {
  const resetPasswordToken = await prisma.resetPasswordToken.findFirst({
    where: { email },
  });
  if (resetPasswordToken) {
    await prisma.resetPasswordToken.delete({
      where: { id: resetPasswordToken.id },
    });
  }
  const newResetPasswordToken = await prisma.resetPasswordToken.create({
    data: {
      token: randomUUID(), // give me userid random string
      expires: new Date(new Date().getTime() + 3600 * 2 * 1000),
      email,
      //   2 hours of expiration
    },
  });
  return newResetPasswordToken;
};
