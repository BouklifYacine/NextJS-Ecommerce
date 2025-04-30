"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { SchemaFavoris } from "../(schema)/favoris/SchemaFavoris";

export async function AjouterFavoris(produitId: string) {
  const session = await auth();
  const sessionId = session?.user?.id || "";

  const resultat = SchemaFavoris.safeParse({ produitId });

  if (!resultat.success) {
    throw new Error("Données invalides");
  }

  if (!produitId) {
    throw new Error("ID produit manquant");
  }

  const [produit, favoriExistant] = await prisma.$transaction([
    prisma.produit.findUnique({ where: { id: produitId } }),
    prisma.favori.findUnique({
      where: { userId_produitId: { userId: sessionId, produitId } },
    }),
  ]);

  if (!produit) {
    throw new Error("Produit introuvable");
  }

  if (favoriExistant) {
    throw new Error("Déjà dans vos favoris");
  }

  await prisma.favori.create({
    data: { userId: sessionId, produitId },
  });

  return {
    success: true,
  message: `${produit.nom} ajouté aux favoris`

  };


}

export async function SupprimerFavoris(id: string) {
  const session = await auth();
  const sessionId = session?.user?.id;

  const favoriId = id;

  if (!session || !sessionId) {
    throw new Error("Vous devez être connecté");
  }

  if (!favoriId || typeof favoriId !== "string") {
    throw new Error("ID du favori invalide");
  }

  try {
    const favori = await prisma.favori.findUnique({
      where: {
        id: favoriId,
        userId: sessionId,
      },
    });

    if (!favori) {
      throw new Error("Favoris non trouvé");
    }

    if (favori.userId !== sessionId) {
      throw new Error("Non autorisé - Ce favori ne vous appartient pas");
    }

    await prisma.favori.delete({
      where: {
        id: favoriId,
      },
    });

    const nombrefavoris = await prisma.favori.count({
      where: { userId: sessionId },
    });

    return {
      success: true,
      message: "Favori supprimé avec succès",
      nombrefavoris,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Erreur serveur ",
    };
  }
}
