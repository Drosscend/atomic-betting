import { SelectAnswerForm } from "@/app/(secure)/team/(team-navbar)/[id]/admin/bets/[betId]/select-answer/_components/select-answer-form";
import { getBetById } from "@/lib/database/bet";

export default async function SelectAnswerPage({ params }: { params: { id: string; betId: string } }) {
  const bet = await getBetById(params.betId);

  if (bet.type !== "QUESTION") {
    throw new Error("This bet is not a question bet, and for now is not supported");
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">{`Sélectionner la réponse correcte`}</h1>
      <SelectAnswerForm bet={bet} />
    </div>
  );
}
