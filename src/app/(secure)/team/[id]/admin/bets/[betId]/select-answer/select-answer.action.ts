"use server";

import { SelectAnswerInput } from "@/validations/bet.schema";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/database/db";
import { authActionClient } from "@/lib/safe-action";

export const selectAnswer = authActionClient.schema(SelectAnswerInput).action(async ({ parsedInput, ctx: { user } }) => {
  const { betId, optionId } = parsedInput;

  try {
    const bet = await prisma.bet.findUnique({
      where: { id: betId },
      include: { team: { include: { memberships: true } }, questionBet: true },
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

    await prisma.questionBet.update({
      where: { id: bet.questionBet!.id },
      data: { correctOptionId: optionId },
    });

    revalidatePath(`/team/${bet.teamId}/admin/bets`);
    return { success: true, message: `La réponse a été sélectionnée avec succès.` };
  } catch (error) {
    console.error("Erreur lors de la sélection de la réponse:", error);
    return { success: false, message: `Une erreur est survenue lors de la sélection de la réponse.` };
  }
});
