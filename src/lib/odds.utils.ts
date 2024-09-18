export type TransactionWithOption = {
  betOptionId: string;
  coinsAmount: number; // This amount is negative as it represents coins subtracted from users
};

export function calculateOdds(
  transactions: TransactionWithOption[],
  allOptions: string[],
  minOdds: number = 1.01,
  defaultOdds: number = 10.0
): Record<string, number> {
  const { totalCoinsPerOption, totalCoinsBet } = transactions.reduce(
    (acc, { betOptionId, coinsAmount }) => {
      const absoluteAmount = Math.abs(coinsAmount);
      if (absoluteAmount > 0) {
        acc.totalCoinsPerOption[betOptionId] = (acc.totalCoinsPerOption[betOptionId] || 0) + absoluteAmount;
        acc.totalCoinsBet += absoluteAmount;
      }
      return acc;
    },
    { totalCoinsPerOption: {} as Record<string, number>, totalCoinsBet: 0 }
  );

  if (totalCoinsBet === 0) {
    return allOptions.reduce(
      (acc, optionId) => {
        acc[optionId] = defaultOdds;
        return acc;
      },
      {} as Record<string, number>
    );
  }

  return allOptions.reduce(
    (acc, optionId) => {
      const optionTotal = totalCoinsPerOption[optionId] || 0;
      const probability = optionTotal / totalCoinsBet;
      const calculatedOdds = probability > 0 ? Math.max(1 / probability, minOdds) : defaultOdds;
      acc[optionId] = Math.round(calculatedOdds * 100) / 100;
      return acc;
    },
    {} as Record<string, number>
  );
}
