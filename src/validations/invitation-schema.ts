import { z } from "zod";

export const joinTeamSchema = z.object({
  teamId: z.string().uuid(),
});

export type JoinTeamInput = z.infer<typeof joinTeamSchema>;
