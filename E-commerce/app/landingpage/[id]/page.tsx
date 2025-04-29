"use client";
import { useProduitsId } from "@/app/dashboard/produits/(hooks)/UseProduits";
import React from "react";
import BlocProduitUnique from "./(components)/BlocProduitUnique";

interface PropsId {
  params: { id: string };
}

const ProduitId = ({ params }: PropsId) => {
  const { data: produitId, isLoading, error } = useProduitsId(params.id);

  if (error) return <p>Il y'a une erreur </p>;

  if (isLoading) return <p>ca charge bg </p>;
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
      ></BlocProduitUnique>
    </>
  );
};

export default ProduitId;
