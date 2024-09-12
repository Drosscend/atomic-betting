import { InvitationCard } from "@/app/invite/[id]/_compontents/invitation-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Invitation",
  description: "Page d'invitation à une équipe",
};

export default function InvitationPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <InvitationCard teamId={params.id} teamName={"test"} />
    </div>
  );
}
