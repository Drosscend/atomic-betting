import { PendingInvitationsManagement } from "@/app/(secure)/team/(team-navbar)/[id]/admin/users/_components/pending-invitations-management";
import { UserManagement } from "@/app/(secure)/team/(team-navbar)/[id]/admin/users/_components/user-management";
import { Metadata } from "next";
import { getTeamById } from "@/lib/database/team";

export const metadata: Metadata = {
  title: "Administration - Gestion des utilisateurs",
  description: "Gérez les utilisateurs de votre équipe",
};

export default async function UsersPage({ params }: { params: { id: string } }) {
  const team = await getTeamById(params.id);

  return (
    <div className="space-y-6">
      <h1 className="mb-6 text-3xl font-bold">Gestion des utilisateurs</h1>
      <PendingInvitationsManagement team={team} />
      <UserManagement team={team} />
    </div>
  );
}
