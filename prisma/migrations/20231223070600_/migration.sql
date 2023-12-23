/*
  Warnings:

  - Made the column `imageUrl` on table `Board` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Board" ALTER COLUMN "imageUrl" SET NOT NULL;
