import { MembershipRole, MembershipStatus } from "@prisma/client";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      teams: {
        teamId: string;
        teamName: string;
        role: MembershipRole;
        status: MembershipStatus;
        coins: number;
      }[];
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    teams: {
      teamId: string;
      teamName: string;
      role: MembershipRole;
      status: MembershipStatus;
      coins: number;
    }[];
  }
}
