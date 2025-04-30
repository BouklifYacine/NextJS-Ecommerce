import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){

  const id = "cm95g4yuq000girjgiaapylb0"

  const utilisateur = await prisma.user.findUnique({
    where : {id : id}, 
    include : {favoris : true}
  })

  if(!utilisateur) return NextResponse.json("Il n'y a pas d'user", {status : 400})
  
  const NombreFavoris = utilisateur.favoris.length

  return NextResponse.json({
    message : `Vous avez ${NombreFavoris} favoris`,
    NombreFavoris
  })

}

export async function POST(request: NextRequest) {

const id = "cm95g4yuq000girjgiaapylb0"

  const body = await request.json();
  const produitId = body.produitId as string;
  if (!produitId) {
    return NextResponse.json({ error: "ID produit manquant" }, { status: 400 });
  }

  const produit = await prisma.produit.findUnique({
    where: { id: produitId },
  });
  if (!produit) {
    return NextResponse.json({ error: "Produit introuvable" }, { status: 404 });
  }


  const favoriExistant = await prisma.favori.findUnique({
    where: {
      userId_produitId: {
        userId: id,
        produitId,
      },
    },
  });
  if (favoriExistant) {
    return NextResponse.json(
      { error: "Cet article est déjà dans vos favoris" },
      { status: 409 }
    );
  }

 await prisma.favori.create({
    data: {
        userId: id,
      produitId,
    },
  });

  

  const produitnom = produit.nom

  return NextResponse.json(
    { message: "Ajouté aux favoris", produitnom },
    { status: 201 }
  );
}
