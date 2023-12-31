-- CreateEnum
CREATE TYPE "EntityType" AS ENUM ('BOARD', 'CARD', 'COLUMN');

-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('CREATE', 'UPDATE');

-- CreateEnum
CREATE TYPE "ActivitySubType" AS ENUM ('BOARD');

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    "subType" "ActivitySubType" NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoardActivity" (
    "id" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,
    "boardId" TEXT NOT NULL,
    "activityType" "ActivityType" NOT NULL,
    "currentName" TEXT,
    "previousName" TEXT,

    CONSTRAINT "BoardActivity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BoardActivity" ADD CONSTRAINT "BoardActivity_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardActivity" ADD CONSTRAINT "BoardActivity_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
