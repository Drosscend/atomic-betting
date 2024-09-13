"use client";

import React, { ReactNode, createContext, useContext, useState } from "react";

type TeamContextType = {
  selectedTeamId: string | null;
  setSelectedTeamId: (teamId: string) => void;
};

const TeamContext = createContext<TeamContextType | undefined>(undefined);

type TeamProviderProps = {
  children: ReactNode;
  initialTeamId?: string | null;
};

export function TeamProvider({ children, initialTeamId }: TeamProviderProps) {
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(initialTeamId ?? null);

  return <TeamContext.Provider value={{ selectedTeamId, setSelectedTeamId }}>{children}</TeamContext.Provider>;
}

export function useTeam() {
  const context = useContext(TeamContext);
  if (context === undefined) {
    throw new Error("useTeam must be used within a TeamProvider");
  }
  return context;
}
