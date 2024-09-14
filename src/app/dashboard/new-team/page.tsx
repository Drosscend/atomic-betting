import type { Metadata } from "next";
import { CreateTeamForm } from "./_components/create-team-form";

export const metadata: Metadata = { title: "Nouvelle équipe", description: "Créer une nouvelle équipe" };

export default async function Page() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">{`Créer une équipe`}</h1>
      <CreateTeamForm />
    </div>
  );
}
