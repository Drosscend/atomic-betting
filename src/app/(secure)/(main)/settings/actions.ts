"use server";

import { deleteAccountSchema, deleteSessionSchema, updateUserProfileSchema } from "@/validations/user-settings.schema";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/database/db";
import { authActionClient } from "@/lib/safe-action";

export const updateUserProfile = authActionClient
  .schema(updateUserProfileSchema)
  .action(async ({ parsedInput: { username, biography }, ctx: { user } }) => {
    try {
      await prisma.user.update({
        where: { id: user.id },
        data: { name: username, biography },
      });
      revalidatePath("/", "layout");
      return {
        success: true,
        message: `Votre profil a été mis à jour avec succès.`,
      };
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil utilisateur:", error);
      return {
        success: false,
        message: `Une erreur est survenue lors de la mise à jour de votre profil.`,
      };
    }
  });

export const deleteAccount = authActionClient.schema(deleteAccountSchema).action(async ({ ctx: { user } }) => {
  try {
    // check if the user is the admin of a team
    const teams = await prisma.team.findMany({
      where: {
        memberships: {
          some: {
            userId: user.id,
            role: "ADMIN",
          },
        },
      },
    });
    if (teams.length > 0) {
      return {
        success: false,
        message: `Vous ne pouvez pas supprimer votre compte car vous êtes administrateur d'une ou plusieurs équipes, veuillez d'abord transférer votre rôle d'administrateur ou supprimer les équipes.`,
      };
    }

    await prisma.user.delete({
      where: { id: user.id },
    });
    return {
      success: true,
      message: `Votre compte a été supprimé avec succès.`,
    };
  } catch (error) {
    console.error("Erreur lors de la suppression du compte:", error);
    return {
      success: false,
      message: `Une erreur est survenue lors de la suppression de votre compte.`,
    };
  }
});

export const deleteSession = authActionClient.schema(deleteSessionSchema).action(async ({ parsedInput: { sessionId }, ctx: { user } }) => {
  try {
    const session = await prisma.session.findUnique({
      where: { id: sessionId, userId: user.id },
    });

    if (!session) {
      return {
        success: false,
        message: `La session n'existe pas ou ne vous appartient pas.`,
      };
    }

    await prisma.session.delete({
      where: { id: sessionId },
    });

    revalidatePath("/settings");
    return {
      success: true,
      message: `La session a été supprimée avec succès.`,
    };
  } catch (error) {
    console.error("Erreur lors de la suppression de la session:", error);
    return {
      success: false,
      message: `Une erreur est survenue lors de la suppression de la session.`,
    };
  }
});
