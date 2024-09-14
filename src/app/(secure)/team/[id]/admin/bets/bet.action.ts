"use server";

import { betSchema } from "@/app/(secure)/team/[id]/admin/bets/bet.schema";
import { authActionClient } from "@/lib/safe-action";

export const createBet = authActionClient.schema(betSchema).action(async ({ parsedInput, ctx: { user } }) => {
  // TODO: Implement actual bet creation logic
  console.log("Creating bet:", parsedInput, "for user:", user.id);

  // Simulating a successful creation
  return {
    success: true,
    message: "Le pari a été créé avec succès.",
  };
});

export const updateBet = authActionClient.schema(betSchema).action(async ({ parsedInput, ctx: { user } }) => {
  // TODO: Implement actual bet update logic
  console.log("Updating bet:", parsedInput, "for user:", user.id);

  // Simulating a successful update
  return {
    success: true,
    message: "Le pari a été mis à jour avec succès.",
  };
});
