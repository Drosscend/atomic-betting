"use server";

import { deleteAccountSchema, updateUsernameSchema } from "@/validations/user-settings.schema";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/database/db";
import { authActionClient } from "@/lib/safe-action";

export const updateUsername = authActionClient.schema(updateUsernameSchema).action(async ({ parsedInput: { username }, ctx: { user } }) => {
  try {
    await prisma.user.update({
      where: { id: user.id },
      data: { name: username },
    });
    revalidatePath("/", "layout");
    return {
      success: true,
      message: `Votre nom d'utilisateur a été mis à jour avec succès.`,
    };
  } catch (error) {
    console.error("Erreur lors de la mise à jour du nom d'utilisateur:", error);
    return {
      success: false,
      message: `Une erreur est survenue lors de la mise à jour de votre nom d'utilisateur.`,
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
