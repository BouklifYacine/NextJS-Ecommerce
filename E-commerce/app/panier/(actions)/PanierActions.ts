"use server"

import { auth } from "@/auth";
import { prisma } from "@/prisma";

export async function SupprimerPanier(PanierId : string){
     const session = await auth()
      const userId = session?.user?.id;
    
      if (!userId || !session) {
        return {
            success : false,
            message : "Vous devez etre connecté ",
            status : 400
        }
      }
      
      const panier = await prisma.panier.findUnique({
        where: {
            userId : userId,
        },
        select : {userId : true}
      });
    
      if (!panier) {
        return {
            success : false,
            message : "Pas de panier disponible et ou pas de produit dans votre panier",
            status : 404
        }
      }
    
      if (panier.userId !== userId) {
        return {
            success : false,
            message : "Ce panier ne vous appartient pas ",
            status : 403
        }
      }
    
      await prisma.panier.delete({
        where: {
          id : PanierId,
        },
      });
    
      return {
        success : true,
        message : "Votre panier a été supprimé  ",
        status : 201
    }
}