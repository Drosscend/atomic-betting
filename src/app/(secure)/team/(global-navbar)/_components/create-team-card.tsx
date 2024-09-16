import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function CreateTeamCard() {
  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardHeader>
        <CardTitle>{"Créer une équipe"}</CardTitle>
      </CardHeader>
      <CardContent className="flex h-48 items-center justify-center">
        <PlusIcon className="size-16 text-gray-400" />
      </CardContent>
      <CardFooter>
        <Link href="/team/new-team" passHref className="w-full">
          <Button className="w-full" variant="outline">
            {"Nouvelle équipe"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
