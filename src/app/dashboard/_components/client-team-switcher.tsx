"use client";

import { useTeam } from "@/contexts/team-context";
import { CaretSortIcon, CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { type ComponentPropsWithoutRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { type TeamWithUsers } from "@/lib/database/team";
import { cn } from "@/lib/utils";

interface ClientTeamSwitcherProps extends ComponentPropsWithoutRef<typeof PopoverTrigger> {
  teams: TeamWithUsers[];
}

export function ClientTeamSwitcher({ className, teams }: ClientTeamSwitcherProps) {
  const [open, setOpen] = useState(false);
  const { selectedTeam, setSelectedTeam } = useTeam();

  const groups = [
    {
      label: `Mes équipes`,
      teams: teams.map((team) => ({ label: team.name, value: team.id })),
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
              src={`https://avatar.vercel.sh/${selectedTeam?.id || "default"}.png`}
              alt={selectedTeam?.name || "Default"}
              className="grayscale"
            />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          {selectedTeam?.name || `Sélectionner une équipe`}
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
                        setSelectedTeam(teams.find((t) => t.id === team.value) || null);
                        setOpen(false);
                      }}
                      className="text-sm"
                    >
                      <Avatar className="mr-2 size-5">
                        <AvatarImage src={`https://avatar.vercel.sh/${team.value}.png`} alt={team.label} className="grayscale" />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      {team.label}
                      <CheckIcon className={cn("ml-auto size-4", selectedTeam?.id === team.value ? "opacity-100" : "opacity-0")} />
                    </CommandItem>
                  </Link>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                }}
              >
                <PlusCircledIcon className="mr-2 size-5" />
                {`Créer une équipe`}
              </CommandItem>
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
