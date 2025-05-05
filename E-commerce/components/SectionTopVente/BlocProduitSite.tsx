"use client";
import React from "react";
import BlocUnique from "./BlocUnique";
import { useProduits } from "@/app/dashboard/produits/(hooks)/UseProduits";
import { StoreFiltreProduit } from "@/app/(stores)/FiltreProduit";

const BlocProduitSite = () => {
  const { data, isPending } = useProduits();

  const {
    recherche,
    promotion,
    categorie,
    stock,
    triPrix,
  } = StoreFiltreProduit();

  const produitsFiltres = data
    ?.filter((d) => {
      const matchRecherche = d.nom
        .toLowerCase()
        .includes(recherche.toLowerCase());
      const matchPromo = !promotion || !!d.prixPromo;
      const matchCategorie =
        categorie === "tous" ||
        d.categorie.toUpperCase() === categorie.toUpperCase();
      const matchStock =
        stock === "all" ||
        (stock === "faible" && d.quantiteStock <= 15) ||
        (stock === "moyen" && d.quantiteStock >= 16 && d.quantiteStock <= 70) ||
        (stock === "excellent" && d.quantiteStock > 70);

      return matchRecherche && matchPromo && matchCategorie && matchStock;
    })
    ?.sort((a, b) => {
      if (triPrix === "croissant") return a.prix - b.prix;
      if (triPrix === "decroissant") return b.prix - a.prix;
      return 0;
    });

  if (isPending) return <p>Chargement en cours...</p>;

  return (
    <div className="flex flex-wrap justify-center gap-8">
      {produitsFiltres?.map((d) => (
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
