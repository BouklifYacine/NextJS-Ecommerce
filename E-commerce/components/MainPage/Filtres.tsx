"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { StoreFiltreProduit } from "@/app/(stores)/FiltreProduit";
import BoutonTriPrix from "@/app/dashboard/produits/(components)/BoutonTriPrix";
import FiltreCategories from "@/app/dashboard/produits/(components)/FiltreCategories";
import FiltreStock from "@/app/dashboard/produits/(components)/FiltreStock";

const Filtres = () => {
  const {
    recherche,
    setRecherche,
    promotion,
    setPromotion,
    categorie,
    setCategorie,
    stock,
    setStock,
    triPrix,
    setTriPrix,
  } = StoreFiltreProduit();

  return (
    <div className="px-4 pb-10 sm:px-6">
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 md:justify-end md:items-center">
        <div className="flex items-center space-x-2 whitespace-nowrap">
          <Checkbox
            id="promotion"
            checked={promotion}
            onCheckedChange={() => setPromotion(!promotion)}
          />
          <label htmlFor="promotion" className="text-sm font-medium">
            Promotion
          </label>
        </div>
        <BoutonTriPrix triPrix={triPrix} setTriPrix={setTriPrix} />
        <FiltreStock stock={stock} setStock={setStock} />
        <FiltreCategories categorie={categorie} setCategorie={setCategorie} />

        <div className="w-full sm:w-auto">
          <Input
            onChange={(e) => setRecherche(e.target.value)}
            value={recherche}
            className="w-full sm:w-60 border border-black"
            placeholder="Chercher un article"
          />
        </div>
      </div>
    </div>
  );
};

export default Filtres;
