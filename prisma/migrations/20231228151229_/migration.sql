/*
  Warnings:

  - You are about to drop the column `task` on the `Card` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "task",
ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'random name';
