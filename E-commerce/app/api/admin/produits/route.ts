
import { SchemaAjouterProduits } from "@/app/(schema)/produits/SchemaProduits";
import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
import { reponseApiProduit } from "./(interface-types)/interface";
import { AccesAdmin } from "@/app/utils/SessionAdmin";


export async function POST(request: NextRequest) {
    const Admin = await AccesAdmin();
    
    if (Admin !== true) {
        return Admin; 
    }
  const data = await request.json();
  const validation = SchemaAjouterProduits.safeParse(data);

  if (!validation.success) {
    return NextResponse.json(
      { message: validation.error.errors[0].message },
      { status: 400 }
    );
  }
  try {
    const ProduitAvecPromotion = { 
       ...validation.data, 
       enPromotion : validation.data.prixPromo !== undefined && validation.data.prixPromo !== null && validation.data.prixPromo > 0 ? true : false
      };
      
    const nouveauproduit: reponseApiProduit = await prisma.produit.create({
      data: ProduitAvecPromotion,
    });
    return NextResponse.json(
      { message: "Produit ajouté avec succès", produit: nouveauproduit },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de l'ajout du produit:", error);

    return NextResponse.json(
      { message: "Une erreur est survenue lors de l'ajout du produit" },
      { status: 500 }
    );
  }
}
