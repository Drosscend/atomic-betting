"use client";

import { updateMembershipStatus } from "@/app/(secure)/team/[id]/admin/users/actions";
import { UpdateMembershipStatusInput } from "@/validations/membership-status-management.schema";
import { MembershipStatus } from "@prisma/client";
import { CheckIcon, XIcon } from "lucide-react";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { MembershipsWithUsers, TeamWithMemberships } from "@/lib/database/team";

export function PendingInvitationsManagement({ team }: { team: TeamWithMemberships }) {
  const [localPendingMemberships, setLocalPendingMemberships] = useState<MembershipsWithUsers[]>(
    team.memberships.filter((membership) => membership.status === MembershipStatus.PENDING)
  );

  const { execute: executeUpdateStatus } = useAction(updateMembershipStatus, {
    onSuccess: (result) => {
      if (result.data && result.data.success) {
        toast(result.data.message);
      } else if (result.data) {
        toast(result.data.message);
      }
    },
    onError: ({ error }) => {
      console.error("Erreur lors de la mise à jour du statut:", error);
      toast(`Une erreur est survenue : ${error.serverError || "Erreur inconnue"}`);
    },
  });

  const handleStatusChange = (userId: string, newStatus: MembershipStatus) => {
    const data: UpdateMembershipStatusInput = {
      userId,
      status: newStatus,
      teamId: team.id,
    };
    executeUpdateStatus(data);
    setLocalPendingMemberships(localPendingMemberships.filter((membership) => membership.userId !== userId));
  };

  if (localPendingMemberships.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{`Invitations en attente`}</CardTitle>
          <CardDescription>{`Gérez les invitations en attente pour votre équipe`}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{`Aucune invitation en attente.`}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{`Invitations en attente`}</CardTitle>
        <CardDescription>{`Gérez les invitations en attente pour votre équipe`}</CardDescription>
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
            {localPendingMemberships.map((membership) => (
              <TableRow key={membership.id}>
                <TableCell>{membership.user.name}</TableCell>
                <TableCell>{membership.user.email}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={() => handleStatusChange(membership.userId, MembershipStatus.APPROVED)}>
                      <CheckIcon className="mr-2 size-4" />
                      {`Approuver`}
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleStatusChange(membership.userId, MembershipStatus.REJECTED)}>
                      <XIcon className="mr-2 size-4" />
                      {`Rejeter`}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
