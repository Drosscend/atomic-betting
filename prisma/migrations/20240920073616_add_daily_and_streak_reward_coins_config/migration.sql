-- AlterTable
ALTER TABLE "teams" ADD COLUMN     "dailyRewardCoins" INTEGER NOT NULL DEFAULT 10,
ADD COLUMN     "streakRewardCoins" INTEGER NOT NULL DEFAULT 50;
