/*
  Warnings:

  - Made the column `largeImageUrl` on table `Board` required. This step will fail if there are existing NULL values in that column.
  - Made the column `smallImageUrl` on table `Board` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "description" TEXT,
ALTER COLUMN "largeImageUrl" SET NOT NULL,
ALTER COLUMN "smallImageUrl" SET NOT NULL;
