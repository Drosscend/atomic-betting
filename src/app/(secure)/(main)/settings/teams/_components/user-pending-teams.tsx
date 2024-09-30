"use client";

import { MembershipStatus } from "@prisma/client";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { UserFull } from "@/lib/database/user";
import { cancelJoinRequest } from "../actions";

interface UserPendingTeamsProps {
  user: UserFull;
}

export function UserPendingTeams({ user }: UserPendingTeamsProps) {
  const [pendingTeams, setPendingTeams] = useState(user.teamMemberships.filter((m) => m.status === MembershipStatus.PENDING));
  const { update } = useSession();

  const { execute: executeCancelRequest, status } = useAction(cancelJoinRequest, {
    onSuccess: async (result) => {
      if (result.data && result.data.success) {
        toast(result.data.message);
        const updatedPendingTeams = pendingTeams.filter((team) => team.teamId !== result.data!.teamId);
        setPendingTeams(updatedPendingTeams);
        await update({ user: { ...user, teamMemberships: user.teamMemberships.filter((m) => m.teamId !== result.data!.teamId) } });
      } else if (result.data) {
        toast(result.data.message);
      }
    },
    onError: ({ error }) => {
      console.error("Erreur lors de l'annulation de la demande:", error);
      toast(`Une erreur est survenue : ${error.serverError || "Erreur inconnue"}`);
    },
  });

  const handleCancelRequest = (teamId: string) => {
    executeCancelRequest({ teamId });
  };

  if (pendingTeams.length === 0) {
    return <div className="text-muted-foreground text-center">{`Vous n'avez aucune demande d'adhésion en attente.`}</div>;
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{`Nom de l'équipe`}</TableHead>
            <TableHead>{`Statut`}</TableHead>
            <TableHead>{`Actions`}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pendingTeams.map((membership) => (
            <TableRow key={membership.teamId}>
              <TableCell>{membership.team.name}</TableCell>
              <TableCell>{`En attente`}</TableCell>
              <TableCell>
                <Button variant="destructive" onClick={() => handleCancelRequest(membership.teamId)} disabled={status === "executing"}>
                  {status === "executing" ? `Annulation...` : `Annuler la demande`}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
