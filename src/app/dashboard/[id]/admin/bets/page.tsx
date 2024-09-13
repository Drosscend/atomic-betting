import { BetsList } from "@/app/dashboard/[id]/admin/bets/_components/bets-list";
import { CreateBetButton } from "@/app/dashboard/[id]/admin/bets/_components/create-bet-button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tableau de bord - Administration - Bets",
  description: "Page d'administration des Bets",
};

export default async function AdminBetsPage() {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Administration des paris</h1>
        <CreateBetButton />
      </div>
      <BetsList />
    </div>
  );
}
