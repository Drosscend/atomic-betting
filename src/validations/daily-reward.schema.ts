import { z } from "zod";

export const dailyRewardSchema = z.object({
  teamId: z.string().uuid(),
});

export type DailyRewardInput = z.infer<typeof dailyRewardSchema>;
