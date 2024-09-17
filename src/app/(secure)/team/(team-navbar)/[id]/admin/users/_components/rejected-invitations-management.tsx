"use client";

import { removeUser } from "@/app/(secure)/team/(team-navbar)/[id]/admin/users/actions";
import { RemoveUserInput } from "@/validations/user-management.schema";
import { MembershipStatus } from "@prisma/client";
import { RefreshCwIcon } from "lucide-react";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { MembershipsWithUsers, TeamWithMemberships } from "@/lib/database/team";

export function RejectedInvitationsManagement({ team }: { team: TeamWithMemberships }) {
  const [localRejectedMemberships, setLocalRejectedMemberships] = useState<MembershipsWithUsers[]>(
    team.memberships.filter((membership) => membership.status === MembershipStatus.REJECTED)
  );

  const { execute: executeRemoveUser } = useAction(removeUser, {
    onSuccess: (result) => {
      if (result.data && result.data.success) {
        toast(result.data.message);
      } else if (result.data) {
        toast(result.data.message);
      }
    },
    onError: ({ error }) => {
      console.error("Erreur lors de la suppression de l'utilisateur:", error);
      toast(`Une erreur est survenue : ${error.serverError || "Erreur inconnue"}`);
    },
  });

  const handleRevokeRejection = (userId: string) => {
    const data: RemoveUserInput = {
      userId,
      teamId: team.id,
    };
    executeRemoveUser(data);
    setLocalRejectedMemberships(localRejectedMemberships.filter((membership) => membership.userId !== userId));
  };

  if (localRejectedMemberships.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{`Invitations refusées`}</CardTitle>
          <CardDescription>{`Gérez les invitations refusées pour votre équipe`}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{`Aucune invitation refusée.`}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{`Invitations refusées`}</CardTitle>
        <CardDescription>{`Gérez les invitations refusées pour votre équipe`}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{`Nom`}</TableHead>
              <TableHead>{`Email`}</TableHead>
              <TableHead>{`Actions`}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {localRejectedMemberships.map((membership) => (
              <TableRow key={membership.id}>
                <TableCell>{membership.user.name}</TableCell>
                <TableCell>{membership.user.email}</TableCell>
                <TableCell>
                  <Button size="sm" onClick={() => handleRevokeRejection(membership.userId)}>
                    <RefreshCwIcon className="mr-2 size-4" />
                    {`Révoquer le refus`}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
