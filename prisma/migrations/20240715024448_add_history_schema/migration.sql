/*
  Warnings:

  - You are about to drop the `log_model` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "log_model" DROP CONSTRAINT "log_model_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "log_model" DROP CONSTRAINT "log_model_project_id_fkey";

-- DropTable
DROP TABLE "log_model";

-- CreateTable
CREATE TABLE "history" (
    "id" TEXT NOT NULL,
    "context" TEXT,
    "method" "MethodEnum",
    "level" SMALLINT NOT NULL,
    "data" JSONB NOT NULL,
    "info" JSONB,
    "timestamp" TIMESTAMPTZ(4) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT,

    CONSTRAINT "history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "history_model" (
    "id" SERIAL NOT NULL,
    "project_id" TEXT,
    "organization_id" TEXT,
    "history_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "history_model_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "history_timestamp_idx" ON "history"("timestamp");

-- AddForeignKey
ALTER TABLE "history" ADD CONSTRAINT "history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "history_model" ADD CONSTRAINT "history_model_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "history_model" ADD CONSTRAINT "history_model_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;
