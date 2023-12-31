-- AlterEnum
ALTER TYPE "ActivitySubType" ADD VALUE 'CARD';

-- CreateTable
CREATE TABLE "CardActivity" (
    "id" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "activityType" "ActivityType" NOT NULL,
    "previousColumnId" TEXT,
    "currentColumnId" TEXT NOT NULL,

    CONSTRAINT "CardActivity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CardActivity" ADD CONSTRAINT "CardActivity_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardActivity" ADD CONSTRAINT "CardActivity_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardActivity" ADD CONSTRAINT "CardActivity_previousColumnId_fkey" FOREIGN KEY ("previousColumnId") REFERENCES "Column"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardActivity" ADD CONSTRAINT "CardActivity_currentColumnId_fkey" FOREIGN KEY ("currentColumnId") REFERENCES "Column"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
