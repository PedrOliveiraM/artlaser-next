/*
  Warnings:

  - You are about to drop the column `imageTitle` on the `banner` table. All the data in the column will be lost.
  - Added the required column `name` to the `banner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "banner" DROP COLUMN "imageTitle",
ADD COLUMN     "name" TEXT NOT NULL;
