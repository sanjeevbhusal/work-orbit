-- CreateTable
CREATE TABLE "ColumnActivity" (
    "id" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,
    "columnId" TEXT NOT NULL,
    "activityType" "ActivityType" NOT NULL,
    "currentName" TEXT,
    "previousName" TEXT,

    CONSTRAINT "ColumnActivity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ColumnActivity" ADD CONSTRAINT "ColumnActivity_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ColumnActivity" ADD CONSTRAINT "ColumnActivity_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "Column"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
