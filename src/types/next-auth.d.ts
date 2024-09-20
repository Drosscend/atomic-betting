import { MembershipRole, MembershipStatus } from "@prisma/client";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      biography?: string | null;
      teams: {
        teamId: string;
        teamName: string;
        role: MembershipRole;
        status: MembershipStatus;
        coins: number;
      }[];
    } & DefaultSession["user"];
    id: string;
    sessionToken: string;
    userId: string;
  }

  interface User {
    id: string;
    biography?: string | null;
    teams: {
      teamId: string;
      teamName: string;
      role: MembershipRole;
      status: MembershipStatus;
      coins: number;
    }[];
  }
}
