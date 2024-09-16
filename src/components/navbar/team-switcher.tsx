"use client";

import { useTeam } from "@/contexts/team-context";
import { useSyncTeamWithUrl } from "@/hooks/use-sync-team-with-url";
import { HomeIcon, PlusCircle, UserPlus } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { JoinTeamDialog } from "@/components/join-team-dialog";
import { TeamAvatar } from "@/components/navbar/team-avatar";
import { TeamSelectItem } from "@/components/navbar/team-select-item";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export function TeamSwitcher() {
  const { selectedTeamId, setSelectedTeamId } = useTeam();
  const { data: session } = useSession();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  useSyncTeamWithUrl(selectedTeamId, setSelectedTeamId);

  const teams = useMemo(() => session?.user?.teams || [], [session?.user?.teams]);
  const selectedTeam = useMemo(() => teams.find((team) => team.teamId === selectedTeamId), [teams, selectedTeamId]);

  const handleSelectChange = useCallback(
    (value: string) => {
      if (value === "team" || value === "team/new-team") {
        router.push(`/${value}`);
        return;
      }
      if (value === "join-team") {
        setIsDialogOpen(true);
        return;
      }
      setSelectedTeamId(value);
      router.push(`/team/${value}`);
    },
    [router, setSelectedTeamId]
  );

  return (
    <>
      <Select value={selectedTeamId ?? undefined} onValueChange={handleSelectChange}>
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder={`Sélectionner une équipe`}>
            {selectedTeam && (
              <div className="flex items-center">
                <TeamAvatar teamId={selectedTeam.teamId} teamName={selectedTeam.teamName} />
                {selectedTeam.teamName}
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{`Mes équipes`}</SelectLabel>
            {teams.map((team) => (
              <TeamSelectItem key={team.teamId} team={team} />
            ))}
          </SelectGroup>
          <Separator className="my-2" />
          <SelectGroup>
            <SelectItem value="team" className="cursor-pointer">
              <div className="flex items-center">
                <HomeIcon className="mr-2 size-4" />
                {`Tableau de bord`}
              </div>
            </SelectItem>
            <SelectItem value="team/new-team" className="cursor-pointer">
              <div className="flex items-center">
                <PlusCircle className="mr-2 size-4" />
                {`Créer une équipe`}
              </div>
            </SelectItem>
            <SelectItem value="join-team" className="cursor-pointer">
              <div className="flex items-center">
                <UserPlus className="mr-2 size-4" />
                {`Rejoindre une équipe`}
              </div>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <JoinTeamDialog />
      </Dialog>
    </>
  );
}
