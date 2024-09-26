import { DangerZone } from "@/app/(secure)/team/(team-navbar)/[id]/admin/_components/delete-team";
import { GeneralSettings } from "@/app/(secure)/team/(team-navbar)/[id]/admin/_components/general-settings";
import { InviteLinkComponent } from "@/app/(secure)/team/(team-navbar)/[id]/admin/_components/invite-link";
import { RoleManagement } from "@/app/(secure)/team/(team-navbar)/[id]/admin/_components/role-management";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getTeamById } from "@/lib/database/team";

export const metadata: Metadata = {
  title: "Administration - Paramètres globaux",
  description: "Gérez les paramètres globaux de votre équipe",
};

export default async function AdminPage({ params }: { params: { id: string } }) {
  const team = await getTeamById(params.id);
  const session = await auth();
  if (!session) {
    redirect("/sign-in");
  }
  const isAdmin = !!team.memberships.find((m) => m.userId === session.user.id && m.role === "ADMIN");

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{"Paramètres de l'équipe"}</h1>
      <GeneralSettings team={team} isAdmin={isAdmin} />
      <InviteLinkComponent teamId={team.id} />
      <RoleManagement team={team} isAdmin={isAdmin} />
      <DangerZone teamId={team.id} isAdmin={isAdmin} />
    </div>
  );
}
