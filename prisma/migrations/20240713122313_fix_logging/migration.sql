-- CreateEnum
CREATE TYPE "MethodEnum" AS ENUM ('CREATE', 'UPDATE', 'DELETE');

-- AlterTable
ALTER TABLE "event_log" ALTER COLUMN "last_updated_by_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "log" ADD COLUMN     "info" JSONB,
ADD COLUMN     "method" "MethodEnum",
ADD COLUMN     "organization_id" TEXT,
ADD COLUMN     "project_id" TEXT,
ADD COLUMN     "user_id" TEXT;

-- AddForeignKey
ALTER TABLE "event_log" ADD CONSTRAINT "event_log_last_updated_by_id_fkey" FOREIGN KEY ("last_updated_by_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "log" ADD CONSTRAINT "log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "log" ADD CONSTRAINT "log_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "log" ADD CONSTRAINT "log_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;
