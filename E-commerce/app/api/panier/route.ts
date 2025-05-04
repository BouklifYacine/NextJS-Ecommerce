import { SchemaPanier } from "@/app/(schema)/panier/SchemaPanier";
import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){

  const session = await auth()
  const userId = session?.user?.id; 

  if(!userId || !session) {
    return NextResponse.json({message : "Vous devez etre connecté pour voir votre panier "})
  }

  const panier = await prisma.panier.findUnique({
    where : {
      userId : userId
    }, 
    include : {
      items : {
        include : {produit : true}
      }
    }, 
  
  })

  if(!panier) {
    return NextResponse.json({message : "Vous n'avez pas d'article dans votre panier "} , {status : 400})
  }

  if(userId !== panier.userId){
    return NextResponse.json({message : " Ce panier ne vous appartient pas "}, {status : 400})
  }

  return NextResponse.json({panier})


}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    const userId = session?.user?.id; 

    if(!userId  || !session) return NextResponse.json({message : "Vous devez etre connecté"}, {status : 400})
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
        where: { userId : userId },
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
