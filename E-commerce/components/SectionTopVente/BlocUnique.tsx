"use client";

import React from "react";
import Rating from "@mui/material/Rating";
import { Button } from "../ui/button";
import { FiShoppingCart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import Image from "next/image";
import Visa from "@/app/public/visa-logo-svgrepo-com.svg";
import { Badge } from "../ui/badge";
export interface Props {
  nom: string;
  image: string;
  prix: number;
  prixpromo? : number | null
  categorie: string;
  description: string;
  stock : number
}

const BlocUnique = ({nom, image, prix, prixpromo, categorie, description, stock}: Props) => {

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

        <Badge className="absolute top-3 left-3 bsg-white/90 p-2 rounded-xl text-sm shadow-md bg-white text-black border border-gray-400">
          {categorie || "Gaming"}
        </Badge>
      </div>

      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900">
            {nom}
          </h3>
          <p className="text-lg font-bold text-blue-600">
            ${prixpromo ? prixpromo : prix} {prixpromo ? "En promotion" : ""}
          </p>
        </div>

        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <Rating
              value={4}
              precision={0.5}
              max={5}
              size="medium"
              readOnly
            />
            <span className="text-sm text-black ml-1">(4)</span>
          </div>
          <p className="text-green-500">
            {stock > 50 ? "En stock" : "Rupture de stock"}
          </p>
        </div>

        <p className="text-gray-600 mb-6 flex-grow">
          {description}
        </p>

        <Button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2">
          <FiShoppingCart size={20} />
          Ajouter au panier
        </Button>
      </div>
    </div>
  );
};

export default BlocUnique;
