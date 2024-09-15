import { CreateBetForm } from "@/app/(secure)/team/[id]/admin/bets/create/_components/bet-form";
import type { Metadata } from "next";
import { getTeamById } from "@/lib/database/team";

export const metadata: Metadata = {
  title: "Créer un nouveau pari",
  description: "Page de création d'un nouveau pari pour l'équipe",
};

export default async function CreateBetPage({ params }: { params: { id: string } }) {
  const team = await getTeamById(params.id);

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">{`Créer un nouveau pari`}</h1>
      <CreateBetForm team={team} />
    </div>
  );
}
