-- CreateTable
CREATE TABLE "Panier" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Panier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PanierItem" (
    "id" TEXT NOT NULL,
    "panierId" TEXT NOT NULL,
    "produitId" TEXT NOT NULL,
    "quantite" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PanierItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Panier_userId_key" ON "Panier"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PanierItem_panierId_produitId_key" ON "PanierItem"("panierId", "produitId");

-- AddForeignKey
ALTER TABLE "Panier" ADD CONSTRAINT "Panier_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PanierItem" ADD CONSTRAINT "PanierItem_panierId_fkey" FOREIGN KEY ("panierId") REFERENCES "Panier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PanierItem" ADD CONSTRAINT "PanierItem_produitId_fkey" FOREIGN KEY ("produitId") REFERENCES "Produit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
