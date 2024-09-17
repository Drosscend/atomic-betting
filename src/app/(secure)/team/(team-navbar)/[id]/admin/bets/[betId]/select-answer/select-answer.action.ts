"use server";

import { SelectAnswerInput } from "@/validations/bet.schema";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/database/db";
import { calculateOdds } from "@/lib/odds.utils";
import { authActionClient } from "@/lib/safe-action";

export const selectAnswer = authActionClient.schema(SelectAnswerInput).action(async ({ parsedInput, ctx: { user } }) => {
  const { betId, optionId } = parsedInput;

  try {
    const bet = await prisma.bet.findUnique({
      where: { id: betId },
      include: {
        team: { include: { memberships: true } },
        questionBet: { include: { options: true } },
        transactions: { include: { teamMembership: true } },
      },
    });

    if (!bet) {
      return { success: false, message: `Le pari n'existe pas.` };
    }

    const membership = bet.team.memberships.find((m) => m.userId === user.id);
    if (!membership || (membership.role !== "ADMIN" && membership.role !== "MANAGER")) {
      return { success: false, message: `Vous n'êtes pas autorisé à sélectionner la réponse pour ce pari.` };
    }

    if (bet.questionBet?.correctOptionId) {
      return { success: false, message: `Une réponse a déjà été sélectionnée pour ce pari.` };
    }

    const winningTransactions = bet.transactions.filter((t) => t.betOptionId === optionId);
    const totalBetAmount = bet.transactions.reduce((sum, t) => sum + Math.abs(t.coinsAmount), 0);
    const winningBetAmount = winningTransactions.reduce((sum, t) => sum + Math.abs(t.coinsAmount), 0);

    const odds = calculateOdds(bet.transactions, optionId);

    const transactionOperations: Prisma.PrismaPromise<any>[] = [
      prisma.questionBet.update({
        where: { id: bet.questionBet!.id },
        data: { correctOptionId: optionId },
      }),
    ];

    winningTransactions.forEach((transaction) => {
      const winnings = Math.floor(Math.abs(transaction.coinsAmount) * odds);

      transactionOperations.push(
        prisma.teamMembership.update({
          where: { id: transaction.teamMembershipId },
          data: { coins: { increment: winnings } },
        })
      );

      transactionOperations.push(
        prisma.betTransaction.create({
          data: {
            betId: bet.id,
            teamMembershipId: transaction.teamMembershipId,
            coinsAmount: winnings,
            betOptionId: optionId,
            odds: odds,
            transactionType: "WINNINGS",
          },
        })
      );
    });

    await prisma.$transaction(transactionOperations);

    const winRate = (winningBetAmount / totalBetAmount) * 100;

    revalidatePath(`/team/${bet.teamId}/admin/bets`);
    return {
      success: true,
      message: `La réponse a été sélectionnée, les gains ont été distribués et enregistrés avec succès. ${winningTransactions.length} gagnants sur un total de ${bet.transactions.length} participants. Taux de réussite : ${winRate.toFixed(2)}%.`,
    };
  } catch (error) {
    console.error("Erreur lors de la sélection de la réponse et de la distribution des gains:", error);
    return { success: false, message: `Une erreur est survenue lors de la sélection de la réponse et de la distribution des gains.` };
  }
});
