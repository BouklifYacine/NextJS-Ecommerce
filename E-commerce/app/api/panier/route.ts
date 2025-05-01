import { SchemaPanier } from "@/app/(schema)/panier/SchemaPanier";
import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const userId = "cma5ilzq40000irgg8rpod0l9"; 
    const { produitId, quantite } = await request.json();

    const validation = SchemaPanier.safeParse({ produitId, quantite });
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const produit = await prisma.produit.findUnique({ where: { id: produitId } });
    if (!produit) {
      return NextResponse.json({ message: "Produit non trouvé" }, { status: 404 });
    }

    if (produit.quantiteStock < quantite) {
      return NextResponse.json(
        { message: "Quantité insuffisante en stock" },
        { status: 400 }
      );
    }

    const resultat = await prisma.$transaction(async (tx) => {
      let panier = await tx.panier.findUnique({
        where: { userId },
        include: { items: true },
      });

      if (!panier) {
        panier = await tx.panier.create({
          data: {
            userId,
            items: {
              create: { produitId, quantite },
            },
          },
          include: { items: true },
        });
        return { panier, isNewItem: true };
      }

      const itemExistant = panier.items.find((item) => item.produitId === produitId);

      if (itemExistant) {
        const updatedItem = await tx.panierItem.update({
          where: { id: itemExistant.id },
          data: { quantite: itemExistant.quantite + quantite },
        });
        return { panier, updatedItem, isNewItem: false };
      } else {
        const newItem = await tx.panierItem.create({
          data: {
            panierId: panier.id,
            produitId,
            quantite,
          },
        });
        return { panier, newItem, isNewItem: true };
      }
    });

    return NextResponse.json({
      message: resultat.isNewItem ? "Article ajouté au panier" : "Quantité mise à jour",
      data : resultat
    
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout au panier:", error);
    return NextResponse.json(
      { success: false, message: "Erreur lors de l'ajout au panier" },
      { status: 500 }
    );
  }
}
