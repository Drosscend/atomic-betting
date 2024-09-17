-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('BET', 'WINNINGS');

-- AlterTable
ALTER TABLE "bet_transactions" ADD COLUMN     "transactionType" "TransactionType" NOT NULL DEFAULT 'BET';
