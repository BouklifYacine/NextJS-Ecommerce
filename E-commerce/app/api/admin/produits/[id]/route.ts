import { AccesAdmin } from "@/lib/SessionAdmin";
import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

interface ParamsId{
    params : {id : string}
}

export async function DELETE(request : NextRequest, {params} : ParamsId ){

    const {id} = await params

     const Admin = await AccesAdmin();
      if (Admin !== true) { return Admin }

      const produit = await prisma.produit.findUnique({
        where : {id : id}
      })

      if (!produit) return NextResponse.json({message : "Il n'y a pas de produit "}, {status : 400})

     const produitSupprimer = await prisma.produit.delete({
        where : {id : id}
     })

     const NomProduitSupprimer = produitSupprimer.nom

     return NextResponse.json({NomProduitSupprimer})

}