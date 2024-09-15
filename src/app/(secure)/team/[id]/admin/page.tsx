import { DangerZone } from "@/app/(secure)/team/[id]/admin/_components/delete-team";
import { GeneralSettings } from "@/app/(secure)/team/[id]/admin/_components/general-settings";
import { InviteLinkComponent } from "@/app/(secure)/team/[id]/admin/_components/invite-link";
import { RoleManagement } from "@/app/(secure)/team/[id]/admin/_components/role-management";
import { Metadata } from "next";
import { getTeamById } from "@/lib/database/team";

export const metadata: Metadata = {
  title: "Administration - Paramètres globaux",
  description: "Gérez les paramètres globaux de votre équipe",
};

export default async function AdminPage({ params }: { params: { id: string } }) {
  const team = await getTeamById(params.id);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{"Paramètres de l'équipe"}</h1>
      <GeneralSettings team={team} />
      <InviteLinkComponent teamId={team.id} />
      <RoleManagement team={team} />
      <DangerZone teamId={team.id} />
    </div>
  );
}
