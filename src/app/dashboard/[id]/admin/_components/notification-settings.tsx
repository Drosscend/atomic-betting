"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function NotificationSettings({ teamId }: { teamId: string }) {
  const [newMemberNotif, setNewMemberNotif] = useState(false);
  const [betResolutionNotif, setBetResolutionNotif] = useState(false);

  const handleSaveNotifications = () => {
    // Logique pour sauvegarder les paramètres de notification
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{"Paramètres de notification"}</CardTitle>
        <CardDescription>{"Gérez vos préférences de notification"}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch id="newMemberNotif" checked={newMemberNotif} onCheckedChange={setNewMemberNotif} />
          <Label htmlFor="newMemberNotif">{"Recevoir un email quand un nouveau membre souhaite rejoindre"}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="betResolutionNotif" checked={betResolutionNotif} onCheckedChange={setBetResolutionNotif} />
          <Label htmlFor="betResolutionNotif">{"Recevoir un email pour choisir le résultat correct d'un pari"}</Label>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveNotifications}>{"Enregistrer"}</Button>
      </CardFooter>
    </Card>
  );
}
