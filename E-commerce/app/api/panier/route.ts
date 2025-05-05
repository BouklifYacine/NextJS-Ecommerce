import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){

  const session = await auth()
  const userId = session?.user?.id; 

  if(!userId || !session) {
    return NextResponse.json({message : "Vous devez etre connecté pour voir votre panier "})
  }

  const panier = await prisma.panier.findUnique({
    where : {
      userId : userId
    }, 
    include : {
      items : {
        include : {produit : true}
      }
    }, 
  
  })

  if(!panier) {
    return NextResponse.json({message : "Vous n'avez pas d'article dans votre panier "} , {status : 400})
  }

  if(userId !== panier.userId){
    return NextResponse.json({message : " Ce panier ne vous appartient pas "}, {status : 400})
  }

  return NextResponse.json({panier})


}


