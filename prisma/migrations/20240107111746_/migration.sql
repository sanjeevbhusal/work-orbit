/*
  Warnings:

  - You are about to drop the column `currentBackgroundImage` on the `BoardActivity` table. All the data in the column will be lost.
  - You are about to drop the column `previousBackgroundImage` on the `BoardActivity` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BoardActivity" DROP COLUMN "currentBackgroundImage",
DROP COLUMN "previousBackgroundImage",
ADD COLUMN     "currentImageUrl" TEXT,
ADD COLUMN     "previousImageUrl" TEXT;
