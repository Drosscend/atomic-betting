"use client";

import { useTeam } from "@/contexts/team-context";
import { HomeIcon, PlusCircle, UserPlus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { JoinTeamDialog } from "@/components/join-team-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export function TeamSwitcher() {
  const { selectedTeamId, setSelectedTeamId } = useTeam();
  const { data: session } = useSession();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const teams = useMemo(() => session?.user?.teams || [], [session?.user?.teams]);
  const selectedTeam = useMemo(() => teams.find((team) => team.teamId === selectedTeamId), [teams, selectedTeamId]);

  const handleSelectChange = (value: string) => {
    if (value === "dashboard" || value === "team/new-team") {
      router.push(`/${value}`);
      return;
    }
    if (value === "join-team") {
      setIsDialogOpen(true);
      return;
    }
    setSelectedTeamId(value);
  };

  return (
    <>
      <Select value={selectedTeamId ?? undefined} onValueChange={handleSelectChange}>
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder="Sélectionner une équipe">
            {selectedTeam && (
              <div className="flex items-center">
                <Avatar className="mr-2 size-5">
                  <AvatarImage src={`https://avatar.vercel.sh/${selectedTeamId}.png`} alt={selectedTeam.teamName} className="grayscale" />
                  <AvatarFallback>{selectedTeam.teamName[0]}</AvatarFallback>
                </Avatar>
                {selectedTeam.teamName}
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Mes équipes</SelectLabel>
            {teams.map((team) => (
              <SelectItem key={team.teamId} value={team.teamId} className="cursor-pointer">
                <div className="flex items-center">
                  <Avatar className="mr-2 size-5">
                    <AvatarImage src={`https://avatar.vercel.sh/${team.teamId}.png`} alt={team.teamName} className="grayscale" />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  {team.teamName}
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
          <Separator className="my-2" />
          <SelectGroup>
            <SelectItem value="dashboard" className="cursor-pointer">
              <div className="flex items-center">
                <HomeIcon className="mr-2 size-4" />
                Tableau de bord
              </div>
            </SelectItem>
            <SelectItem value="team/new-team" className="cursor-pointer">
              <div className="flex items-center">
                <PlusCircle className="mr-2 size-4" />
                Créer une équipe
              </div>
            </SelectItem>
            <SelectItem value="join-team" className="cursor-pointer">
              <div className="flex items-center">
                <UserPlus className="mr-2 size-4" />
                Rejoindre une équipe
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
