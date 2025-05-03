"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";

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
