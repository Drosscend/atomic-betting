import { Prisma } from "@prisma/client";
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

export type UserBet = Prisma.BetTransactionGetPayload<{
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
  return prisma.bet.findMany({
    where: { teamId },
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
 * Retrieves all bets for a specific team on a given day.
 * @param teamId The ID of the team
 * @param date The date to filter bets
 * @returns An array of bets with their transactions and question details
 */
export const getTeamBetsForDay = cache(async (teamId: string, date: Date): Promise<BetWithTransactions[]> => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return prisma.bet.findMany({
    where: {
      teamId,
      startDateTime: {
        gte: startOfDay,
        lte: endOfDay,
      },
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
    orderBy: { startDateTime: "asc" },
  });
});

/**
 * Retrieves all bets a user has participated in for a specific team.
 * @param userId The ID of the user
 * @param teamId The ID of the team
 * @returns An array of bet transactions with associated bet details
 */
export const getUserBetsForTeam = cache(async (userId: string, teamId: string): Promise<UserBet[]> => {
  return prisma.betTransaction.findMany({
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
  const now = new Date();
  return prisma.bet.findMany({
    where: {
      teamId,
      endDateTime: {
        gt: now,
      },
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
});

/**
 * Retrieves a specific bet by its ID.
 * @param betId The ID of the bet
 * @returns The bet with its transactions and question details, or null if not found
 */
export const getBetById = cache(async (betId: string): Promise<BetWithTransactions | null> => {
  return prisma.bet.findUnique({
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
});
