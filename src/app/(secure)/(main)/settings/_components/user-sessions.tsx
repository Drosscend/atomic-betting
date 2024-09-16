"use client";

import { deleteSession } from "@/app/(secure)/(main)/settings/actions";
import { DeleteSessionInput } from "@/validations/user-settings.schema";
import type { Session } from "@prisma/client";
import { TrashIcon } from "lucide-react";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type UserSessionsProps = {
  sessions: Session[];
  currentSessionId: string;
};

export function UserSessions({ sessions, currentSessionId }: UserSessionsProps) {
  const router = useRouter();
  const [sessionToDelete, setSessionToDelete] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { execute, status } = useAction(deleteSession, {
    onSuccess: (result) => {
      if (result.data && result.data.success) {
        toast(result.data.message);
        router.refresh();
      } else if (result.data) {
        toast(result.data.message);
      }
      setIsDialogOpen(false);
    },
    onError: ({ error }) => {
      toast(`Une erreur est survenue : ${error.serverError || "Erreur inconnue"}`);
      setIsDialogOpen(false);
    },
  });

  const handleDeleteSession = () => {
    if (sessionToDelete) {
      const input: DeleteSessionInput = { sessionId: sessionToDelete };
      execute(input);
    }
  };

  const openConfirmDialog = (sessionId: string) => {
    setSessionToDelete(sessionId);
    setIsDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{`Vos sessions actives`}</CardTitle>
      </CardHeader>
      <CardContent>
        {sessions.length === 0 ? (
          <p>{`Vous n'avez aucune session active.`}</p>
        ) : (
          <ul className="space-y-2">
            {sessions.map((session) => (
              <li key={session.id} className="flex items-center justify-between">
                <span>{`Session expire le ${new Date(session.expires).toLocaleString()}${
                  session.id === currentSessionId ? " (session actuelle)" : ""
                }`}</span>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => openConfirmDialog(session.id)} variant="destructive" size="sm" disabled={status === "executing"}>
                      <TrashIcon className="mr-2 size-4" />
                      {`Supprimer`}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{`Confirmer la suppression`}</DialogTitle>
                      <DialogDescription>{`Êtes-vous sûr de vouloir supprimer cette session ? Cette action est irréversible.`}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        {`Annuler`}
                      </Button>
                      <Button variant="destructive" onClick={handleDeleteSession} disabled={status === "executing"}>
                        {`Confirmer la suppression`}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
