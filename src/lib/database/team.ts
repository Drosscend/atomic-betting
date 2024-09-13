import { MembershipStatus, Prisma, Team } from "@prisma/client";
import { notFound, redirect } from "next/navigation";
import { cache } from "react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/database/db";

export type TeamWithMemberships = Prisma.TeamGetPayload<{
  include: { memberships: true };
}>;

/**
 * Get a team by its ID.
 * @param teamId The team ID.
 * @returns The team with its users.
 */
export const getTeamById = cache(async (teamId: string): Promise<TeamWithMemberships> => {
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in");
  }

  const team = await prisma.team.findFirst({
    where: {
      id: teamId,
      memberships: {
        some: {
          id: session.user.id,
          status: MembershipStatus.APPROVED,
        },
      },
    },
    include: {
      memberships: true,
    },
  });

  if (!team) {
    notFound();
  }

  return team;
});

/**
 * Get a team by its ID without authentication.
 * @param teamId The team ID.
 * @returns The team with its users.
 */
export const getTeamByIdUnsecure = cache(async (teamId: string): Promise<TeamWithMemberships> => {
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in");
  }

  const team = await prisma.team.findFirst({
    include: {
      memberships: true,
    },
  });

  if (!team) {
    notFound();
  }

  return team;
});

/**
 * Get all teams the user is part of.
 * @returns The teams.
 */
export const getTeams = cache(async (): Promise<Team[]> => {
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in");
  }

  return prisma.team.findMany({
    where: {
      memberships: {
        some: {
          id: session.user.id,
          status: MembershipStatus.APPROVED,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });
});

/**
 * Get all teams the user is part of with their users.
 * @returns The teams with their users.
 */
export const getTeamsWithMemberships = cache(async (): Promise<TeamWithMemberships[]> => {
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in");
  }

  return prisma.team.findMany({
    where: {
      memberships: {
        some: {
          id: session.user.id,
          status: MembershipStatus.APPROVED,
        },
      },
    },
    include: {
      memberships: true,
    },
    orderBy: {
      name: "asc",
    },
  });
});
