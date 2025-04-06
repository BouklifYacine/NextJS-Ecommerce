
import { SchemaAjouterProduits } from "@/app/(schema)/produits/SchemaProduits";
import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
import { reponseApiProduit } from "./(interface-types)/interface";


export async function POST(request: NextRequest) {
  const IdUtilisateur = "cm95g4yuq000girjgiaapylb0";

  const Utilisateur = await prisma.user.findUnique({
    where: { id: IdUtilisateur },
    select: { role: true },
  });

  if (!Utilisateur)
    return NextResponse.json(
      { message: "Vous devez vous connectez " },
      { status: 401 }
    );

  const admin = Utilisateur.role === "Admin";

  if (!admin)
    return NextResponse.json(
      { message: "Vous n'etes pas autorisé a faire cela " },
      { status: 403 }
    );

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
        enPromotion: validation.data.prixPromo !== undefined && 
        validation.data.prixPromo !== null && 
        validation.data.prixPromo > 0
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
