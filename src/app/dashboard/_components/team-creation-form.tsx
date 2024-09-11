import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TeamFormProps {
  onSubmit: () => void;
}

export function TeamCreationForm({ onSubmit }: TeamFormProps) {
  return (
    <div className="space-y-4 py-2 pb-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nom de la team</Label>
        <Input id="name" placeholder="Acme Inc." />
      </div>
      <Button type="submit" onClick={onSubmit}>
        Continuer
      </Button>
    </div>
  );
}
