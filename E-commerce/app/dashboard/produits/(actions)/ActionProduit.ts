'use server'

import { prisma } from "@/prisma";
import { AccesAdmin } from "@/lib/SessionAdmin";
import { revalidatePath } from "next/cache";

export async function supprimerProduit(id: string) {
  // Vérifier l'accès admin
  const admin = await AccesAdmin();
  if (admin !== true) {
    throw new Error("Accès non autorisé");
  }

  try {
    const produit = await prisma.produit.findUnique({
      where: { id }
    });

    if (!produit) {
      throw new Error("Produit non trouvé");
    }

    const produitSupprime = await prisma.produit.delete({
      where: { id }
    });

    revalidatePath('/dashboard/produits');

    return {
      success: true,
      message: `Le produit ${produitSupprime.nom} a été supprimé avec succès`,
      produit: produitSupprime
    };
  } catch (error) {
    console.error("Erreur lors de la suppression du produit:", error);
    throw new Error("Une erreur est survenue lors de la suppression du produit");
  }
}