import { MembershipStatus } from "@prisma/client";
import { z } from "zod";

export const updateMembershipStatusSchema = z.object({
  userId: z.string(),
  status: z.nativeEnum(MembershipStatus),
  teamId: z.string(),
});

export type UpdateMembershipStatusInput = z.infer<typeof updateMembershipStatusSchema>;
