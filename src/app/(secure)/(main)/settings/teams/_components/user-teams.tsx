"use client";

import { LeaveTeamInputInput, leaveTeamSchemaInput } from "@/validations/leave-team.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { UserFull } from "@/lib/database/user";
import { leaveTeam } from "../actions";

interface UserTeamsProps {
  user: UserFull;
}

export function UserTeams({ user }: UserTeamsProps) {
  const [teams, setTeams] = useState(user.teamMemberships);
  const { update } = useSession();
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<LeaveTeamInputInput>({
    resolver: zodResolver(leaveTeamSchemaInput),
    defaultValues: {
      confirmation: "" as "quitter",
    },
  });

  const { execute: executeLeaveTeam, status } = useAction(leaveTeam, {
    onSuccess: async (result) => {
      if (result.data && result.data.success) {
        toast(result.data.message);
        const updatedTeams = teams.filter((team) => team.teamId !== result.data!.teamId);
        setTeams(updatedTeams);
        await update({ user: { ...user, teamMemberships: updatedTeams } });
        setDialogOpen(false);
      } else if (result.data) {
        toast(result.data.message);
      }
    },
    onError: ({ error }) => {
      console.error("Erreur lors de la sortie de l'équipe:", error);
      toast(`Une erreur est survenue : ${error.serverError || "Erreur inconnue"}`);
    },
  });

  const handleLeaveTeam = (data: LeaveTeamInputInput) => {
    if (selectedTeamId) {
      executeLeaveTeam({ teamId: selectedTeamId });
    }
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{`Nom de l'équipe`}</TableHead>
            <TableHead>{`Rôle`}</TableHead>
            <TableHead>{`Actions`}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teams.map((membership) => (
            <TableRow key={membership.teamId}>
              <TableCell>{membership.team.name}</TableCell>
              <TableCell>{membership.role}</TableCell>
              <TableCell>
                {membership.team.creatorId !== user.id && (
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="destructive" onClick={() => setSelectedTeamId(membership.teamId)}>
                        {`Quitter l'équipe`}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{`Êtes-vous sûr de vouloir quitter cette équipe ?`}</DialogTitle>
                        <DialogDescription>
                          {`Cette action est irréversible. Vous perdrez l'accès à toutes les données de l'équipe.`}
                        </DialogDescription>
                      </DialogHeader>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleLeaveTeam)}>
                          <FormField
                            control={form.control}
                            name="confirmation"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{`Tapez "quitter" pour confirmer`}</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <DialogFooter className="mt-4">
                            <Button type="submit" variant="destructive" disabled={status === "executing"}>
                              {status === "executing" ? `Chargement...` : `Quitter l'équipe`}
                            </Button>
                          </DialogFooter>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                )}
                {membership.team.creatorId === user.id && <span className="text-muted-foreground text-sm">{`Créateur de l'équipe`}</span>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
