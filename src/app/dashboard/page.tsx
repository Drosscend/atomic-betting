import { MembershipStatus } from "@prisma/client";
import { PlusIcon, UserPlusIcon, UsersIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getTeamsWithMemberships } from "@/lib/database/team";

export const metadata: Metadata = { title: "Dashboard", description: "Dashboard page" };

export default async function Page() {
  const teams = await getTeamsWithMemberships();

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Tableau de bord</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {teams.map((team) => (
          <Card key={team.id} className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <CardTitle>{team.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-32 items-center justify-center rounded-lg">
                <Image
                  src={`https://avatar.vercel.sh/${team.id}.png`}
                  alt={`${team.name} avatar`}
                  className="size-24 rounded-full"
                  width={96}
                  height={96}
                />
              </div>
              <p className="mt-4 text-center">
                <UsersIcon className="mr-2 inline-block" />
                {team.memberships.filter((membership) => membership.status === MembershipStatus.APPROVED).length} membres
              </p>
            </CardContent>
            <CardFooter>
              <Link href={`/dashboard/${team.id}`} passHref className="w-full">
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
