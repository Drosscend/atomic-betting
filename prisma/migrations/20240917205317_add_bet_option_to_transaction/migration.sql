/*
  Warnings:

  - Added the required column `betOptionId` to the `bet_transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bet_transactions" ADD COLUMN     "betOptionId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "bet_transactions" ADD CONSTRAINT "bet_transactions_betOptionId_fkey" FOREIGN KEY ("betOptionId") REFERENCES "bet_options"("id") ON DELETE CASCADE ON UPDATE CASCADE;
