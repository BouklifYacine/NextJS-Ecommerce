'use server'

import { prisma } from "@/prisma";
import { AccesAdmin } from "@/lib/SessionAdmin";
import { revalidatePath } from "next/cache";
import { reponseApiProduit } from "@/app/api/admin/produits/(interface-types)/interface";
import { SchemaAjouterProduits } from "@/app/(schema)/produits/SchemaProduits";

export async function supprimerProduit(id: string) {
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

export async function ajouterProduit(data: reponseApiProduit) {
  const admin = await AccesAdmin();
  
  if (admin !== true) {
    throw new Error("Accès non autorisé");
  }

  try {
    
    const validation = SchemaAjouterProduits.safeParse(data);

    if (!validation.success) {
      throw new Error(validation.error.errors[0].message);
    }
    const produitComplet: reponseApiProduit = await prisma.$transaction(async (tx) => {
      const { images, ...produitData } = validation.data;
      
      const ProduitAvecPromotion = {
        ...produitData,
        enPromotion: produitData.prixPromo !== undefined &&
          produitData.prixPromo !== null &&
          produitData.prixPromo > 0
      };
      
      const nouveauProduit = await tx.produit.create({
        data: ProduitAvecPromotion
      });

      if (images && images.length > 0) {
        await tx.imageProduit.createMany({
          data: images.map((image, index) => ({
            produitId: nouveauProduit.id,
            urlImage: image.urlImage,
            principale: index === 0,
            ordre: index
          }))
        });
      }
      
      const produitTrouve = await tx.produit.findUnique({
        where: { id: nouveauProduit.id },
        include: { images: true }
      });

      if (!produitTrouve) {
        throw new Error("Produit non trouvé après création");
      }
      
      return produitTrouve as reponseApiProduit;
    });

    revalidatePath('/dashboard/produits');
    
    return {
      success: true,
      message: "Produit ajouté avec succès",
      produit: produitComplet
    };
    
  } catch (error) {
    console.error("Erreur lors de l'ajout du produit:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Une erreur est survenue lors de l'ajout du produit"
    };
  }
}