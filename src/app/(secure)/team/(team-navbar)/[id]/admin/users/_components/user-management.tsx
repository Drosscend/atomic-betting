"use client";

import { removeUser, updateUserCoins } from "@/app/(secure)/team/(team-navbar)/[id]/admin/users/actions";
import { RemoveUserInput, UpdateUserCoinsInput } from "@/validations/user-management.schema";
import { MembershipRole, MembershipStatus } from "@prisma/client";
import { TrashIcon } from "lucide-react";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DebounceInput from "@/components/ui/debounce-input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { MembershipsWithUsers, TeamWithMemberships } from "@/lib/database/team";

export function UserManagement({ team }: { team: TeamWithMemberships }) {
  const [localUsers, setLocalUsers] = useState<MembershipsWithUsers[]>(
    team.memberships.filter((membership) => membership.status === MembershipStatus.APPROVED)
  );
  const [userToDelete, setUserToDelete] = useState<MembershipsWithUsers | null>(null);

  const { execute: executeUpdateCoins } = useAction(updateUserCoins, {
    onSuccess: (result) => {
      if (result.data && result.data.success) {
        toast(result.data.message);
      } else if (result.data) {
        toast(result.data.message);
      }
    },
    onError: ({ error }) => {
      console.error("Erreur lors de la mise à jour des jetons:", error);
      toast(`Une erreur est survenue : ${error.serverError || "Erreur inconnue"}`);
    },
  });

  const { execute: executeRemoveUser } = useAction(removeUser, {
    onSuccess: (result) => {
      if (result.data && result.data.success) {
        toast(result.data.message);
        setLocalUsers(localUsers.filter((user) => user.userId !== userToDelete?.userId));
        setUserToDelete(null);
      } else if (result.data) {
        toast(result.data.message);
      }
    },
    onError: ({ error }) => {
      console.error("Erreur lors de la suppression de l'utilisateur:", error);
      toast(`Une erreur est survenue : ${error.serverError || "Erreur inconnue"}`);
    },
  });

  const handleCoinsChange = useCallback(
    (userId: string, newCoins: number) => {
      const data: UpdateUserCoinsInput = {
        userId,
        coins: newCoins,
        teamId: team.id,
      };
      executeUpdateCoins(data);
      setLocalUsers((prevUsers) => prevUsers.map((user) => (user.userId === userId ? { ...user, coins: newCoins } : user)));
    },
    [executeUpdateCoins, team.id]
  );

  const handleRemoveUser = useCallback(() => {
    if (userToDelete) {
      const data: RemoveUserInput = {
        userId: userToDelete.userId,
        teamId: team.id,
      };
      executeRemoveUser(data);
    }
  }, [executeRemoveUser, team.id, userToDelete]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{`Gestion des utilisateurs`}</CardTitle>
        <CardDescription>{`Gérez les jetons et les membres de votre équipe`}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{`Nom`}</TableHead>
              <TableHead>{`Email`}</TableHead>
              <TableHead>{`Jetons`}</TableHead>
              <TableHead>{`Actions`}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {localUsers.map((membership) => (
              <TableRow key={membership.id}>
                <TableCell>{membership.user.name}</TableCell>
                <TableCell>{membership.user.email}</TableCell>
                <TableCell>
                  <DebounceInput
                    type="number"
                    value={membership.coins}
                    onChange={(value) => handleCoinsChange(membership.userId, value as number)}
                    className="w-20"
                    min={0}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => setUserToDelete(membership)}
                    disabled={membership.role === MembershipRole.ADMIN}
                  >
                    <TrashIcon className="mr-2 size-4" />
                    {`Supprimer`}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <Dialog open={!!userToDelete} onOpenChange={(open) => !open && setUserToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{`Confirmer la suppression`}</DialogTitle>
            <DialogDescription>
              {`Êtes-vous sûr de vouloir supprimer ${userToDelete?.user.name} de l'équipe ? Cette action est irréversible.`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUserToDelete(null)}>{`Annuler`}</Button>
            <Button variant="destructive" onClick={handleRemoveUser}>{`Supprimer`}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
