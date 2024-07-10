/*
  Warnings:

  - A unique constraint covering the columns `[reminder_id]` on the table `reminder_task` will be added. If there are existing duplicate values, this will fail.
  - Made the column `nextInvocation` on table `reminder` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "reminder" ALTER COLUMN "nextInvocation" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "reminder_task_reminder_id_key" ON "reminder_task"("reminder_id");
