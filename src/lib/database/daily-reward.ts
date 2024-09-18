import { cache } from "react";
import { prisma } from "@/lib/database/db";

export type DailyRewardMembershipStatus = {
  id: string;
  lastDailyReward: Date | null;
  consecutiveDays: number;
  coins: number;
  canClaim: boolean;
};

export const getDailyRewardMembershipStatus = cache(async (userId: string, teamId: string): Promise<DailyRewardMembershipStatus | null> => {
  const membership = await prisma.teamMembership.findUnique({
    where: { userId_teamId: { userId, teamId } },
    select: { id: true, lastDailyReward: true, consecutiveDays: true, coins: true },
  });

  if (!membership) {
    return null;
  }

  const now = new Date();
  const canClaim = !membership.lastDailyReward || membership.lastDailyReward.getDate() !== now.getDate();

  return {
    ...membership,
    canClaim,
  };
});
