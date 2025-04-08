/*
  Warnings:

  - Changed the type of `ville` on the `Adresse` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Adresse" DROP COLUMN "ville",
ADD COLUMN     "ville" INTEGER NOT NULL;
