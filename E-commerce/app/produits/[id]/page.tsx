"use client";
import { useProduitsId } from "@/app/dashboard/produits/(hooks)/UseProduits";

import React from "react";
import SkeletonProduitUnique from "../(components)/Skeleton";
import BlocProduitUnique from "../(components)/BlocProduitUnique";


interface PropsId {
  params: { id: string };
}

const ProduitId = ({ params }: PropsId) => {
  const { data: produitId, isPending, error, refetch, isRefetching} = useProduitsId(params.id);

  if (error) return <p>Il y'a une erreur </p>;

  if (isPending) return <SkeletonProduitUnique></SkeletonProduitUnique>;

  if(isRefetching) return <SkeletonProduitUnique></SkeletonProduitUnique>
  return (
    <>
      <BlocProduitUnique
        id={produitId?.id}
        prix={produitId?.prix}
        prixPromo={produitId?.prixPromo}
        description={produitId?.description}
        nom={produitId?.nom}
        stock={produitId?.quantiteStock}
        image={produitId?.images[0].urlImage}
        categorie={produitId?.categorie}
        refetch={refetch}
      ></BlocProduitUnique>
    </>
  );
};

export default ProduitId;
