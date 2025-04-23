/*
  Warnings:

  - You are about to drop the column `ordre` on the `ImageProduit` table. All the data in the column will be lost.
  - You are about to drop the column `principale` on the `ImageProduit` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ImageProduit" DROP COLUMN "ordre",
DROP COLUMN "principale";
