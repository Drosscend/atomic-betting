import { getTeams } from "@/lib/database/team";
import { ClientTeamSwitcher } from "./client-team-switcher";

export async function TeamSwitcher() {
  const teams = await getTeams();

  return <ClientTeamSwitcher teams={teams} />;
}
