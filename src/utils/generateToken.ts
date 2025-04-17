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
