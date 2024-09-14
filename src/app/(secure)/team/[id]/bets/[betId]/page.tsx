import { BetDetails } from "@/app/(secure)/team/[id]/bets/[betId]/_components/bet-details";

export type Bet = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  userBetAmount: number | null;
  totalBetAmount: number;
  userAnswer: string | null;
  minBet: number;
  maxBet: number;
  options: Array<{ id: string; text: string; odds: number; totalBet: number }>;
};

export type UserInfo = {
  coins: number;
};

export default async function Page({ params }: { params: { betId: string } }) {
  const bet: Bet = {
    id: params.betId,
    title: "Qui va gagner la Coupe du Monde 2026?",
    startDate: "2024-01-01T00:00:00Z",
    endDate: "2024-09-01T00:00:00Z",
    userBetAmount: null,
    totalBetAmount: 10000,
    userAnswer: null,
    minBet: 10,
    maxBet: 1000,
    options: [
      { id: "1", text: "a", odds: 3.5, totalBet: 3000 },
      { id: "2", text: "b", odds: 4.2, totalBet: 2500 },
      { id: "3", text: "c", odds: 4.2, totalBet: 2500 },
      { id: "4", text: "d", odds: 4.2, totalBet: 2500 },
      { id: "5", text: "e", odds: 4.2, totalBet: 2500 },
    ],
  };

  const userInfo: UserInfo = {
    coins: 500,
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">Détails du pari</h1>
      <BetDetails bet={bet} userInfo={userInfo} />
    </div>
  );
}
