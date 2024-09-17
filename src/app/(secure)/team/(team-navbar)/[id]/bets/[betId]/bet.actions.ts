"use server";

import { placeBetSchema } from "@/validations/bet.schema";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/database/db";
import { authActionClient } from "@/lib/safe-action";

export const placeBet = authActionClient.schema(placeBetSchema).action(async ({ parsedInput: { betId, optionId, coinsAmount }, ctx: { user } }) => {
  try {
    console.log(`Placing bet for user ${user.id} on bet ${betId} with option ${optionId} and ${coinsAmount} coins`);
    const bet = await prisma.bet.findUnique({
      where: { id: betId },
      include: { questionBet: { include: { options: true } }, transactions: true },
    });

    if (!bet) {
      return { success: false, message: `Le pari n'existe pas.` };
    }

    const teamMembership = await prisma.teamMembership.findFirst({
      where: { userId: user.id, teamId: bet.teamId },
    });

    if (!teamMembership) {
      return { success: false, message: `Vous n'êtes pas membre de cette équipe.` };
    }

    if (teamMembership.coins < coinsAmount) {
      return { success: false, message: `Vous n'avez pas assez de jetons pour placer ce pari.` };
    }

    const existingTransaction = await prisma.betTransaction.findFirst({
      where: { betId, teamMembershipId: teamMembership.id },
    });

    if (existingTransaction && existingTransaction.betOptionId !== optionId) {
      return { success: false, message: `Vous avez déjà parié sur une autre option pour ce pari.` };
    }

    const totalCoins = bet.transactions.reduce((sum, t) => sum + t.coinsAmount, 0) + coinsAmount;
    const optionCoins = bet.transactions.filter((t) => t.betOptionId === optionId).reduce((sum, t) => sum + t.coinsAmount, 0) + coinsAmount;
    const odds = totalCoins / optionCoins;

    await prisma.$transaction([
      prisma.betTransaction.create({
        data: {
          betId,
          teamMembershipId: teamMembership.id,
          coinsAmount: -coinsAmount,
          betOptionId: optionId,
          odds,
        },
      }),
      prisma.teamMembership.update({
        where: { id: teamMembership.id },
        data: { coins: { decrement: coinsAmount } },
      }),
    ]);

    revalidatePath(`/team/${bet.teamId}`);
    return { success: true, message: `Votre pari a été placé avec succès.` };
  } catch (error) {
    console.error("Erreur lors du placement du pari:", error);
    return { success: false, message: `Une erreur est survenue lors du placement de votre pari.` };
  }
});
