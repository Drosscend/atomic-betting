import { Prisma } from "@prisma/client";
import { isAfter, isBefore, isEqual } from "date-fns";
import { notFound } from "next/navigation";
import { cache } from "react";
import { prisma } from "@/lib/database/db";

// Define types based on Prisma models
export type BetWithTransactions = Prisma.BetGetPayload<{
  include: {
    transactions: {
      include: {
        teamMembership: {
          include: {
            user: true;
          };
        };
      };
    };
    questionBet: {
      include: {
        options: true;
      };
    };
  };
}>;

export type UserBet = Prisma.TransactionGetPayload<{
  include: {
    bet: {
      include: {
        questionBet: {
          include: {
            options: true;
          };
        };
      };
    };
  };
}>;

/**
 * Retrieves all bets for a specific team.
 * @param teamId The ID of the team
 * @returns An array of bets with their transactions and question details
 */
export const getTeamBets = cache(async (teamId: string): Promise<BetWithTransactions[]> => {
  const team = await prisma.team.findUnique({
    where: {
      id: teamId,
    },
  });
  if (!team) notFound();

  return prisma.bet.findMany({
    where: {
      teamId: teamId,
    },
    include: {
      transactions: {
        include: {
          teamMembership: {
            include: {
              user: true,
            },
          },
        },
      },
      questionBet: {
        include: {
          options: true,
        },
      },
    },
    orderBy: { startDateTime: "desc" },
  });
});

/**
 * Retrieves all bets a user has participated in for a specific team.
 * @param userId The ID of the user
 * @param teamId The ID of the team
 * @returns An array of bet transactions with associated bet details
 */
export const getUserBetsForTeam = cache(async (userId: string, teamId: string): Promise<UserBet[]> => {
  const team = await prisma.team.findUnique({
    where: {
      id: teamId,
    },
  });
  if (!team) notFound();

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) notFound();

  return prisma.transaction.findMany({
    where: {
      teamMembership: {
        userId,
        teamId,
      },
    },
    include: {
      bet: {
        include: {
          questionBet: {
            include: {
              options: true,
            },
          },
        },
      },
    },
    orderBy: { transactionDate: "desc" },
  });
});

/**
 * Retrieves active bets for a team (bets that haven't ended yet).
 * @param teamId The ID of the team
 * @returns An array of active bets with their transactions and question details
 */
export const getActiveTeamBets = cache(async (teamId: string): Promise<BetWithTransactions[]> => {
  const team = await prisma.team.findUnique({
    where: {
      id: teamId,
    },
  });
  if (!team) notFound();

  const bets = await prisma.bet.findMany({
    where: {
      teamId,
    },
    include: {
      transactions: {
        include: {
          teamMembership: {
            include: {
              user: true,
            },
          },
        },
      },
      questionBet: {
        include: {
          options: true,
        },
      },
    },
    orderBy: { endDateTime: "asc" },
  });

  const now = new Date();
  return bets.filter((bet) => isEqual(bet.startDateTime, now) || (isBefore(bet.startDateTime, now) && isAfter(bet.endDateTime, now)));
});

/**
 * Retrieves a specific bet by its ID.
 * @param betId The ID of the bet
 * @returns The bet with its transactions and question details, or null if not found
 */
export const getBetById = cache(async (betId: string): Promise<BetWithTransactions> => {
  const bet = await prisma.bet.findUnique({
    where: { id: betId },
    include: {
      transactions: {
        include: {
          teamMembership: {
            include: {
              user: true,
            },
          },
        },
      },
      questionBet: {
        include: {
          options: true,
        },
      },
    },
  });

  if (!bet) return notFound();

  return bet;
});
