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

export async function SupprimerFavoris(produitId: string) {
    const session = await auth();
    const sessionId = session?.user?.id;
  
    if (!session || !sessionId) {
      throw new Error("Vous devez être connecté");
    }
  
    try {
      // Trouve d'abord le favori existant
      const favori = await prisma.favori.findFirst({
        where: {
          produitId: produitId,
          userId: sessionId
        }
      });
  
      if (!favori) {
        return {
          success: false,
          message: "Favori non trouvé"
        };
      }
  
      // Supprime le favori
      await prisma.favori.delete({
        where: {
          id: favori.id // Utilise l'ID du favori trouvé
        }
      });
  
      return {
        success: true,
        message: "Favori supprimé avec succès"
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Erreur serveur"
      };
    }
  }
  
