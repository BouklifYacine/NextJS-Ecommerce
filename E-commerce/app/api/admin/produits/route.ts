
import { SchemaAjouterProduits } from "@/app/(schema)/produits/SchemaProduits";
import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
import { reponseApiProduit } from "./(interface-types)/interface";
import { AccesAdmin } from "@/lib/SessionAdmin";


export async function POST(request: NextRequest) {
    const Admin = await AccesAdmin();
    
    if (Admin !== true) { return Admin }

  const data = await request.json();
  const validation = SchemaAjouterProduits.safeParse(data);

  if (!validation.success) {
    return NextResponse.json(
      { message: validation.error.errors[0].message },
      { status: 400 }
    );
  }
  try {
    const produitComplet : reponseApiProduit = await prisma.$transaction(async(tx) => {

      const {images , ...produitData} = validation.data

      const ProduitAvecPromotion = { 
        ...produitData, 
        enPromotion: produitData.prixPromo !== undefined && 
             produitData.prixPromo !== null && 
             produitData.prixPromo > 0
    };
    const nouveauProduit = await tx.produit.create({
      data: ProduitAvecPromotion
  });

  if(images && images.length > 0){
    await tx.imageProduit.createMany({
      data: images.map((image,index) =>({
        produitId : nouveauProduit.id,
        urlImage: image.urlImage,
        principale : index === 0,
        ordre : index
      }))
    })
  }
  const produitTrouve = await tx.produit.findUnique({
    where: { id: nouveauProduit.id },
    include: { images: true }
});

if (!produitTrouve) {
    throw new Error("Produit non trouvé après création");
}
return produitTrouve as reponseApiProduit
});

return NextResponse.json(
  { message: "Produit ajouté avec succès", produit: produitComplet },
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
