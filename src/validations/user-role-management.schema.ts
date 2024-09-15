import { MembershipRole } from "@prisma/client";
import { z } from "zod";

export const updateUserRoleSchema = z.object({
  userId: z.string(),
  role: z.nativeEnum(MembershipRole),
  teamId: z.string(),
});

export type UpdateUserRoleInput = z.infer<typeof updateUserRoleSchema>;
