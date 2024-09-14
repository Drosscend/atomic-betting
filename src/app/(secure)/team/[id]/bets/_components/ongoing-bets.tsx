import { CurrentBet } from "@/app/(secure)/team/[id]/_components/current-bet";

export function OngoingBets() {
  return (
    <div className="space-y-6">
      <h2 className="mb-4 text-2xl font-semibold">Paris en cours</h2>
      <CurrentBet />
    </div>
  );
}
