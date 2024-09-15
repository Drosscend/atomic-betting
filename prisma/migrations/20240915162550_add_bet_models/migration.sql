-- CreateEnum
CREATE TYPE "BetType" AS ENUM ('QUESTION');

-- CreateTable
CREATE TABLE "bets" (
    "id" TEXT NOT NULL,
    "type" "BetType" NOT NULL,
    "startDateTime" TIMESTAMP(3) NOT NULL,
    "endDateTime" TIMESTAMP(3) NOT NULL,
    "minCoins" INTEGER NOT NULL,
    "maxCoins" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,

    CONSTRAINT "bets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bet_transactions" (
    "id" TEXT NOT NULL,
    "betId" TEXT NOT NULL,
    "teamMembershipId" TEXT NOT NULL,
    "coinsAmount" INTEGER NOT NULL,
    "transactionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "odds" DOUBLE PRECISION,

    CONSTRAINT "bet_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question_bets" (
    "id" TEXT NOT NULL,
    "betId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "correctOptionId" TEXT,

    CONSTRAINT "question_bets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bet_options" (
    "id" TEXT NOT NULL,
    "questionBetId" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "bet_options_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "question_bets_betId_key" ON "question_bets"("betId");

-- AddForeignKey
ALTER TABLE "bets" ADD CONSTRAINT "bets_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bet_transactions" ADD CONSTRAINT "bet_transactions_betId_fkey" FOREIGN KEY ("betId") REFERENCES "bets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bet_transactions" ADD CONSTRAINT "bet_transactions_teamMembershipId_fkey" FOREIGN KEY ("teamMembershipId") REFERENCES "team_memberships"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_bets" ADD CONSTRAINT "question_bets_betId_fkey" FOREIGN KEY ("betId") REFERENCES "bets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_bets" ADD CONSTRAINT "question_bets_correctOptionId_fkey" FOREIGN KEY ("correctOptionId") REFERENCES "bet_options"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bet_options" ADD CONSTRAINT "bet_options_questionBetId_fkey" FOREIGN KEY ("questionBetId") REFERENCES "question_bets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
