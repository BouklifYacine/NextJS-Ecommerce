"use client";

import React from "react";
import BlocUnique from "./BlocUnique";
import { useProduits } from "@/app/dashboard/produits/(hooks)/UseProduits";

const BlocProduitTopVente = () => {
  const { data, isPending } = useProduits();

  if (isPending) return <p>Chargement en cours...</p>;

  const TableauTopVente = data?.slice(0, 3);

  return (
    <div className="flex flex-wrap justify-center gap-8">
      {TableauTopVente?.map((produit, index) => (
        <div key={produit.id || index} className="w-full md:w-[45%] lg:w-[30%]">
          <BlocUnique
            id={produit.id}
            nom={produit.nom}
            image={produit.images[0].urlImage}
            prix={produit.prix}
            prixpromo={produit.prixPromo || null}
            categorie={produit.categorie}
            description={produit.description}
            stock={produit.quantiteStock}
          />
        </div>
      ))}
    </div>
  );
};

export default BlocProduitTopVente;
