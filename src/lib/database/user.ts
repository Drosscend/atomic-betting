import { Prisma } from "@prisma/client";
import { notFound, redirect } from "next/navigation";
import { cache } from "react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/database/db";

export type UserFull = Prisma.UserGetPayload<{
  include: {
    sessions: true;
    accounts: true;
    teamMemberships: {
      include: {
        team: true;
      };
    };
    createdTeams: true;
  };
}>;

/**
 * Get a user by its ID.
 * @param userId The team ID.
 * @returns The user with its sessions, accounts, team memberships and created teams.
 */
export const getUserById = cache(async (userId: string): Promise<UserFull> => {
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      sessions: true,
      accounts: true,
      teamMemberships: {
        include: {
          team: true,
        },
      },
      createdTeams: true,
    },
  });

  if (!user) {
    notFound();
  }

  return user;
});
