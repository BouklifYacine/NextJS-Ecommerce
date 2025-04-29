import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

interface PropsId {
    params : {id : string}
}


export async function GET(request: NextRequest, {params} : PropsId) {
    const { id } = await params;
  
    try {
      const produit = await prisma.produit.findUnique({
        where: { id: id },
        include: { images: true },
      });
  
      if (!produit) {
        return NextResponse.json({ message: "Produit non trouvé" }, { status: 404 });
      }
  
      return NextResponse.json({ produit });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
    }
  }
  