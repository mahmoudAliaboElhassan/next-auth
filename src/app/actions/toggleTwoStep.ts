"use server";

import { prisma } from "@/utils/prisma";
import { ActionType } from "@/utils/types";

export async function ToggleTwoStepAction(
  userId: string,
  isEnabled: boolean
): Promise<ActionType> {
  try {
    console.log("from server", userId, userId);
    await prisma.user.update({
      where: { id: userId },
      data: {
        isTwoStepEnabled: isEnabled,
      },
    });
    console.log("done");
    return {
      success: true,
      message: `two step is ${isEnabled ? "on" : "off"}`,
    };
  } catch (error) {
    console.log("error", error);
    return { success: true, message: "error has Happened" };
  }
}
