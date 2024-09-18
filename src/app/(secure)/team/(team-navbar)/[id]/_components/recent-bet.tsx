import { TransactionType } from "@prisma/client";
import { CircleDollarSignIcon, TrophyIcon } from "lucide-react";
import { IncrementNumber } from "@/components/increment-number";
import type { UserBet } from "@/lib/database/bet";

interface RecentBetProps {
  recentBets: UserBet[];
}

export function RecentBet({ recentBets }: RecentBetProps) {
  if (recentBets.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground text-center">{`Aucun pari récent disponible`}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {recentBets.map((bet, index) => (
        <div key={index} className="flex items-center">
          <div className="mr-4">
            {bet.transactionType === TransactionType.BET ? (
              <CircleDollarSignIcon className="size-6 text-red-500" />
            ) : (
              <TrophyIcon className="size-6 text-yellow-500" />
            )}
          </div>
          <div className="flex flex-1 items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">{bet.bet.questionBet?.question || bet.bet.description}</p>
              <p className="text-muted-foreground text-xs">
                {bet.transactionType === TransactionType.BET ? `Votre mise: ${Math.abs(bet.coinsAmount)} A.c.` : `Gains: ${bet.coinsAmount} A.c.`}
              </p>
            </div>
            <div className={`font-medium ${bet.transactionType === TransactionType.WINNINGS ? "text-green-500" : "text-red-500"}`}>
              {bet.transactionType === TransactionType.WINNINGS ? "+" : "-"}
              <IncrementNumber end={Math.abs(bet.coinsAmount)} duration={1000} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
