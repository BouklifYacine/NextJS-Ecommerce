import { SchemaAjouterProduits } from "@/app/(schema)/produits/SchemaProduits";
import { prisma } from "@/prisma";
import { Categorie } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface reponseApi {
    nom: string;
    url: string;
    description: string;
    prix: number;
    quantiteStock: number;
    categorie: Categorie;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    prixPromo: number | null;
    enPromotion: boolean;
}

export async function POST(request: NextRequest) {
  const IdUtilisateur = "cm95delf50000ir20pth5w76p";

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
    const produitExistant = await prisma.produit.findUnique({
        where: {
          url: validation.data.url
        }
      });
    
      if (produitExistant) {
        return NextResponse.json(
          { message: "Un produit avec cette URL existe déjà" },
          { status: 400 }
        );
      }

    const nouveauproduit: reponseApi = await prisma.produit.create({
      data: validation.data,
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