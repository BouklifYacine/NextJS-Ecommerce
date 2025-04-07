import { SchemaAjouterProduits } from "@/app/(schema)/produits/SchemaProduits";
import { AccesAdmin } from "@/lib/SessionAdmin";
import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

interface ParamsId{
    params : {id : string}
}

export async function PATCH(request : NextRequest, {params} : ParamsId){
  const {id} = await params

     const Admin = await AccesAdmin();
      if (Admin !== true) { return Admin }

      const data = await request.json()
      const validation = SchemaAjouterProduits.safeParse(data)

      if (!validation.success) {
        return NextResponse.json(
          { message: validation.error.errors[0].message },
          { status: 400 }
        );
      }

      try {
        const produitExistant = await prisma.produit.findUnique({
          where : {id},
          include : {images : true}
        })

        if (!produitExistant) return NextResponse.json({message : "Il n'y a pas de produits"}, {status : 400})

        const { images : nouvellesImages , ...produit} = validation.data

        const produitMisAJour = await prisma.$transaction(async(tx) => {
          const produitAvecPromotion = {
            ...produit, 
            enPromotion : produit.prixPromo !== undefined && produit.prixPromo !== null && produit.prixPromo > 0
          }

          await tx.produit.update({
            where : {id}, 
            data : produitAvecPromotion
          })

          if (nouvellesImages && nouvellesImages.length > 0){
            await tx.imageProduit.deleteMany({
              where : { produitId : id}
            })

            await tx.imageProduit.createMany({
              data : nouvellesImages.map((image, index) => ({
                produitId : id, 
                urlImage : image.urlImage, 
                principale : index === 0, 
                ordre : index
              }))
            })

            return await tx.produit.findUnique({
              where: { id },
              include: { images: true }
            });
          }
        })

        return NextResponse.json(
          { message: "Produit modifié avec succès", produit: produitMisAJour },
          { status: 200 }
        );
        
      } catch (error) {
        console.error("Il y'a une erreur dans le call API", error)
        NextResponse.json({message : "Une erreur est survenue lors de la modification du produit"}, {status : 500})
      }

}

export async function DELETE(request : NextRequest, {params} : ParamsId ){

    const {id} = await params

     const Admin = await AccesAdmin();
      if (Admin !== true) { return Admin }

      try {
      const produit = await prisma.produit.findUnique({
        where : {id : id}
      })

      if (!produit) return NextResponse.json({message : "Il n'y a pas de produit "}, {status : 400})

     const produitSupprimer = await prisma.produit.delete({
        where : {id : id}
     })

     const NomProduitSupprimer = produitSupprimer.nom

     return NextResponse.json({NomProduitSupprimer})
      } catch (error) {
        console.error("Il y'a une erreur dans votre CALL API", error)
        return NextResponse.json(
            { message: "Une erreur est survenue lors de la suppression du produit" },
            { status: 500 }
          )
      }

}