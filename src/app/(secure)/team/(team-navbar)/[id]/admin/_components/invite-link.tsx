"use client";

import { getInviteLink } from "@/app/(secure)/team/(team-navbar)/[id]/admin/actions";
import { CopyIcon, LinkIcon } from "lucide-react";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export function InviteLinkComponent({ teamId }: { teamId: string }) {
  const [inviteLink, setInviteLink] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { execute: executeGetInviteLink, status } = useAction(getInviteLink, {
    onSuccess: (result) => {
      if (result.data && result.data.success) {
        setInviteLink(result.data.inviteLink);
        setIsDialogOpen(true);
      }
    },
    onError: ({ error }) => {
      toast.error(`Une erreur est survenue : ${error.serverError || "Erreur inconnue"}`);
    },
  });

  const handleGetInviteLink = () => {
    executeGetInviteLink(teamId);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      toast.success("Lien d'invitation copié dans le presse-papiers.");
    } catch (err) {
      console.error("Erreur lors de la copie :", err);
      toast.error("Impossible de copier le lien. Veuillez le copier manuellement.");
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full" onClick={handleGetInviteLink} disabled={status === "executing"}>
          <LinkIcon className="mr-2 size-4" />
          {status === "executing" ? "Chargement..." : "Obtenir le lien d'invitation"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{"Lien d'invitation"}</DialogTitle>
          <DialogDescription>{"Partagez ce lien pour inviter de nouveaux membres à rejoindre votre équipe."}</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Input value={inviteLink} readOnly />
          <Button size="icon" onClick={handleCopyLink}>
            <CopyIcon className="size-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
