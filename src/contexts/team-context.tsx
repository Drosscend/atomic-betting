"use client";

import React, { ReactNode, createContext, useContext, useState } from "react";
import { type TeamWithUsers } from "@/lib/database/team";

type TeamContextType = {
  selectedTeam: TeamWithUsers | null;
  setSelectedTeam: (team: TeamWithUsers | null) => void;
};

const TeamContext = createContext<TeamContextType | undefined>(undefined);

type TeamProviderProps = {
  children: ReactNode;
  initialTeam?: TeamWithUsers;
};

export function TeamProvider({ children, initialTeam }: TeamProviderProps) {
  const [selectedTeam, setSelectedTeam] = useState<TeamWithUsers | null>(initialTeam || null);

  return <TeamContext.Provider value={{ selectedTeam, setSelectedTeam }}>{children}</TeamContext.Provider>;
}

export function useTeam() {
  const context = useContext(TeamContext);
  if (context === undefined) {
    throw new Error("useTeam must be used within a TeamProvider");
  }
  return context;
}
