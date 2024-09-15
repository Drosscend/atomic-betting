"use client";

import { deleteTeam, getInviteLink, updateTeamSettings } from "@/app/(secure)/team/[id]/admin/actions";
import { DeleteTeamInput, UpdateTeamSettingsInput, deleteTeamSchema, updateTeamSettingsSchema } from "@/validations/team-settings.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Team } from "@prisma/client";
import { CopyIcon, LinkIcon, TrashIcon } from "lucide-react";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function GeneralSettings({ team }: { team: Team }) {
  const router = useRouter();
  const [inviteLink, setInviteLink] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const form = useForm<UpdateTeamSettingsInput>({
    resolver: zodResolver(updateTeamSettingsSchema),
    defaultValues: {
      teamName: team.name,
      defaultCoins: team.defaultCoins,
      defaultDuration: team.defaultHoursBet,
    },
  });

  const deleteForm = useForm<DeleteTeamInput>({
    resolver: zodResolver(deleteTeamSchema),
    defaultValues: {
      confirmation: "" as "supprimer",
    },
  });

  const { execute: executeUpdate, status: updateStatus } = useAction(updateTeamSettings, {
    onSuccess: (result) => {
      if (result.data && result.data.success) {
        toast(result.data.message);
      } else if (result.data) {
        toast(result.data.message);
      }
    },
    onError: ({ error }) => {
      toast(`Une erreur est survenue : ${error.serverError || "Erreur inconnue"}`);
    },
  });

  const { execute: executeDelete, status: deleteStatus } = useAction(deleteTeam, {
    onSuccess: (result) => {
      if (result.data && result.data.success) {
        toast(result.data.message);
        router.push("/dashboard");
      } else if (result.data) {
        toast(result.data.message);
      }
    },
    onError: ({ error }) => {
      toast(`Une erreur est survenue : ${error.serverError || "Erreur inconnue"}`);
    },
  });

  const { execute: executeGetInviteLink } = useAction(getInviteLink, {
    onSuccess: (result) => {
      if (result.data && result.data.success) {
        setInviteLink(result.data.inviteLink);
      }
    },
    onError: ({ error }) => {
      toast(`Une erreur est survenue : ${error.serverError || "Erreur inconnue"}`);
    },
  });

  const onSubmit = (data: UpdateTeamSettingsInput) => {
    executeUpdate({ ...data, teamId: team.id });
  };

  const onDelete = (data: DeleteTeamInput) => {
    executeDelete({ ...data, teamId: team.id });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{`Paramètres généraux`}</CardTitle>
        <CardDescription>{`Gérez les paramètres de base de votre équipe`}</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="teamName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{`Nom de l'équipe`}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="defaultCoins"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{`Jetons par défaut`}</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="defaultDuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{`Durée par défaut des paris (heures)`}</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full" onClick={() => executeGetInviteLink(team.id)}>
                  <LinkIcon className="mr-2 size-4" />
                  {`Obtenir le lien d'invitation`}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{`Lien d'invitation`}</DialogTitle>
                  <DialogDescription>{`Partagez ce lien pour inviter de nouveaux membres à rejoindre votre équipe.`}</DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                  <Input value={inviteLink} readOnly />
                  <Button
                    size="icon"
                    onClick={() => {
                      navigator.clipboard.writeText(inviteLink);
                      toast(`Lien d'invitation copié dans le presse-papiers.`);
                    }}
                  >
                    <CopyIcon className="size-4" />
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="submit" disabled={updateStatus === "executing"}>{`Enregistrer`}</Button>
            <Button type="button" variant="destructive" onClick={() => setIsDeleteDialogOpen(true)}>
              <TrashIcon className="mr-2 size-4" />
              {`Supprimer l'équipe`}
            </Button>
          </CardFooter>
        </form>
      </Form>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{`Confirmer la suppression`}</DialogTitle>
            <DialogDescription>{`Êtes-vous sûr de vouloir supprimer cette équipe ? Cette action est irréversible.`}</DialogDescription>
          </DialogHeader>
          <Form {...deleteForm}>
            <form onSubmit={deleteForm.handleSubmit(onDelete)}>
              <FormField
                control={deleteForm.control}
                name="confirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{`Tapez "supprimer" pour confirmer`}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="mt-4">
                <DialogClose asChild>
                  <Button type="button" variant="outline" onClick={() => deleteForm.reset()}>
                    {`Annuler`}
                  </Button>
                </DialogClose>
                <Button type="submit" variant="destructive" disabled={deleteStatus === "executing"}>
                  {`Supprimer`}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
