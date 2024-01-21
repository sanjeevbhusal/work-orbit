-- DropForeignKey
ALTER TABLE "CardActivity" DROP CONSTRAINT "CardActivity_cardId_fkey";

-- AddForeignKey
ALTER TABLE "CardActivity" ADD CONSTRAINT "CardActivity_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;
