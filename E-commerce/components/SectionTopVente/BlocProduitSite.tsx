"use client"
import React from "react";
import BlocUnique from "./BlocUnique";
import { useProduits } from "@/app/dashboard/produits/(hooks)/UseProduits";

const BlocProduitSite = () => {
  const { data, isLoading } = useProduits();

  if (isLoading) return <p>Chargement en cours...</p>;

  return (
    <div className="flex flex-wrap justify-center gap-8">
      {data?.map((d) => (
        <div key={d.id} className="w-full md:w-[45%] lg:w-[30%]">
          <BlocUnique
          id={d.id}
            nom={d.nom}
            image={d.images[0].urlImage}
            prix={d.prix}
            prixpromo={d.prixPromo || null}
            categorie={d.categorie}
            description={d.description}
            stock={d.quantiteStock}
          />
        </div>
      ))}
    </div>
  );
};

export default BlocProduitSite;
