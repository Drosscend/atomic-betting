"use client";

import { deleteTeam } from "@/app/(secure)/team/(team-navbar)/[id]/admin/actions";
import { DeleteTeamInput, deleteTeamSchema } from "@/validations/team-settings.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { TrashIcon } from "lucide-react";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface DangerZoneProps {
  teamId: string;
  isAdmin: boolean;
}
export function DangerZone({ teamId, isAdmin }: DangerZoneProps) {
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const deleteForm = useForm<DeleteTeamInput>({
    resolver: zodResolver(deleteTeamSchema),
    defaultValues: {
      confirmation: "" as "supprimer",
    },
  });

  const { execute: executeDelete, status: deleteStatus } = useAction(deleteTeam, {
    onSuccess: (result) => {
      if (result.data && result.data.success) {
        toast(result.data.message);
        router.push("/team");
      } else if (result.data) {
        toast(result.data.message);
      }
    },
    onError: ({ error }) => {
      toast(`Une erreur est survenue : ${error.serverError || "Erreur inconnue"}`);
    },
  });

  const onDelete = (data: DeleteTeamInput) => {
    executeDelete({ ...data, teamId });
  };

  return (
    <Card className="border-red-500">
      <CardHeader>
        <CardTitle className="text-red-500">{`Zone de danger`}</CardTitle>
        <CardDescription>{`Actions irréversibles pour votre équipe`}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4 text-sm">
          {`La suppression de l'équipe est une action irréversible. Toutes les données associées seront perdues.`}
        </p>
        <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(true)} disabled={!isAdmin}>
          <TrashIcon className="mr-2 size-4" />
          {`Supprimer l'équipe`}
        </Button>
      </CardContent>

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
