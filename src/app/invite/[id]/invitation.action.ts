"use server";

import { z } from "zod";
import { authActionClient } from "@/lib/safe-action";

const joinTeamSchema = z.object({ teamId: z.string() });

export const joinTeam = authActionClient.schema(joinTeamSchema).action(async ({ parsedInput: { teamId }, ctx: { user } }) => {
  try {
    // Logique pour rejoindre l'équipe
    // Par exemple : await addUserToTeam(userId, teamId);

    return {
      success: true,
      message: "Vous avez rejoint l'équipe avec succès.",
    };
  } catch (error) {
    return {
      success: false,
      message: "Une erreur est survenue lors de la tentative de rejoindre l'équipe.",
    };
  }
});
