"use client";

import { updateUserRole } from "@/app/(secure)/team/(team-navbar)/[id]/admin/actions";
import { UpdateUserRoleInput } from "@/validations/user-role-management.schema";
import { MembershipRole } from "@prisma/client";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { MembershipsWithUsers, TeamWithMemberships } from "@/lib/database/team";

export function RoleManagement({ team }: { team: TeamWithMemberships }) {
  const [localUsers, setLocalUsers] = useState<MembershipsWithUsers[]>(team.memberships);

  const { execute: executeUpdateRole, hasSucceeded } = useAction(updateUserRole, {
    onSuccess: (result) => {
      if (result.data && result.data.success) {
        toast(result.data.message);
      } else if (result.data) {
        toast(result.data.message);
      }
    },
    onError: ({ error }) => {
      console.error("Erreur lors de la mise à jour du rôle:", error);
      toast(`Une erreur est survenue : ${error.serverError || "Erreur inconnue"}`);
    },
  });

  const handleRoleChange = (userId: string, newRole: MembershipRole) => {
    const data: UpdateUserRoleInput = {
      userId,
      role: newRole,
      teamId: team.id,
    };
    executeUpdateRole(data);
    if (hasSucceeded) {
      setLocalUsers(localUsers.map((user) => (user.id === userId ? { ...user, role: newRole } : user)));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{`Gestion des rôles`}</CardTitle>
        <CardDescription>{`Gérez les rôles des membres de votre équipe`}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{`Nom`}</TableHead>
              <TableHead>{`Email`}</TableHead>
              <TableHead>{`Rôle`}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {localUsers.map((membership) => (
              <TableRow key={membership.id}>
                <TableCell>{membership.user.name}</TableCell>
                <TableCell>{membership.user.email}</TableCell>
                <TableCell>
                  <Select value={membership.role} onValueChange={(value: MembershipRole) => handleRoleChange(membership.userId, value)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={`Sélectionner un rôle`} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={MembershipRole.MEMBER}>{`Utilisateur`}</SelectItem>
                      <SelectItem value={MembershipRole.MANAGER}>{`Manager`}</SelectItem>
                      <SelectItem value={MembershipRole.ADMIN}>{`Administrateur`}</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
