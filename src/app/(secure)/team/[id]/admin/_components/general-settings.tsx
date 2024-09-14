"use client";

import { CopyIcon, LinkIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function GeneralSettings({ teamId }: { teamId: string }) {
  const [teamName, setTeamName] = useState("");
  const [defaultCoins, setDefaultCoins] = useState("300");
  const [defaultDuration, setDefaultDuration] = useState("1");

  const inviteLink = `https://example.com/invite/${teamId}`;

  const handleSaveGeneral = () => {
    // Logique pour sauvegarder les paramètres généraux
  };

  const handleDeleteTeam = () => {
    // Logique pour supprimer l'équipe
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{"Paramètres généraux"}</CardTitle>
        <CardDescription>{"Gérez les paramètres de base de votre équipe"}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="teamName">{"Nom de l'équipe"}</Label>
          <Input id="teamName" value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="Nom de l'équipe" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="defaultCoins">{"Jetons par défaut"}</Label>
          <Input id="defaultCoins" type="number" value={defaultCoins} onChange={(e) => setDefaultCoins(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="defaultDuration">{"Durée par défaut des paris (heures)"}</Label>
          <Input id="defaultDuration" type="number" value={defaultDuration} onChange={(e) => setDefaultDuration(e.target.value)} />
        </div>
        <Dialog>
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
              <Button size="icon" onClick={() => navigator.clipboard.writeText(inviteLink)}>
                <CopyIcon className="size-4" />
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handleSaveGeneral}>{"Enregistrer"}</Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">
              <TrashIcon className="mr-2 size-4" />
              {"Supprimer l'équipe"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{"Confirmer la suppression"}</DialogTitle>
              <DialogDescription>{"Êtes - vous sûr de vouloir supprimer cette équipe ? Cette action est irréversible."}</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => {}}>
                {"Annuler"}
              </Button>
              <Button variant="destructive" onClick={handleDeleteTeam}>
                {"Supprimer"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
