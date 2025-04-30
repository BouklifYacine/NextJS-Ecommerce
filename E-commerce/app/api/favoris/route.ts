import { SchemaFavoris } from "@/app/(schema)/favoris/SchemaFavoris";
import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await auth() 

  const sessionId = session?.user?.id

  if(!session || !sessionId) {
    return NextResponse.json({
      nombrefavoris: 0,
      message: "Connectez-vous pour voir vos favoris"
    })
  }

  try {
    
    const [nombrefavoris, favoris] = await prisma.$transaction([
      prisma.favori.count({ where: { userId: sessionId } }),
      prisma.favori.findMany({
        where: { userId: sessionId },  
        include: { produit: true },
        orderBy: { createdAt: "desc" } 
      })
    ]);

    const produits = favoris.map(f => f.produit)

    return NextResponse.json({
        nombrefavoris,
        produits, 
      message: `Vous avez ${nombrefavoris} favoris`
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Erreur serveur" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const id = "cm95g4yuq000girjgiaapylb0"; // À dynamiser

  try {
    const { produitId } = await request.json();

    const resultat = SchemaFavoris.safeParse(produitId)

    if(!resultat.success) {
      return NextResponse.json(
        {
 message: "Données invalides",
        },
        { status: 400 }
      );
    }
    
    if (!produitId) {
      return NextResponse.json(
        { success: false, message: "ID produit manquant" }, 
        { status: 400 }
      );
    }

    const [produit, favoriExistant] = await prisma.$transaction([
      prisma.produit.findUnique({ where: { id: produitId } }),
      prisma.favori.findUnique({
        where: { userId_produitId: { userId: id, produitId } }
      })
    ]);

    if (!produit) {
      return NextResponse.json(
        { success: false, message: "Produit introuvable" },
        { status: 404 }
      );
    }

    if (favoriExistant) {
      return NextResponse.json(
        { success: false, message: "Déjà dans vos favoris" },
        { status: 409 }
      );
    }

    await prisma.favori.create({
      data: { userId: id, produitId }
    });

    return NextResponse.json(
      {  
        message: `${produit.nom} ajouté aux favoris`
      },
      { status: 201 }
    );

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Erreur serveur" },
      { status: 500 }
    );
  }
}
