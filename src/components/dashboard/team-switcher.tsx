"use client";

import { useTeam } from "@/contexts/team-context";
import { CaretSortIcon, CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { type ComponentPropsWithoutRef, useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface TeamSwitcherProps extends ComponentPropsWithoutRef<typeof PopoverTrigger> {}

export function TeamSwitcher({ className }: TeamSwitcherProps) {
  const [open, setOpen] = useState(false);
  const { selectedTeamId, setSelectedTeamId } = useTeam();
  const { data: session } = useSession();

  const teams = useMemo(() => session?.user?.teams || [], [session?.user?.teams]);
  const selectedTeam = useMemo(() => teams.find((team) => team.teamId === selectedTeamId), [teams, selectedTeamId]);

  const groups = [
    {
      label: `Mes équipes`,
      teams: teams.map((team) => ({ label: team.teamName, value: team.teamId })),
    },
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label={`Sélectionner une équipe`}
          className={cn("w-[220px] justify-between", className)}
        >
          <Avatar className="mr-2 size-5">
            <AvatarImage
              src={`https://avatar.vercel.sh/${selectedTeamId || "default"}.png`}
              alt={selectedTeam?.teamName || "Default"}
              className="grayscale"
            />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          {selectedTeam?.teamName || `Sélectionner une équipe`}
          <CaretSortIcon className="ml-auto size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={`Chercher une équipe`} />
          <CommandList>
            <CommandEmpty>{`Pas d'équipe trouvée`}</CommandEmpty>
            {groups.map((group) => (
              <CommandGroup key={group.label} heading={group.label}>
                {group.teams.map((team) => (
                  <Link href={`/dashboard/${team.value}`} key={team.value} passHref>
                    <CommandItem
                      onSelect={() => {
                        setSelectedTeamId(team.value);
                        setOpen(false);
                      }}
                      className="text-sm"
                    >
                      <Avatar className="mr-2 size-5">
                        <AvatarImage src={`https://avatar.vercel.sh/${team.value}.png`} alt={team.label} className="grayscale" />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      {team.label}
                      <CheckIcon className={cn("ml-auto size-4", selectedTeamId === team.value ? "opacity-100" : "opacity-0")} />
                    </CommandItem>
                  </Link>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <Link href={`/dashboard/new-team`} passHref>
                <CommandItem
                  onSelect={() => {
                    setOpen(false);
                  }}
                  className="text-sm"
                >
                  <PlusCircledIcon className="mr-2 size-5" />
                  {`Créer une équipe`}
                </CommandItem>
              </Link>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                }}
              >
                <PlusCircledIcon className="mr-2 size-5" />
                {`Rejoindre une équipe`}
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
