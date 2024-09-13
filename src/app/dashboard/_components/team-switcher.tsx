import { getUserTeams } from "@/lib/database/team";
import { ClientTeamSwitcher } from "./client-team-switcher";

export async function TeamSwitcher() {
  const teams = await getUserTeams();

  return <ClientTeamSwitcher teams={teams} />;
}
