/*
  Warnings:

  - Changed the type of `priority` on the `project` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ProjectPriority" AS ENUM ('0', '1', '2');

-- AlterTable
ALTER TABLE "project" DROP COLUMN "priority",
ADD COLUMN     "priority" "ProjectPriority" NOT NULL;
