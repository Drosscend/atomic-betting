"use client";

import React, { ReactNode, createContext, useContext, useState } from "react";

export type Team = {
  label: string;
  value: string;
};

type TeamContextType = {
  selectedTeam: Team | null;
  setSelectedTeam: (team: Team | null) => void;
};

const TeamContext = createContext<TeamContextType | undefined>(undefined);

type TeamProviderProps = {
  children: ReactNode;
  initialTeam?: Team;
};

export function TeamProvider({ children, initialTeam }: TeamProviderProps) {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(initialTeam || null);

  return <TeamContext.Provider value={{ selectedTeam, setSelectedTeam }}>{children}</TeamContext.Provider>;
}

export function useTeam() {
  const context = useContext(TeamContext);
  if (context === undefined) {
    throw new Error("useTeam must be used within a TeamProvider");
  }
  return context;
}
