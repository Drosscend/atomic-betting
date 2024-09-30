"use server";

import { cancelJoinRequestSchema } from "@/validations/cancel-join-request.schema";
import { leaveTeamSchema } from "@/validations/leave-team.schema";
import { MembershipStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/database/db";
import { authActionClient } from "@/lib/safe-action";

export const leaveTeam = authActionClient.schema(leaveTeamSchema).action(async ({ parsedInput: { teamId }, ctx: { user } }) => {
  try {
    const team = await prisma.team.findUnique({
      where: { id: teamId },
      include: {
        memberships: {
          where: { userId: user.id },
        },
      },
    });

    if (!team) {
      return {
        success: false,
        message: `L'équipe n'existe pas.`,
      };
    }

    if (team.creatorId === user.id) {
      return {
        success: false,
        message: `Vous ne pouvez pas quitter l'équipe car vous en êtes le créateur.`,
      };
    }

    if (team.memberships.length === 0) {
      return {
        success: false,
        message: `Vous n'êtes pas membre de cette équipe.`,
      };
    }

    await prisma.teamMembership.delete({
      where: {
        userId_teamId: {
          userId: user.id,
          teamId: teamId,
        },
      },
    });

    revalidatePath(`/team`, "layout");

    return {
      success: true,
      message: `Vous avez quitté l'équipe avec succès.`,
      teamId: teamId,
    };
  } catch (error) {
    console.error("Erreur lors de la sortie de l'équipe:", error);
    return {
      success: false,
      message: `Une erreur est survenue lors de la sortie de l'équipe.`,
    };
  }
});

export const cancelJoinRequest = authActionClient.schema(cancelJoinRequestSchema).action(async ({ parsedInput: { teamId }, ctx: { user } }) => {
  try {
    const membership = await prisma.teamMembership.findUnique({
      where: {
        userId_teamId: {
          userId: user.id,
          teamId: teamId,
        },
      },
      include: {
        team: true,
      },
    });

    if (!membership) {
      return {
        success: false,
        message: `Vous n'avez pas de demande d'adhésion en attente pour cette équipe.`,
      };
    }

    if (membership.status !== MembershipStatus.PENDING) {
      return {
        success: false,
        message: `Votre demande d'adhésion n'est pas en attente.`,
      };
    }

    await prisma.teamMembership.delete({
      where: {
        userId_teamId: {
          userId: user.id,
          teamId: teamId,
        },
      },
    });

    revalidatePath(`/team`, "layout");

    return {
      success: true,
      message: `Votre demande d'adhésion à l'équipe ${membership.team.name} a été annulée avec succès.`,
      teamId: teamId,
    };
  } catch (error) {
    console.error("Erreur lors de l'annulation de la demande d'adhésion:", error);
    return {
      success: false,
      message: `Une erreur est survenue lors de l'annulation de la demande d'adhésion.`,
    };
  }
});
