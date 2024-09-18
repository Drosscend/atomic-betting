"use server";

import { createTeamSchema } from "@/validations/create-team.schema";
import { MembershipRole, MembershipStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/database/db";
import { authActionClient } from "@/lib/safe-action";

export const createTeam = authActionClient.schema(createTeamSchema).action(async ({ parsedInput, ctx: { user } }) => {
  if (!user || !user.id) {
    return { success: false, message: `Vous devez être connecté pour créer une équipe.` };
  }

  try {
    const newTeam = await prisma.team.create({
      data: {
        ...parsedInput,
        creatorId: user.id,
        memberships: {
          create: {
            userId: user.id,
            coins: parsedInput.defaultCoins,
            role: MembershipRole.ADMIN,
            status: MembershipStatus.APPROVED,
          },
        },
      },
    });

    revalidatePath(`/`, "layout");

    return {
      success: true,
      message: `L'équipe "${newTeam.name}" a été créée avec succès.`,
      teamId: newTeam.id,
    };
  } catch (error) {
    console.error("Erreur lors de la création de l'équipe:", error);
    return { success: false, message: `Une erreur est survenue lors de la création de l'équipe.` };
  }
});
