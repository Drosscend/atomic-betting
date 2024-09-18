-- AlterTable
ALTER TABLE "team_memberships" ADD COLUMN     "consecutiveDays" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lastDailyReward" TIMESTAMP(3);
