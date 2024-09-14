import { z } from "zod";

export const createTeamSchema = z.object({
  name: z
    .string()
    .min(1, { message: `Le nom de l'équipe est requis.` })
    .max(50, { message: `Le nom de l'équipe ne peut pas dépasser 50 caractères.` }),
  defaultCoins: z.number().int().min(0, { message: `Le nombre de pièces par défaut doit être positif.` }).default(300),
  defaultHoursBet: z.number().int().min(1, { message: `Le nombre d'heures de pari par défaut doit être au moins 1.` }).default(1),
});

export type CreateTeamInput = z.infer<typeof createTeamSchema>;
