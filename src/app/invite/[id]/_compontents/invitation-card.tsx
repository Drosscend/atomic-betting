"use client";

import { UsersIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface InvitationCardProps {
  teamId: string;
  teamName: string;
}

export function InvitationCard({ teamId, teamName }: InvitationCardProps) {
  const [isJoining, setIsJoining] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);

  const handleJoinTeam = async () => {
    setIsJoining(true);
    // Simuler une requête API
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsJoining(false);
    setHasJoined(true);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">{"Invitation à rejoindre une équipe"}</CardTitle>
        <CardDescription>{"Vous avez été invité à rejoindre une équipe"}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <UsersIcon className="mx-auto size-12 text-gray-400" />
          <h2 className="mt-2 text-lg font-medium">{teamName}</h2>
          <p className="text-sm text-gray-500">{`ID de l'équipe : ${teamId}`}</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center space-y-4">
        {!hasJoined ? (
          <Button onClick={handleJoinTeam} disabled={isJoining}>
            {isJoining ? "En cours..." : "Rejoindre l'équipe"}
          </Button>
        ) : (
          <>
            <p className="font-medium text-green-600">{"Vous avez rejoint l'équipe avec succès !"}</p>
          </>
        )}
        <Link href="/dashboard" passHref>
          <Button variant="outline">{"Aller au tableau de bord"}</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
