import { PlusIcon, UserPlusIcon, UsersIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = { title: "Dashboard", description: "Dashboard page" };

const teams = [
  { label: "M1 ICE", value: "e920f20c-2dfc-4239-9cb2-5db42682e143", members: 15 },
  { label: "M2 ICE", value: "15c93707-69f6-4607-a115-dbfc3b3dacef", members: 22 },
];

export default function Page() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Tableau de bord</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {teams.map((team) => (
          <Card key={team.value} className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <CardTitle>{team.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-32 items-center justify-center rounded-lg">
                <Image
                  src={`https://avatar.vercel.sh/${team.value}.png`}
                  alt={`${team.label} avatar`}
                  className="size-24 rounded-full"
                  width={96}
                  height={96}
                />
              </div>
              <p className="mt-4 text-center">
                <UsersIcon className="mr-2 inline-block" />
                {team.members} membres
              </p>
            </CardContent>
            <CardFooter>
              <Link href={`/dashboard/${team.value}`} passHref className="w-full">
                <Button className="w-full">{"Accéder à l'équipe"}</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
        <Card className="transition-shadow hover:shadow-lg">
          <CardHeader>
            <CardTitle>{"Créer une équipe"}</CardTitle>
          </CardHeader>
          <CardContent className="flex h-48 items-center justify-center">
            <PlusIcon className="size-16 text-gray-400" />
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline">
              Nouvelle équipe
            </Button>
          </CardFooter>
        </Card>
        <Card className="transition-shadow hover:shadow-lg">
          <CardHeader>
            <CardTitle>Rejoindre une équipe</CardTitle>
          </CardHeader>
          <CardContent className="flex h-48 items-center justify-center">
            <UserPlusIcon className="size-16 text-gray-400" />
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline">
              Rejoindre
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
