"use server";

import { joinTeamSchema } from "@/validations/invitation-schema";
import { MembershipRole, MembershipStatus } from "@prisma/client";
import { prisma } from "@/lib/database/db";
import { authActionClient } from "@/lib/safe-action";

type JoinTeamStatus = "ALREADY_MEMBER" | "PENDING_APPROVAL" | "JOINED" | "ERROR";

type JoinTeamResult = {
  status: JoinTeamStatus;
  message: string;
};

export const joinTeam = authActionClient
  .schema(joinTeamSchema)
  .action(async ({ parsedInput: { teamId }, ctx: { user } }): Promise<JoinTeamResult> => {
    try {
      if (!user || !user.id) {
        return {
          status: "ERROR",
          message: `Vous devez être connecté pour rejoindre une équipe.`,
        };
      }

      const team = await prisma.team.findUnique({
        where: {
          id: teamId,
        },
      });

      if (!team) {
        return {
          status: "ERROR",
          message: `L'équipe que vous essayez de rejoindre n'existe pas.`,
        };
      }

      const existingMembership = await prisma.teamMembership.findUnique({
        where: {
          userId_teamId: {
            userId: user.id,
            teamId,
          },
        },
      });

      if (existingMembership) {
        if (existingMembership.status === MembershipStatus.APPROVED) {
          return {
            status: "ALREADY_MEMBER",
            message: `Vous êtes déjà membre de cette équipe.`,
          };
        } else if (existingMembership.status === MembershipStatus.PENDING) {
          return {
            status: "PENDING_APPROVAL",
            message: `Votre demande d'adhésion est en attente d'approbation.`,
          };
        }
      }

      await prisma.teamMembership.create({
        data: {
          userId: user.id,
          teamId,
          status: MembershipStatus.PENDING,
          role: MembershipRole.MEMBER,
        },
      });

      return {
        status: "JOINED",
        message: `Votre demande d'adhésion a été soumise et est en attente d'approbation.`,
      };
    } catch (error) {
      console.error("Erreur lors de la tentative de rejoindre l'équipe:", error);
      return {
        status: "ERROR",
        message: `Une erreur est survenue lors de la tentative de rejoindre l'équipe.`,
      };
    }
  });
