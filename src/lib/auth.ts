import { PrismaAdapter } from "@auth/prisma-adapter";
import { MembershipStatus } from "@prisma/client";
import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { prisma } from "@/lib/database/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  providers: [GitHub, Discord, Google],
  pages: {
    signIn: "/sign-in",
    newUser: "/welcome",
  },
  session: {
    strategy: "database",
  },
  callbacks: {
    async session({ session, user }) {
      // Fetch user's memberships and roles
      const teams = await prisma.team.findMany({
        where: {
          memberships: {
            some: {
              userId: session.user.id,
              status: MembershipStatus.APPROVED,
            },
          },
        },
        include: {
          memberships: true,
        },
      });

      // Add memberships and roles to the session
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          teams: teams.map((team) => ({
            teamId: team.id,
            teamName: team.name,
            status: team.memberships.find((m) => m.userId === user.id)!.status,
            role: team.memberships.find((m) => m.userId === user.id)!.role,
            coins: team.memberships.find((m) => m.userId === user.id)!.coins,
          })),
        },
      };
    },
  },
});
