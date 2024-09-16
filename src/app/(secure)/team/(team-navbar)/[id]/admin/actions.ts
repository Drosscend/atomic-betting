"use server";

import { deleteTeamSchema, updateTeamSettingsSchema } from "@/validations/team-settings.schema";
import { updateUserRoleSchema } from "@/validations/user-role-management.schema";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/database/db";
import { authActionClient } from "@/lib/safe-action";

export const updateTeamSettings = authActionClient
  .schema(updateTeamSettingsSchema)
  .schema(async (prevSchema) => {
    return prevSchema.extend({ teamId: z.string() });
  })
  .action(async ({ parsedInput: { teamName, defaultCoins, defaultDuration, teamId }, ctx: { user } }) => {
    try {
      const team = await prisma.team.findUnique({
        where: { id: teamId },
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

      await prisma.team.update({
        where: { id: teamId },
        data: {
          name: teamName,
          defaultCoins,
          defaultHoursBet: defaultDuration,
        },
      });
      revalidatePath(`/team`, "layout");
      return {
        success: true,
        message: `Les paramètres de l'équipe ont été mis à jour avec succès.`,
      };
    } catch (error) {
      console.error("Erreur lors de la mise à jour des paramètres de l'équipe:", error);
      return {
        success: false,
        message: `Une erreur est survenue lors de la mise à jour des paramètres de l'équipe.`,
      };
    }
  });

export const deleteTeam = authActionClient
  .schema(deleteTeamSchema)
  .schema(async (prevSchema) => {
    return prevSchema.extend({ teamId: z.string() });
  })
  .action(async ({ parsedInput: { teamId }, ctx: { user } }) => {
    const team = await prisma.team.findUnique({
      where: { id: teamId },
      include: { memberships: true },
    });

    if (!team) {
      return {
        success: false,
        message: `L'équipe n'existe pas.`,
      };
    }

    if (team.creatorId !== user.id) {
      return {
        success: false,
        message: `Vous n'êtes pas autorisé à supprimer l'équipe.`,
      };
    }

    try {
      await prisma.team.delete({
        where: { id: teamId },
      });
      revalidatePath("/team");
      return {
        success: true,
        message: `L'équipe a été supprimée avec succès.`,
      };
    } catch (error) {
      console.error("Erreur lors de la suppression de l'équipe:", error);
      return {
        success: false,
        message: `Une erreur est survenue lors de la suppression de l'équipe.`,
      };
    }
  });

export const getInviteLink = authActionClient.schema(z.string()).action(async ({ parsedInput: teamId }) => {
  return {
    success: true,
    inviteLink: `${process.env.NEXT_PUBLIC_APP_URL}/invite/${teamId}`,
  };
});

export const updateUserRole = authActionClient
  .schema(updateUserRoleSchema)
  .action(async ({ parsedInput: { userId, role, teamId }, ctx: { user } }) => {
    try {
      const currentUserMembership = await prisma.teamMembership.findUnique({
        where: {
          userId_teamId: {
            userId: user.id,
            teamId,
          },
        },
      });

      if (currentUserMembership?.role !== "ADMIN") {
        return {
          success: false,
          message: `Vous n'avez pas l'autorisation de modifier les rôles des utilisateurs.`,
        };
      }

      if (userId === user.id) {
        return {
          success: false,
          message: `Vous ne pouvez pas modifier votre propre rôle.`,
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
          role,
        },
      });

      revalidatePath(`/team/${teamId}/admin`);
      return {
        success: true,
        message: `Le rôle de l'utilisateur a été mis à jour avec succès.`,
      };
    } catch (error) {
      console.error("Erreur lors de la mise à jour du rôle de l'utilisateur:", error);
      return {
        success: false,
        message: `Une erreur est survenue lors de la mise à jour du rôle de l'utilisateur.`,
      };
    }
  });
