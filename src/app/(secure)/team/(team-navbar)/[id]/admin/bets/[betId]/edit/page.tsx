import { EditBetForm } from "@/app/(secure)/team/(team-navbar)/[id]/admin/bets/[betId]/edit/_components/edit-bet-form";
import type { Metadata } from "next";
import { getBetById } from "@/lib/database/bet";
import { getTeamById } from "@/lib/database/team";

export const metadata: Metadata = {
  title: "Modifier un pari",
  description: "Page de modification d'un pari existant",
};

export default async function EditBetPage({ params }: { params: { teamId: string; betId: string } }) {
  const team = await getTeamById(params.teamId);
  const bet = await getBetById(params.betId);

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">{`Modifier le pari`}</h1>
      <EditBetForm team={team} bet={bet} />
    </div>
  );
}
