-- CreateEnum
CREATE TYPE "Lang" AS ENUM ('ID', 'EN');

-- AlterTable
ALTER TABLE "device" ADD COLUMN     "lang" "Lang" NOT NULL DEFAULT 'ID';
