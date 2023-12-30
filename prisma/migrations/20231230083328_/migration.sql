/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Board` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Board" DROP COLUMN "imageUrl",
ADD COLUMN     "largeImageUrl" TEXT,
ADD COLUMN     "smallImageUrl" TEXT;
