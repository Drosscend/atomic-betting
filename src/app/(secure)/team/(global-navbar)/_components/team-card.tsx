"use client";

import { useTeam } from "@/contexts/team-context";
import { MembershipStatus } from "@prisma/client";
import { GalleryVerticalEndIcon, UsersIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { TeamWithMemberships } from "@/lib/database/team";

interface TeamCardProps {
  team: TeamWithMemberships;
  activeBetsCount: number;
}

export function TeamCard({ team, activeBetsCount }: TeamCardProps) {
  const { setSelectedTeamId } = useTeam();

  const handleTeamClick = () => {
    setSelectedTeamId(team.id);
  };

  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{team.name}</span>
          <Badge variant="secondary" className="ml-2">
            <GalleryVerticalEndIcon className="mr-1 size-3" />
            {`${activeBetsCount} ${activeBetsCount === 1 ? "pari actif" : "paris actifs"}`}
          </Badge>
        </CardTitle>
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
          {`${team.memberships.filter((membership) => membership.status === MembershipStatus.APPROVED).length} membres`}
        </p>
      </CardContent>
      <CardFooter>
        <Link href={`/team/${team.id}`} passHref className="w-full">
          <Button className="w-full" onClick={handleTeamClick}>{`Accéder à l'équipe`}</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
