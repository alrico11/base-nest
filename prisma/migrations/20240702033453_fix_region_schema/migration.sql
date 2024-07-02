/*
  Warnings:

  - You are about to drop the column `district_code` on the `indonesia_subdistricts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `districtCode` to the `indonesia_subdistricts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "indonesia_subdistricts" DROP CONSTRAINT "indonesia_subdistricts_district_code_fkey";

-- AlterTable
ALTER TABLE "indonesia_subdistricts" DROP COLUMN "district_code",
ADD COLUMN     "districtCode" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- AddForeignKey
ALTER TABLE "indonesia_subdistricts" ADD CONSTRAINT "indonesia_subdistricts_districtCode_fkey" FOREIGN KEY ("districtCode") REFERENCES "indonesia_districts"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
