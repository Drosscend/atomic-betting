import type { BetTransaction } from "@prisma/client";

type TransactionWithOption = BetTransaction & {
  betOptionId: string | null;
};

export function calculateOdds(transactions: TransactionWithOption[], optionId: string): number {
  const optionCoins = transactions.filter((t) => t.betOptionId === optionId).reduce((sum, t) => sum + t.coinsAmount, 0);

  const totalCoins = transactions.reduce((sum, t) => sum + t.coinsAmount, 0);

  const minStake = 1;

  if (totalCoins === 0) {
    return 2; // 50%
  } else if (optionCoins === 0) {
    return (totalCoins + minStake) / minStake;
  } else {
    return (totalCoins + minStake) / (optionCoins + minStake);
  }
}
