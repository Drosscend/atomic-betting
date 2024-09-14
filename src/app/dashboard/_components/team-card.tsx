import { MembershipStatus } from "@prisma/client";
import { UsersIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { TeamWithMemberships } from "@/lib/database/team";

interface TeamCardProps {
  team: TeamWithMemberships;
}

export function TeamCard({ team }: TeamCardProps) {
  return (
    <Card className="transition-shadow hover:shadow-lg">
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
  );
}
