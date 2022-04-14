/*
  Warnings:

  - Added the required column `cost` to the `cards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cards" ADD COLUMN     "cost" INTEGER NOT NULL,
ALTER COLUMN "encounter_name" DROP NOT NULL;
