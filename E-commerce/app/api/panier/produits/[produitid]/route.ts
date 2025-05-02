import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { produitid: string };
}

export async function DELETE(request: NextRequest, { params }: Props) {
    const userId = "cma5ilzq40000irgg8rpod0l9";
  
    const { produitid } = await params;
  
    if (!userId) {
      return NextResponse.json(
        {
          message: "Vous devez etre connecté pour voir votre panier ",
        },
        { status: 400 }
      );
    }
  
    if (!produitid) {
      return NextResponse.json(
        {
          message: "ID du produit manquant dans la requête.",
        },
        { status: 400 }
      );
    }
  
  const resultat =  await prisma.$transaction(async (tx) => {
  
      const panier = await tx.panier.findUnique({
          where: {
            userId: userId,
          },
          select: { id: true },
        });
  
        if (!panier) { return { message : "Aucun panier disponible" , status : 404}}
  
        const articlesupprimer = await tx.panierItem.deleteMany({
          where: {
            produitId: produitid,
            panierId: panier.id,
          },
        });
  
        if (articlesupprimer.count === 0) {
          return { message: "Aucun produit disponible",  status: 404 }}
  
        const produitrestant = await tx.panierItem.count({
          where: { panierId: panier.id },
        });
      
        if (produitrestant === 0) {
          await tx.panier.delete({
            where: { id: panier.id },
          });
      
          return { message: " Panier supprimé" };
        }
  
        return { message: "Produit supprimé du panier avec succès.", status: 200 };
    })  

    return NextResponse.json({ message: resultat.message }, { status: resultat.status });
  }
