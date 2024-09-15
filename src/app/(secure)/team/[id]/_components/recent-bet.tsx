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
        <div key={index} className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{bet.bet.questionBet?.question || bet.bet.description}</p>
            <p className="text-muted-foreground text-xs">{`Votre mise: ${bet.coinsAmount} A.c.`}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className={`font-medium ${bet.coinsAmount >= 0 ? "text-green-500" : "text-red-500"}`}>
              {bet.coinsAmount >= 0 ? "+" : ""}
              <IncrementNumber end={bet.coinsAmount} duration={1000} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
