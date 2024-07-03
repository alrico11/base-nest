/*
  Warnings:

  - The primary key for the `project_tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[project_id]` on the table `project_tag` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "project_tag" DROP CONSTRAINT "project_tag_pkey",
ADD CONSTRAINT "project_tag_pkey" PRIMARY KEY ("tag_id", "project_id");

-- CreateIndex
CREATE UNIQUE INDEX "project_tag_project_id_key" ON "project_tag"("project_id");
