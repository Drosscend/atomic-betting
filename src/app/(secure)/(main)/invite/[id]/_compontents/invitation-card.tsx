"use client";

import { joinTeam } from "@/app/(secure)/(main)/invite/[id]/invitation.action";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface InvitationCardProps {
  teamId: string;
  teamName: string;
}

export function InvitationCard({ teamId, teamName }: InvitationCardProps) {
  const { execute, status, result, isPending } = useAction(joinTeam, {
    onSuccess: (result) => {
      if (result.data) {
        toast(result.data.message);
      }
    },
    onError: ({ error }) => {
      const errorMessage = error.serverError || `Une erreur est survenue lors de la tentative de rejoindre l'équipe.`;
      toast(errorMessage);
    },
  });

  const handleJoinTeam = () => {
    execute({ teamId });
  };

  const renderJoinButton = () => {
    const getButtonText = () => {
      switch (status) {
        case "idle":
          return "Rejoindre l'équipe";
        case "executing":
          return "En cours...";
        case "hasErrored":
          return "Erreur - Réessayer";
        default:
          return "Rejoindre l'équipe";
      }
    };

    const isDisabled = status === "executing" || status === "hasSucceeded";

    return (
      <Button onClick={handleJoinTeam} disabled={isDisabled} variant={status === "hasErrored" ? "destructive" : "default"}>
        {isPending && <Loader2Icon className="mr-2 animate-spin" />}
        <span>{getButtonText()}</span>
      </Button>
    );
  };

  const renderStatusMessage = () => {
    if (status !== "hasSucceeded" || !result.data) return null;

    switch (result.data.status) {
      case "PENDING_APPROVAL":
        return <p className="text-center text-yellow-600">{result.data.message}</p>;
      case "ALREADY_MEMBER":
        return <p className="text-center text-green-600">{result.data.message}</p>;
      case "JOINED":
        return <p className="text-center text-green-600">{result.data.message}</p>;
      case "REJECTED":
        return <p className="text-center text-red-600">{result.data.message}</p>;
      case "ERROR":
        return <p className="text-center text-red-600">{result.data.message}</p>;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">{`Invitation pour rejoindre une équipe`}</CardTitle>
        <CardDescription>{`ID de l'équipe : ${teamId}`}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center text-center">
          <h2 className="mb-2 text-4xl font-medium">{teamName}</h2>
          <Image src={`https://avatar.vercel.sh/${teamId}.png`} alt={`${teamName} avatar`} className="size-24 rounded-full" width={96} height={96} />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center space-y-4">
        {renderJoinButton()}
        {renderStatusMessage()}
        <Link href="/team" passHref>
          <Button variant="outline">{`Aller au tableau de bord`}</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
