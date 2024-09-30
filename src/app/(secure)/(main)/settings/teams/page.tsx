import { UserPendingTeams } from "@/app/(secure)/(main)/settings/teams/_components/user-pending-teams";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getUserById } from "@/lib/database/user";
import { UserTeams } from "./_components/user-teams";

export const metadata: Metadata = { title: "Mes équipes", description: "Gestion des équipes de l'utilisateur" };

export default async function TeamsPage() {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/sign-in?callbackUrl=/settings/teams");
  }

  const user = await getUserById(session.user.id);

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">{`Mes équipes`}</h1>
      <UserTeams user={user} />
      <h2 className="mb-4 mt-8 text-2xl font-bold">{`Demandes d'adhésion en attente`}</h2>
      <UserPendingTeams user={user} />
    </div>
  );
}
