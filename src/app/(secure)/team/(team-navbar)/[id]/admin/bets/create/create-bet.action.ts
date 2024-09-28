"use server";

import { createBetSchema } from "@/validations/bet.schema";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/database/db";
import { authActionClient } from "@/lib/safe-action";

export const createBet = authActionClient.schema(createBetSchema).action(async ({ parsedInput, ctx: { user } }) => {
  const team = await prisma.team.findUnique({
    where: { id: parsedInput.teamId },
    include: { memberships: true },
  });

  if (!team) {
    return {
      success: false,
      message: `L'équipe n'existe pas.`,
    };
  }

  const membership = team.memberships.find((m) => m.userId === user.id);
  if (!membership || (membership.role !== "ADMIN" && membership.role !== "MANAGER")) {
    return {
      success: false,
      message: `Vous n'êtes pas autorisé à modifier les paramètres de l'équipe.`,
    };
  }

  if (!team) {
    return { success: false, message: `Vous n'avez pas les droits pour créer un pari pour cette équipe.` };
  }

  try {
    const { teamId, options, question, ...betData } = parsedInput;

    const newBet = await prisma.bet.create({
      data: {
        ...betData,
        team: { connect: { id: teamId } },
        questionBet: {
          create: {
            question,
            options: {
              createMany: {
                data: options.map((content) => ({ content })),
              },
            },
          },
        },
      },
    });

    revalidatePath(`/team/${teamId}`);
    return {
      success: true,
      message: `Le pari a été créé avec succès.`,
      betId: newBet.id,
    };
  } catch (error) {
    console.error("Erreur lors de la création du pari:", error);
    return { success: false, message: `Une erreur est survenue lors de la création du pari.` };
  }
});
