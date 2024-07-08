/*
  Warnings:

  - A unique constraint covering the columns `[reminder_id]` on the table `reminder_note` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[note_id]` on the table `reminder_note` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `note` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "note" ADD COLUMN     "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMPTZ(3),
ADD COLUMN     "updated_at" TIMESTAMPTZ(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "reminder_note_reminder_id_key" ON "reminder_note"("reminder_id");

-- CreateIndex
CREATE UNIQUE INDEX "reminder_note_note_id_key" ON "reminder_note"("note_id");

-- AddForeignKey
ALTER TABLE "note" ADD CONSTRAINT "note_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
