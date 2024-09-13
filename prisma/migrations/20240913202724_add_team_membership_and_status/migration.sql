/*
  Warnings:

  - You are about to drop the `_TeamMembers` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[token]` on the table `verificationtokens` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "MembershipStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "MembershipRole" AS ENUM ('MEMBER', 'MANAGER', 'ADMIN');

-- DropForeignKey
ALTER TABLE "_TeamMembers" DROP CONSTRAINT "_TeamMembers_A_fkey";

-- DropForeignKey
ALTER TABLE "_TeamMembers" DROP CONSTRAINT "_TeamMembers_B_fkey";

-- DropTable
DROP TABLE "_TeamMembers";

-- CreateTable
CREATE TABLE "team_memberships" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "status" "MembershipStatus" NOT NULL,
    "role" "MembershipRole" NOT NULL DEFAULT 'MEMBER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "team_memberships_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "team_memberships_userId_teamId_key" ON "team_memberships"("userId", "teamId");

-- CreateIndex
CREATE UNIQUE INDEX "verificationtokens_token_key" ON "verificationtokens"("token");

-- AddForeignKey
ALTER TABLE "team_memberships" ADD CONSTRAINT "team_memberships_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_memberships" ADD CONSTRAINT "team_memberships_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;
