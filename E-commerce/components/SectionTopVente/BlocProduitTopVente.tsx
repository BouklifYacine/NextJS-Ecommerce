"use client"

import React from "react";
import BlocUnique from "./BlocUnique";
import { useProduits } from "@/app/dashboard/produits/(hooks)/UseProduits";

const BlocProduitTopVente = () => {
  const { data, isLoading } = useProduits();

  if (isLoading) return <p>Chargement en cours...</p>;
  
  // Il y a une ligne "data." isolée dans votre code qui cause une erreur

  return (
    <div className="flex flex-wrap justify-center gap-8">
      {data?.map((produit, index) => (
        <div key={produit.id || index} className="w-full md:w-[45%] lg:w-[30%]">
          <BlocUnique 
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