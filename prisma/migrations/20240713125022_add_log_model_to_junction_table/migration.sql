/*
  Warnings:

  - You are about to drop the column `organization_id` on the `log` table. All the data in the column will be lost.
  - You are about to drop the column `project_id` on the `log` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "log" DROP CONSTRAINT "log_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "log" DROP CONSTRAINT "log_project_id_fkey";

-- AlterTable
ALTER TABLE "log" DROP COLUMN "organization_id",
DROP COLUMN "project_id";

-- CreateTable
CREATE TABLE "log_model" (
    "id" SERIAL NOT NULL,
    "project_id" TEXT,
    "organization_id" TEXT,
    "log_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "log_model_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "log_model" ADD CONSTRAINT "log_model_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "log_model" ADD CONSTRAINT "log_model_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;
