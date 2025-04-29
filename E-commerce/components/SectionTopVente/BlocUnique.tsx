"use client";

import React from "react";
import Rating from "@mui/material/Rating";
import { Button } from "../ui/button";
import { FiShoppingCart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { FaTag } from "react-icons/fa";
import Image from "next/image";
import Visa from "@/app/public/visa-logo-svgrepo-com.svg";
import { Badge } from "../ui/badge";
import Link from "next/link";

export interface Props {
  id: string,
  nom: string;
  image: string;
  prix: number;
  prixpromo?: number | null;
  categorie: string;
  description: string;
  stock: number;
}

const BlocUnique = ({
  nom,
  image,
  prix,
  prixpromo,
  categorie,
  description,
  stock,
  id
}: Props) => {
  
  const reduction = prixpromo ? Math.round((1 - prixpromo / prix) * 100) : 0;
  const enPromo = prixpromo && prixpromo < prix;

  const AffichageTexteStock = (stock : number) => {
    if(stock === 0) return "Rupture de stock"
    else if (stock > 1 && stock <= 30) return "Stock moyen"
    return "En stock "
  }

  const AffichageStyleStock = (stock : number) => {
    if(stock === 0) return "text-red-500"
    else if (stock > 1 && stock <= 30) return "text-amber-500"
    return "text-green-500" 
  }


  return (
    <div className="bg-white border border-gray-300 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <div className="relative">
        <Image
          src={image || Visa}
          alt={nom}
          className="w-full h-56 md:h-96 object-cover"
          width={500}
          height={500}
        />
        <button
          className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors border border-gray-400"
          aria-label="Ajouter aux favoris"
        >
          <FaHeart className="text-red-500 text-xl hover:text-red-600" />
        </button>

        <Badge className="absolute top-3 left-3 bg-white/90 p-2 rounded-xl text-sm shadow-md text-black border border-gray-400">
          {categorie || "Gaming"}
        </Badge>

        {/* Badge de promotion */}
        {enPromo && (
          <div className="absolute bottom-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full font-bold flex items-center shadow-md">
            <FaTag className="mr-1" />
            -{reduction}%
          </div>
        )}
      </div>

      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start">
          <Link href={`/landingpage/${id}`}>
          <h3 className="text-lg font-semibold text-gray-900 hover:underline cursor-pointer">{nom}</h3></Link>
          
          {/* Affichage du prix avec design amélioré pour les promos */}
          <div className="flex items-center gap-2">
            {enPromo ? (
              <>
                <p className="text-lg font-bold text-green-500">{prixpromo} €</p>
                <p className="text-sm text-gray-500 line-through">{prix} €</p>
              </>
            ) : (
              <p className="text-lg font-bold text-blue-600">{prix} €</p>
            )}
          </div>
        </div>

        <div className="flex justify-between items-start mt-2">
          <div className="flex items-center">
            <Rating value={4} precision={0.5} max={5} size="medium" readOnly />
            <span className="text-sm text-black ml-1">(4)</span>
          </div>
          <p className={`${AffichageStyleStock(stock)} text-lg font-bold`}>
            {AffichageTexteStock(stock)}
          </p>
        </div>

        <p className="text-gray-600 mb-6 mt-3 flex-grow">{description}</p>

        <Button 
          className={`w-full py-3 ${stock > 0 ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"} text-white rounded-lg flex items-center justify-center gap-2`}
          disabled={stock <= 0}
        >
          <FiShoppingCart size={20} />
          {stock > 0 ? "Ajouter au panier" : "Produit indisponible"}
        </Button>
      </div>
    </div>
  );
};

export default BlocUnique;