"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface InvitationCardProps {
  teamId: string;
  teamName: string;
}

export function InvitationCard({ teamId, teamName }: InvitationCardProps) {
  const handleJoinTeam = async () => {};

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">{"Invitation pour rejoindre une équipe"}</CardTitle>
        <CardDescription>{`ID de l'équipe : ${teamId}`}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center text-center">
          <h2 className="mb-2 text-4xl font-medium">{teamName}</h2>
          <Image src={`https://avatar.vercel.sh/${teamId}.png`} alt={`${teamName} avatar`} className="size-24 rounded-full" width={96} height={96} />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center space-y-4">
        <Button onClick={handleJoinTeam}>{"Rejoindre l'équipe"}</Button>
        <Link href="/dashboard" passHref>
          <Button variant="outline">{"Aller au tableau de bord"}</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
