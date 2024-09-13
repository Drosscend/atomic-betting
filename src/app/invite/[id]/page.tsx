import { InvitationCard } from "@/app/invite/[id]/_compontents/invitation-card";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { ErrorDisplay } from "@/components/error-display";
import { auth } from "@/lib/auth";
import { getTeamByIdUnsecure } from "@/lib/database/team";

export const metadata: Metadata = {
  title: "Invitation",
  description: "Page d'invitation à une équipe",
};

export default async function InvitationPage({ params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) redirect("/sign-in");

  const teamInfo = await getTeamByIdUnsecure(params.id);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      {teamInfo ? (
        <InvitationCard teamId={teamInfo.id} teamName={teamInfo.name} />
      ) : (
        <ErrorDisplay
          title="Équipe non trouvée"
          message="Désolé, nous n'avons pas pu trouver l'équipe correspondant à cette invitation."
          buttonText="Aller au tableau de bord"
          buttonHref="/dashboard"
        />
      )}
    </div>
  );
}
