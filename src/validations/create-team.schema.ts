import { z } from "zod";

const MIN_TEAM_NAME_LENGTH = 3;
const MAX_TEAM_NAME_LENGTH = 50;
const MIN_DEFAULT_COINS = 0;
const MAX_DEFAULT_COINS = 1000000;
const MIN_DEFAULT_HOURS_BET = 1;
const MAX_DEFAULT_HOURS_BET = 168; // one week

export const createTeamSchema = z.object({
  name: z
    .string()
    .min(MIN_TEAM_NAME_LENGTH, { message: `Le nom de l'équipe doit contenir au moins ${MIN_TEAM_NAME_LENGTH} caractères.` })
    .max(MAX_TEAM_NAME_LENGTH, { message: `Le nom de l'équipe ne peut pas dépasser ${MAX_TEAM_NAME_LENGTH} caractères.` }),
  defaultCoins: z
    .number()
    .int()
    .min(MIN_DEFAULT_COINS, { message: `Le nombre de pièces par défaut doit être au moins ${MIN_DEFAULT_COINS}.` })
    .max(MAX_DEFAULT_COINS, { message: `Le nombre de pièces par défaut ne peut pas dépasser ${MAX_DEFAULT_COINS}.` })
    .default(300),
  defaultHoursBet: z
    .number()
    .int()
    .min(MIN_DEFAULT_HOURS_BET, { message: `Le nombre d'heures de pari par défaut doit être au moins ${MIN_DEFAULT_HOURS_BET}.` })
    .max(MAX_DEFAULT_HOURS_BET, { message: `Le nombre d'heures de pari par défaut ne peut pas dépasser ${MAX_DEFAULT_HOURS_BET}.` })
    .default(24),
});

export type CreateTeamInput = z.infer<typeof createTeamSchema>;
