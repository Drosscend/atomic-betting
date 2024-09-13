import { getTeamsWithMemberships } from "@/lib/database/team";
import { ClientTeamSwitcher } from "./client-team-switcher";

export async function TeamSwitcher() {
  const teams = await getTeamsWithMemberships();

  return <ClientTeamSwitcher teams={teams} />;
}
