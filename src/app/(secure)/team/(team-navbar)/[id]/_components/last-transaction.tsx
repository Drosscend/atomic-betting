import { TransactionType } from "@prisma/client";
import { CircleDollarSignIcon, GiftIcon, TrophyIcon } from "lucide-react";
import React from "react";
import { IncrementNumber } from "@/components/increment-number";
import type { UserBet } from "@/lib/database/bet";

interface Transaction extends UserBet {
  transactionType: TransactionType;
}

interface LastTransactionProps {
  recentTransactions: Transaction[];
}

const TransactionIcon = ({ type }: { type: TransactionType }) => {
  switch (type) {
    case TransactionType.BET:
      return <CircleDollarSignIcon className="size-6 text-blue-500" />;
    case TransactionType.WINNINGS:
      return <TrophyIcon className="size-6 text-yellow-500" />;
    case TransactionType.DAILY_REWARD:
      return <GiftIcon className="size-6 text-green-500" />;
    default:
      return null;
  }
};

const TransactionTitle = ({ type, description, question }: { type: TransactionType; description?: string; question?: string }) => {
  switch (type) {
    case TransactionType.BET:
      return question || description || "Pari placé";
    case TransactionType.WINNINGS:
      return "Gains du pari";
    case TransactionType.DAILY_REWARD:
      return "Récompense quotidienne";
    default:
      return "Transaction";
  }
};

const TransactionAmount = ({ type, amount }: { type: TransactionType; amount: number }) => {
  const isPositive = type === TransactionType.WINNINGS || type === TransactionType.DAILY_REWARD;
  const colorClass = isPositive ? "text-green-500" : "text-red-500";
  const prefix = isPositive ? "+" : "-";

  return (
    <div className={`font-medium ${colorClass}`}>
      {prefix}
      <IncrementNumber end={Math.abs(amount)} duration={1000} />
    </div>
  );
};

export function LastTransaction({ recentTransactions }: LastTransactionProps) {
  if (recentTransactions.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground text-center">Aucune transaction récente disponible</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {recentTransactions.map((transaction, index) => (
        <div key={index} className="flex items-center">
          <div className="mr-4">
            <TransactionIcon type={transaction.transactionType} />
          </div>
          <div className="flex flex-1 items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                <TransactionTitle
                  type={transaction.transactionType}
                  description={transaction.bet?.description}
                  question={transaction.bet?.questionBet?.question}
                />
              </p>
              <p className="text-muted-foreground text-xs">{`Montant: ${Math.abs(transaction.coinsAmount)} A.c.`}</p>
            </div>
            <TransactionAmount type={transaction.transactionType} amount={transaction.coinsAmount} />
          </div>
        </div>
      ))}
    </div>
  );
}
