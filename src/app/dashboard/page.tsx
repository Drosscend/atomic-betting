"use client";

import { TeamCreationForm } from "@/app/dashboard/_components/team-creation-form";
import { TeamDialog } from "@/app/dashboard/_components/team-dialog";
import { TeamJoinForm } from "@/app/dashboard/_components/team-join-form";
import { TeamSheet } from "@/app/dashboard/_components/team-sheet";
import { useTeam } from "@/contexts/team-context";
import { useMediaQuery } from "@uidotdev/usehooks";
import { PlusIcon, UserPlusIcon, UsersIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const teams = [
  { label: "M1 ICE", value: "e920f20c-2dfc-4239-9cb2-5db42682e143", members: 15 },
  { label: "M2 ICE", value: "15c93707-69f6-4607-a115-dbfc3b3dacef", members: 22 },
];

export default function DashboardPage() {
  const router = useRouter();
  const { setSelectedTeam } = useTeam();
  setSelectedTeam(null);
  const [showNewTeamDialog, setShowNewTeamDialog] = useState(false);
  const [showJoinTeamDialog, setShowJoinTeamDialog] = useState(false);
  const isMobile = useMediaQuery("(max-width: 640px)");

  const handleNewTeamSubmit = () => {
    setShowNewTeamDialog(false);
    // Add logic to handle new team creation
  };

  const NewTeamContent = (
    <>
      <h2>{"Créer une équipe"}</h2>
      <p>{"Ajoutez une nouvelle équipe pour commencer vos paris"}</p>
      <TeamCreationForm onSubmit={handleNewTeamSubmit} />
    </>
  );

  const handleJoinTeamSubmit = () => {
    setShowJoinTeamDialog(false);
    // Add logic to handle team join
  };

  const JoinTeamContent = (
    <>
      <h2>{"Rejoindre une équipe"}</h2>
      <p>{"Entrez l'identifiant de l'équipe pour la rejoindre"}</p>
      <TeamJoinForm onSubmit={handleJoinTeamSubmit} />
    </>
  );

  const handleTeamSelect = (team: (typeof teams)[number]) => {
    setSelectedTeam(team);
    router.push(`/dashboard/${team.value}`);
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="mb-6 text-3xl font-bold">Tableau de bord</h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teams.map((team) => (
            <Card key={team.value} className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <CardTitle>{team.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex h-32 items-center justify-center rounded-lg">
                  <Image
                    src={`https://avatar.vercel.sh/${team.value}.png`}
                    alt={`${team.label} avatar`}
                    className="size-24 rounded-full"
                    width={96}
                    height={96}
                  />
                </div>
                <p className="mt-4 text-center">
                  <UsersIcon className="mr-2 inline-block" />
                  {team.members} membres
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleTeamSelect(team)}>
                  {"Accéder à l'équipe"}
                </Button>
              </CardFooter>
            </Card>
          ))}
          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <CardTitle>{"Créer une équipe"}</CardTitle>
            </CardHeader>
            <CardContent className="flex h-48 items-center justify-center">
              <PlusIcon className="size-16 text-gray-400" />
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline" onClick={() => setShowNewTeamDialog(true)}>
                Nouvelle équipe
              </Button>
            </CardFooter>
          </Card>
          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <CardTitle>Rejoindre une équipe</CardTitle>
            </CardHeader>
            <CardContent className="flex h-48 items-center justify-center">
              <UserPlusIcon className="size-16 text-gray-400" />
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline" onClick={() => setShowJoinTeamDialog(true)}>
                Rejoindre
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      {isMobile ? (
        <>
          <TeamSheet isOpen={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
            {NewTeamContent}
          </TeamSheet>
          <TeamSheet isOpen={showJoinTeamDialog} onOpenChange={setShowJoinTeamDialog}>
            {JoinTeamContent}
          </TeamSheet>
        </>
      ) : (
        <>
          <TeamDialog isOpen={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
            {NewTeamContent}
          </TeamDialog>
          <TeamDialog isOpen={showJoinTeamDialog} onOpenChange={setShowJoinTeamDialog}>
            {JoinTeamContent}
          </TeamDialog>
        </>
      )}
    </>
  );
}
