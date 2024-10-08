/*
  Warnings:

  - Added the required column `status` to the `banner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "banner" ADD COLUMN     "status" BOOLEAN NOT NULL;
