"use server";

import { SchemaPanier } from "@/app/(schema)/panier/SchemaPanier";
import { auth } from "@/auth";
import { prisma } from "@/prisma";


export async function AjouterAuPanier(produitId: string, quantite: number) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    
    if (!userId || !session) {
      return { success: false, message: "Vous devez être connecté" };
    }
    
    const validation = SchemaPanier.safeParse({ produitId, quantite });
    if (!validation.success) {
      return { 
        success: false, 
        message: validation.error.errors[0].message 
      };
    }
    
    const produit = await prisma.produit.findUnique({ where: { id: produitId } });
    if (!produit) {
      return { success: false, message: "Produit non trouvé" };
    }
    
    if (produit.quantiteStock < quantite) {
      return { 
        success: false, 
        message: "Quantité insuffisante en stock" 
      };
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
     
    return {
      success: true,
      message:"Article ajouté au panier" 
       
      
    };
    
  } catch (error) {
    console.error("Erreur lors de l'ajout au panier:", error);
    return { 
      success: false, 
      message: "Erreur lors de l'ajout au panier" 
    };
  }
}

export async function SupprimerPanier(PanierId: string) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId || !session) {
    return {
      success: false,
      message: "Vous devez etre connecté ",
      status: 400,
    };
  }

  const panier = await prisma.panier.findUnique({
    where: {
      userId: userId,
    },
    select: { userId: true },
  });

  if (!panier) {
    return {
      success: false,
      message:
        "Pas de panier disponible et ou pas de produit dans votre panier",
      status: 404,
    };
  }

  if (panier.userId !== userId) {
    return {
      success: false,
      message: "Ce panier ne vous appartient pas ",
      status: 403,
    };
  }

  await prisma.panier.delete({
    where: {
      id: PanierId,
    },
  });

  return {
    success: true,
    message: "Votre panier a été supprimé  ",
    status: 201,
  };
}

export async function SupprimerArticlePanier(ArticleId: string) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return {
      message: "Vous devez etre connecté ",
      status: 400,
    };
  }

  if (!ArticleId) {
    return {
      message: "ID du produit manquant dans la requête.",
      status: 400,
    };
  }

  const resultat = await prisma.$transaction(async (tx) => {
    const panier = await tx.panier.findUnique({
      where: {
        userId: userId,
      },
      select: { id: true },
    });

    if (!panier) {
      return { message: "Aucun panier disponible", status: 404 };
    }

    const articlesupprimer = await tx.panierItem.deleteMany({
      where: {
        produitId: ArticleId,
        panierId: panier.id,
      },
    });

    if (articlesupprimer.count === 0) {
      return { message: "Aucun produit disponible", status: 404 };
    }

    const produitrestant = await tx.panierItem.count({
      where: { panierId: panier.id },
    });

    if (produitrestant === 0) {
      await tx.panier.delete({
        where: { id: panier.id },
      });

      return { message: " Panier supprimé" , status : 200 };
    }

    return { message: "Produit supprimé du panier avec succès.", status: 200 };
  });

  return {
    success: true,
    message: resultat.message,
    status: resultat.status,
  };
}
