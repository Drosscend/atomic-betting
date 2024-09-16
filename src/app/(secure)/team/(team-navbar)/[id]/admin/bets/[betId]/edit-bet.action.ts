"use server";

import { editBetSchema } from "@/validations/bet.schema";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/database/db";
import { authActionClient } from "@/lib/safe-action";

export const editBet = authActionClient.schema(editBetSchema).action(async ({ parsedInput, ctx: { user } }) => {
  const { betId, options, question, ...betData } = parsedInput;

  const existingBet = await prisma.bet.findUnique({
    where: { id: betId },
    include: { team: { include: { memberships: true } }, questionBet: { include: { options: true } } },
  });

  if (!existingBet) {
    return { success: false, message: `Le pari n'existe pas.` };
  }

  const membership = existingBet.team.memberships.find((m) => m.userId === user.id);
  if (!membership || (membership.role !== "ADMIN" && membership.role !== "MANAGER")) {
    return {
      success: false,
      message: `Vous n'êtes pas autorisé à modifier ce pari.`,
    };
  }

  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.bet.update({
        where: { id: betId },
        data: betData,
      });

      if (existingBet.type === "QUESTION") {
        await prisma.questionBet.update({
          where: { betId: betId },
          data: { question: question },
        });

        // Supprimer les options existantes
        await prisma.betOption.deleteMany({
          where: { questionBetId: existingBet.questionBet!.id },
        });

        // Créer les nouvelles options
        await prisma.betOption.createMany({
          data: options.map((content) => ({
            content,
            questionBetId: existingBet.questionBet!.id,
          })),
        });
      }
    });

    revalidatePath(`/team/${existingBet.teamId}/bets`);
    return {
      success: true,
      message: `Le pari a été modifié avec succès.`,
      betId: betId,
    };
  } catch (error) {
    console.error("Erreur lors de la modification du pari:", error);
    return { success: false, message: `Une erreur est survenue lors de la modification du pari.` };
  }
});
