import { InvitationCard } from "@/app/invite/[id]/_compontents/invitation-card";
import { Metadata } from "next";
import { ErrorDisplay } from "@/components/error-display";
import { getTeamDetails } from "@/lib/team";

export const metadata: Metadata = {
  title: "Invitation",
  description: "Page d'invitation à une équipe",
};

async function getTeamInfo(teamId: string) {
  return getTeamDetails(teamId);
}

export default async function InvitationPage({ params }: { params: { id: string } }) {
  const teamInfo = await getTeamInfo(params.id);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      {teamInfo ? (
        <InvitationCard teamId={params.id} teamName={teamInfo.name} />
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
