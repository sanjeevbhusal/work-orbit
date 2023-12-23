/*
  Warnings:

  - You are about to drop the column `workspaceId` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the `Workspace` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `organizationId` to the `Board` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Board" DROP CONSTRAINT "Board_workspaceId_fkey";

-- AlterTable
ALTER TABLE "Board" DROP COLUMN "workspaceId",
ADD COLUMN     "organizationId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Workspace";
