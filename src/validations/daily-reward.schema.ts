import { z } from "zod";

export const dailyRewardSchema = z.object({
  teamId: z.string().uuid({ message: "L'ID de l'équipe doit être un UUID valide." }),
});

export type DailyRewardInput = z.infer<typeof dailyRewardSchema>;
