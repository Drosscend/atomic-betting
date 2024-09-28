"use client";

import { CopyIcon, LinkIcon } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export function InviteLinkComponent({ teamId }: { teamId: string }) {
  const inviteLink = `${process.env.NEXT_PUBLIC_APP_URL}/invite/${teamId}`;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
        <Button variant="outline" className="w-full">
          <LinkIcon className="mr-2 size-4" />
          {"Obtenir le lien d'invitation"}
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
