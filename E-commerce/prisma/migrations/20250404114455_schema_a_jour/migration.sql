/*
  Warnings:

  - You are about to drop the column `methodePaiement` on the `Commande` table. All the data in the column will be lost.
  - You are about to drop the column `sousTotal` on the `Commande` table. All the data in the column will be lost.
  - You are about to drop the column `modeSombre` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Commande" DROP COLUMN "methodePaiement",
DROP COLUMN "sousTotal";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "modeSombre";
