import { BetsList } from "@/app/(secure)/team/[id]/admin/bets/_components/bet-list";
import { CreateBetButton } from "@/app/(secure)/team/[id]/admin/bets/_components/create-bet-button";
import type { Metadata } from "next";
import { getTeamBets } from "@/lib/database/bet";

export const metadata: Metadata = {
  title: "Tableau de bord - Administration - Bets",
  description: "Page d'administration des Bets",
};

export default async function AdminBetsPage({ params }: { params: { id: string } }) {
  const bets = await getTeamBets(params.id);
  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Administration des paris</h1>
        <CreateBetButton teamId={params.id} />
      </div>
      <BetsList bets={bets} teamId={params.id} />
    </div>
  );
}
