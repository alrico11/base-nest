/*
  Warnings:

  - You are about to drop the `project_note` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_reference_comment_id_fkey";

-- DropForeignKey
ALTER TABLE "project_note" DROP CONSTRAINT "project_note_note_id_fkey";

-- DropForeignKey
ALTER TABLE "project_note" DROP CONSTRAINT "project_note_project_id_fkey";

-- AlterTable
ALTER TABLE "comment" ALTER COLUMN "reference_comment_id" DROP NOT NULL;

-- DropTable
DROP TABLE "project_note";

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_reference_comment_id_fkey" FOREIGN KEY ("reference_comment_id") REFERENCES "comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
