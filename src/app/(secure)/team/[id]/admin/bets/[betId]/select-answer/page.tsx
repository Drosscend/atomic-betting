import { notFound } from "next/navigation";
import { getBetById } from "@/lib/database/bet";
import { SelectAnswerForm } from "./_components/select-answer-form";

export default async function SelectAnswerPage({ params }: { params: { id: string; betId: string } }) {
  const bet = await getBetById(params.betId);

  if (!bet || bet.type !== "QUESTION") {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">{`Sélectionner la réponse correcte`}</h1>
      <SelectAnswerForm bet={bet} teamId={params.id} />
    </div>
  );
}
