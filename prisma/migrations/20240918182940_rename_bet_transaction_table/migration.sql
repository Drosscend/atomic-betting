/*
  Warnings:

  - You are about to drop the `bet_transactions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "bet_transactions" DROP CONSTRAINT "bet_transactions_betId_fkey";

-- DropForeignKey
ALTER TABLE "bet_transactions" DROP CONSTRAINT "bet_transactions_betOptionId_fkey";

-- DropForeignKey
ALTER TABLE "bet_transactions" DROP CONSTRAINT "bet_transactions_teamMembershipId_fkey";

-- DropTable
DROP TABLE "bet_transactions";

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "teamMembershipId" TEXT NOT NULL,
    "coinsAmount" INTEGER NOT NULL,
    "transactionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "transactionType" "TransactionType" NOT NULL,
    "odds" DOUBLE PRECISION,
    "betId" TEXT,
    "betOptionId" TEXT,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_teamMembershipId_fkey" FOREIGN KEY ("teamMembershipId") REFERENCES "team_memberships"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_betId_fkey" FOREIGN KEY ("betId") REFERENCES "bets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_betOptionId_fkey" FOREIGN KEY ("betOptionId") REFERENCES "bet_options"("id") ON DELETE CASCADE ON UPDATE CASCADE;
