import { BetForm } from "@/app/(secure)/team/(team-navbar)/[id]/bets/[betId]/_components/bet-form";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getBetById } from "@/lib/database/bet";
import { getTeamById } from "@/lib/database/team";

export const metadata: Metadata = {
  title: "Détails du pari",
  description: "Page de détails du pari",
};

export default async function BetDetailPage({ params }: { params: { id: string; betId: string } }) {
  const session = await auth();
  const user = session?.user;
  if (!user) redirect(`/sign-in?callbackUrl=/team/${params.id}/bets/${params.betId}`);

  const team = await getTeamById(params.id);
  const bet = await getBetById(params.betId);

  if (!bet || bet.teamId !== team.id) {
    redirect(`/team/${params.id}/bets`);
  }

  const userMembership = team.memberships.find((m) => m.userId === user.id);
  const userCoins = userMembership?.coins ?? 0;

  if (!userMembership) {
    redirect(`/team/${params.id}`);
  }

  const isActive = new Date() < bet.endDateTime;

  const userTransactions = bet.transactions.filter((t) => t.teamMembership.userId === user.id);
  const userSelectedOption = userTransactions.length > 0 ? userTransactions[0].betOptionId : null;

  return (
    <div className="flex-1 space-y-6 p-6">
      <h1 className="text-3xl font-bold">{bet.questionBet?.question || bet.description}</h1>

      {isActive ? (
        <BetForm bet={bet} userSelectedOption={userSelectedOption} userTransactions={userTransactions} userCoins={userCoins} />
      ) : (
        <p className="text-muted-foreground text-center">{`Ce pari est terminé et n'accepte plus de mises.`}</p>
      )}
    </div>
  );
}
