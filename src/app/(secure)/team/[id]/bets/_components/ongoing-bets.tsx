import { getTeamBets } from "@/lib/database/bet";

export async function OngoingBets({ teamId }: { teamId: string }) {
  return (
    <div className="space-y-6">
      <h2 className="mb-4 text-2xl font-semibold">Paris en cours</h2>
    </div>
  );
}
