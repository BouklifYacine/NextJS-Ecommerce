"use client";

import { useFavoris, useSupprimerFavoris } from "@/app/(hooks)/useFavoris";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";

const ListeFavoris = () => {
  const { data, isLoading, error } = useFavoris();
  const {mutate, isPending} = useSupprimerFavoris()

  if (isLoading) return <p className="text-center mt-4">Chargement...</p>;
  if (error)
    return (
      <p className="text-center mt-4 text-red-500">
        Erreur de chargement des favoris
      </p>
    );
   
    const SupprimerFavoris = (id : string, nom : string) => {
     mutate(id)
     toast.success(`Le produit ${nom} a été retirer des favoris`)
    };
   

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-center text-2xl md:text-4xl mt-8 font-bold">
        Vos Favoris
      </h1>
      <div className="mt-8 space-y-6">
        {data?.produits.map((p) => (
          <div
            key={p.id}
            className="flex flex-col md:flex-row items-center justify-between bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
           
            <div className="flex flex-1 items-center gap-4">
              <div className="w-20 h-20 relative rounded-full overflow-hidden flex-shrink-0 border border-gray-200">
                {p.images[0] && (
                  <Image
                    src={p.images[0].urlImage}
                    alt={p.nom || "Image du produit"}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {p.nom}
                </h2>
                <p className="text-lg text-gray-500">{p.categorie}</p>
                <p className="text-lg text-gray-700">{p.prix} €</p>
                <p className="text-lg text-gray-400">
                  En stock : {p.quantiteStock}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-4 md:mt-0">

                <button disabled={isPending} className={`${isPending ? "text-opacity-35 text-red-500" : " text-red-500"}`} onClick={(e) => {
                  e.preventDefault();
                  SupprimerFavoris(p.id, p.nom);
                }}>  <Trash2 size={28}/></button>       

            <ShoppingCart size={28} className="text-green-500"  />
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListeFavoris;
