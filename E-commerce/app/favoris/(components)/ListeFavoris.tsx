"use client"
import { useFavoris } from "@/app/(hooks)/useFavoris";
import React from "react";

const ListeFavoris = () => {
  const { data, isLoading, error } = useFavoris();

  if(isLoading) return <p>Ca charge </p>

  if(error) return <p>Erreur de chargement des favoris </p>

  return (
    <div>
      {data?.produits.map((p) => (
        <div key={p.id} className="flex gap-10">
          <span>{p.nom}</span>
          <span>{p.prix}</span>
          <span>{p.quantiteStock}</span>
          <span>tg </span>
          <span></span>
          <span></span>
        </div>
      ))}
    </div>
  );
};

export default ListeFavoris;
