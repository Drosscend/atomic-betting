import { BetInfo } from "@/app/(secure)/team/[id]/bets/[betId]/_components/bet-info";
import { BetOptions } from "@/app/(secure)/team/[id]/bets/[betId]/_components/bet-options";
import { TimeRemaining } from "@/app/(secure)/team/[id]/bets/[betId]/_components/time-remaining";
import { UserBet } from "@/app/(secure)/team/[id]/bets/[betId]/_components/user-bet";
import type { Bet, UserInfo } from "@/app/(secure)/team/[id]/bets/[betId]/page";

export function BetDetails({ bet, userInfo }: { bet: Bet; userInfo: UserInfo }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">{bet.title}</h1>
      <BetInfo bet={bet} />
      <TimeRemaining endDate={bet.endDate} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <UserBet bet={bet} userInfo={userInfo} />
        <BetOptions options={bet.options} userAnswerId={bet.userAnswer} />
      </div>
    </div>
  );
}
