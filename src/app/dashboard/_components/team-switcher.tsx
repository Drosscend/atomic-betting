"use client";

import { TeamCreationForm } from "@/app/dashboard/_components/team-creation-form";
import { TeamDialog } from "@/app/dashboard/_components/team-dialog";
import { TeamJoinForm } from "@/app/dashboard/_components/team-join-form";
import { TeamSheet } from "@/app/dashboard/_components/team-sheet";
import { CaretSortIcon, CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { useMediaQuery } from "@uidotdev/usehooks";
import * as React from "react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const groups = [
  {
    label: "Mes équipes",
    teams: [
      { label: "Acme Inc.", value: "acme-inc" },
      { label: "Monsters Inc.", value: "monsters" },
    ],
  },
];

type Team = (typeof groups)[number]["teams"][number];

interface TeamSwitcherProps extends React.ComponentPropsWithoutRef<typeof PopoverTrigger> {}

export function TeamSwitcher({ className }: TeamSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = useState(false);
  const [showJoinTeamDialog, setShowJoinTeamDialog] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team>(groups[0].teams[0]);
  const isMobile = useMediaQuery("(max-width: 640px)");

  const handleNewTeamSubmit = () => {
    setShowNewTeamDialog(false);
    // Add logic to handle new team creation
  };

  const NewTeamContent = (
    <>
      <h2>Créer une équipe</h2>
      <p>Ajoutez une nouvelle équipe pour commencer vos paris</p>
      <TeamCreationForm onSubmit={handleNewTeamSubmit} />
    </>
  );

  const handleJoinTeamSubmit = () => {
    setShowJoinTeamDialog(false);
    // Add logic to handle team join
  };

  const JoinTeamContent = (
    <>
      <h2>Rejoindre une équipe</h2>
      <p>Entrez l'identifiant de l'équipe pour la rejoindre</p>
      <TeamJoinForm onSubmit={handleJoinTeamSubmit} />
    </>
  );

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Sélectionner une équipe"
            className={cn("w-[200px] justify-between", className)}
          >
            <Avatar className="mr-2 size-5">
              <AvatarImage src={`https://avatar.vercel.sh/${selectedTeam.value}.png`} alt={selectedTeam.label} className="grayscale" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            {selectedTeam.label}
            <CaretSortIcon className="ml-auto size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Chercher une équipe" />
            <CommandList>
              <CommandEmpty>Pas d'équipe trouvée</CommandEmpty>
              {groups.map((group) => (
                <CommandGroup key={group.label} heading={group.label}>
                  {group.teams.map((team) => (
                    <CommandItem
                      key={team.value}
                      onSelect={() => {
                        setSelectedTeam(team);
                        setOpen(false);
                      }}
                      className="text-sm"
                    >
                      <Avatar className="mr-2 size-5">
                        <AvatarImage src={`https://avatar.vercel.sh/${team.value}.png`} alt={team.label} className="grayscale" />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      {team.label}
                      <CheckIcon className={cn("ml-auto size-4", selectedTeam.value === team.value ? "opacity-100" : "opacity-0")} />
                    </CommandItem>
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
                    setShowNewTeamDialog(true);
                  }}
                >
                  <PlusCircledIcon className="mr-2 size-5" />
                  Créer une équipe
                </CommandItem>
              </CommandGroup>
            </CommandList>
            <CommandList>
              <CommandGroup>
                <CommandItem
                  onSelect={() => {
                    setOpen(false);
                    setShowJoinTeamDialog(true);
                  }}
                >
                  <PlusCircledIcon className="mr-2 size-5" />
                  Rejoindre une équipe
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {isMobile ? (
        <>
          <TeamSheet isOpen={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
            {NewTeamContent}
          </TeamSheet>
          <TeamSheet isOpen={showJoinTeamDialog} onOpenChange={setShowJoinTeamDialog}>
            {JoinTeamContent}
          </TeamSheet>
        </>
      ) : (
        <>
          <TeamDialog isOpen={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
            {NewTeamContent}
          </TeamDialog>
          <TeamDialog isOpen={showJoinTeamDialog} onOpenChange={setShowJoinTeamDialog}>
            {JoinTeamContent}
          </TeamDialog>
        </>
      )}
    </>
  );
}
