import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
import { AccesAdmin } from "@/lib/SessionAdmin";

export async function GET(request: NextRequest) {
  const Admin = await AccesAdmin();
  
  if (Admin !== true) { return Admin }

  try {
    const produits = await prisma.produit.findMany({
      include: {
        images: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    if(produits.length === 0) {
      return NextResponse.json(
        {message: "Pas de produits disponible"}, 
        {status: 404} 
      );
    }

    return NextResponse.json({ produits
     });
  } catch (error) {
    console.error("Erreur lors de la récupération des produits:", error);
    
    return NextResponse.json(
      { message: "Une erreur est survenue lors de la récupération des produits" },
      { status: 500 }
    );
  }
}


