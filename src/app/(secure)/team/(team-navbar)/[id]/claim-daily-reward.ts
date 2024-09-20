"use server";

import { dailyRewardSchema } from "@/validations/daily-reward.schema";
import { addDays, isSameDay } from "date-fns";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/database/db";
import { authActionClient } from "@/lib/safe-action";

export const claimDailyReward = authActionClient.schema(dailyRewardSchema).action(async ({ parsedInput, ctx: { user } }) => {
  try {
    const teamMembership = await prisma.teamMembership.findUnique({
      where: {
        userId_teamId: {
          userId: user.id,
          teamId: parsedInput.teamId,
        },
      },
      include: {
        team: true,
      },
    });

    if (!teamMembership) {
      return {
        success: false,
        message: `Vous n'êtes pas membre de cette équipe.`,
      };
    }

    const now = new Date();
    const lastReward = teamMembership.lastDailyReward;

    if (lastReward && isSameDay(lastReward, now)) {
      return {
        success: false,
        message: `Vous avez déjà réclamé votre récompense quotidienne aujourd'hui.`,
      };
    }

    let rewardAmount = teamMembership.team.dailyRewardCoins;
    let newConsecutiveDays = 1;

    if (lastReward && isSameDay(addDays(lastReward, 1), now)) {
      newConsecutiveDays = teamMembership.consecutiveDays + 1;
      if (newConsecutiveDays === 7) {
        rewardAmount += teamMembership.team.streakRewardCoins;
        newConsecutiveDays = 0;
      }
    }

    await prisma.$transaction(async (prisma) => {
      await prisma.teamMembership.update({
        where: { id: teamMembership.id },
        data: {
          coins: { increment: rewardAmount },
          lastDailyReward: now,
          consecutiveDays: newConsecutiveDays,
        },
      });

      await prisma.transaction.create({
        data: {
          teamMembershipId: teamMembership.id,
          coinsAmount: rewardAmount,
          transactionType: "DAILY_REWARD",
        },
      });
    });

    revalidatePath(`/team/${parsedInput.teamId}`);
    return {
      success: true,
      message: `Vous avez réclamé ${rewardAmount} Atomic Coins !`,
    };
  } catch (error) {
    console.error("Erreur lors de la réclamation de la récompense quotidienne:", error);
    return { success: false, message: `Une erreur est survenue lors de la réclamation de la récompense quotidienne.` };
  }
});
