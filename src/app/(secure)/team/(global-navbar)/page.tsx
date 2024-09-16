import { CreateTeamCard } from "@/app/(secure)/team/(global-navbar)/_components/create-team-card";
import { JoinTeamCard } from "@/app/(secure)/team/(global-navbar)/_components/join-team-card";
import { TeamCard } from "@/app/(secure)/team/(global-navbar)/_components/team-card";
import type { Metadata } from "next";
import { getTeamsWithMemberships } from "@/lib/database/team";

export const metadata: Metadata = { title: "Dashboard", description: "Dashboard page" };

export default async function Page() {
  const teams = await getTeamsWithMemberships();

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">{"Tableau de bord"}</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {teams.length > 0 ? (
          teams.map((team) => <TeamCard key={team.id} team={team} />)
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center space-y-6">
            <p className="text-center text-lg text-gray-600">{"Vous n'avez pas encore d'équipe."}</p>
            <div className="flex space-x-4">
              <CreateTeamCard />
              <JoinTeamCard />
            </div>
          </div>
        )}
        {teams.length > 0 && (
          <>
            <CreateTeamCard />
            <JoinTeamCard />
          </>
        )}
      </div>
    </div>
  );
}
