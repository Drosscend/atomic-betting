"use server";

import { updateMembershipStatusSchema } from "@/validations/membership-status-management.schema";
import { removeUserSchema, updateUserCoinsSchema } from "@/validations/user-management.schema";
import { MembershipRole, MembershipStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/database/db";
import { authActionClient } from "@/lib/safe-action";

export const updateMembershipStatus = authActionClient
  .schema(updateMembershipStatusSchema)
  .action(async ({ parsedInput: { userId, status, teamId }, ctx: { user } }) => {
    try {
      const currentUserMembership = await prisma.teamMembership.findUnique({
        where: {
          userId_teamId: {
            userId: user.id,
            teamId,
          },
        },
      });

      if (currentUserMembership?.role !== MembershipRole.ADMIN && currentUserMembership?.role !== MembershipRole.MANAGER) {
        return {
          success: false,
          message: `Vous n'avez pas l'autorisation de modifier les statuts des invitations.`,
        };
      }

      await prisma.teamMembership.update({
        where: {
          userId_teamId: {
            userId,
            teamId,
          },
        },
        data: {
          status,
        },
      });

      revalidatePath(`/team/${teamId}`);
      return {
        success: true,
        message: status === MembershipStatus.APPROVED ? `L'invitation a été approuvée.` : `L'invitation a été rejetée.`,
      };
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut de l'invitation:", error);
      return {
        success: false,
        message: `Une erreur est survenue lors de la mise à jour du statut de l'invitation.`,
      };
    }
  });

export const updateUserCoins = authActionClient
  .schema(updateUserCoinsSchema)
  .action(async ({ parsedInput: { userId, coins, teamId }, ctx: { user } }) => {
    try {
      const currentUserMembership = await prisma.teamMembership.findUnique({
        where: { userId_teamId: { userId: user.id, teamId } },
      });

      if (currentUserMembership?.role !== MembershipRole.ADMIN && currentUserMembership?.role !== MembershipRole.MANAGER) {
        return {
          success: false,
          message: `Vous n'avez pas l'autorisation de modifier les jetons des utilisateurs.`,
        };
      }

      await prisma.teamMembership.update({
        where: { userId_teamId: { userId, teamId } },
        data: { coins },
      });

      revalidatePath(`/team/${teamId}`);
      return {
        success: true,
        message: `Les jetons de l'utilisateur ont été mis à jour avec succès.`,
      };
    } catch (error) {
      console.error("Erreur lors de la mise à jour des jetons de l'utilisateur:", error);
      return {
        success: false,
        message: `Une erreur est survenue lors de la mise à jour des jetons de l'utilisateur.`,
      };
    }
  });

export const removeUser = authActionClient.schema(removeUserSchema).action(async ({ parsedInput: { userId, teamId }, ctx: { user } }) => {
  try {
    const currentUserMembership = await prisma.teamMembership.findUnique({
      where: { userId_teamId: { userId: user.id, teamId } },
    });

    if (currentUserMembership?.role !== MembershipRole.ADMIN && currentUserMembership?.role !== MembershipRole.MANAGER) {
      return {
        success: false,
        message: `Vous n'avez pas l'autorisation de supprimer des utilisateurs.`,
      };
    }

    await prisma.teamMembership.delete({
      where: { userId_teamId: { userId, teamId } },
    });

    revalidatePath(`/team/${teamId}`);
    return {
      success: true,
      message: `L'utilisateur a été supprimé de l'équipe avec succès.`,
    };
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur:", error);
    return {
      success: false,
      message: `Une erreur est survenue lors de la suppression de l'utilisateur.`,
    };
  }
});
