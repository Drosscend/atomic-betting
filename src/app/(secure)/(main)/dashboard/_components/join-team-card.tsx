"use client";

import { UserPlusIcon } from "lucide-react";
import { useState } from "react";
import { JoinTeamDialog } from "@/components/join-team-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";

export function JoinTeamCard() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Card className="transition-shadow hover:shadow-lg">
        <CardHeader>
          <CardTitle>{`Rejoindre une équipe`}</CardTitle>
        </CardHeader>
        <CardContent className="flex h-48 items-center justify-center">
          <UserPlusIcon className="size-16 text-gray-400" />
        </CardContent>
        <CardFooter>
          <Button className="w-full" variant="outline" onClick={() => setIsDialogOpen(true)}>
            {`Rejoindre`}
          </Button>
        </CardFooter>
      </Card>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <JoinTeamDialog />
      </Dialog>
    </>
  );
}
