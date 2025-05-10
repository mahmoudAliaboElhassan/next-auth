"use server";

import { signIn } from "@/auth";
import { sendTwoStepToken, sendVerificationToken } from "@/mail";
import {
  generateTwoStepToken,
  generateVerificationToken,
} from "@/utils/generateToken";
import { prisma } from "@/utils/prisma";
import { loginType } from "@/utils/types";
import { AuthError } from "next-auth";

export async function loginAction(
  email: string,
  password: string,
  code?: string
): Promise<loginType> {
  try {
    console.log("email from server", email);
    console.log("password from server", password);
    console.log("code", code);

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.email || !user.password) {
      console.log("user or email or password is not here");
      return { success: false, message: "Invalid Credentials" };
    }

    if (!user.emailVerified) {
      const verifiacationToken = await generateVerificationToken(email);
      await sendVerificationToken(email, verifiacationToken.token);
      return { success: true, message: "Verify your email inbox" };
    }

    if (user.isTwoStepEnabled && user.email) {
      if (code) {
        const twoStepTokenFromDb = await prisma.twoStepToken.findFirst({
          where: { email: user.email },
        });
        console.log("two step token code", twoStepTokenFromDb);
        if (!twoStepTokenFromDb) {
          return { success: false, message: "not token provided" };
        }
        if (twoStepTokenFromDb.token != code) {
          return { success: false, message: "code is not right it is invalid" };
        }
        const isExpired = new Date(twoStepTokenFromDb.expires) < new Date();
        if (isExpired) {
          return { success: false, message: "code sent is expired" };
        }
        await prisma.twoStepToken.delete({
          where: { id: twoStepTokenFromDb.id },
        });
        const twoStepConfirmation =
          await prisma.twoStepConfirmationToken.findUnique({
            where: { userId: user.id },
          });

        if (twoStepConfirmation) {
          await prisma.twoStepConfirmationToken.delete({
            where: { id: twoStepConfirmation.id },
          });
        }
        await prisma.twoStepConfirmationToken.create({
          data: {
            userId: user.id,
          },
        });
      } else {
        const twoStepToken = await generateTwoStepToken(user.email);
        console.log("two step token generated", twoStepToken);
        await sendTwoStepToken(twoStepToken.email, twoStepToken.token);
        return {
          success: true,
          message: "Confirmation Code sent to your email ",
          twoStep: true,
        };
      }
    }

    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!response || response.error) {
      console.log("response for logging");
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
