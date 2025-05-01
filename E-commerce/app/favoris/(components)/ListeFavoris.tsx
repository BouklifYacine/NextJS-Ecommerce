"use client"
import { useFavoris } from "@/app/(hooks)/useFavoris";
import Image from "next/image";
import React from "react";

const ListeFavoris = () => {
  const { data, isLoading, error } = useFavoris();

  console.log(data)

  if(isLoading) return <p>Ca charge </p>

  if(error) return <p>Erreur de chargement des favoris </p>

  return (
    <div>

      <h1 className="text-center text-xl md:text-5xl mt-8 font-bold">Vos favoris </h1>
      {data?.produits.map((p) => (
        <div key={p.id} className="flex gap-10 container">
          <span>{p.nom}</span>
          <span>{p.prix}</span>
          <span>{p.quantiteStock}</span>
          <span>{p.categorie}</span>
          <span><Image src={p.images[0].urlImage} alt={p.nom || "image"} width={200} height={200} ></Image></span>
          <span></span>
        </div>
      ))}
    </div>
  );
};

export default ListeFavoris;
