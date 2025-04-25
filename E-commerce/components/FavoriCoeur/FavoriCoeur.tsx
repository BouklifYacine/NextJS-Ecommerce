import { FormatCompteur, TailleBadge } from "@/lib/FonctionLogoTaille";
import React from "react";
import { FaHeart } from "react-icons/fa";

const FavoriCoeur = () => {
  const nombre = 4000;
  
  return (
    <div className="relative inline-block">
      <FaHeart className="text-red-500" size={36} />
      <div className={`absolute -top-2 -right-2 ${TailleBadge(nombre)} bg-white text-black rounded-full flex items-center justify-center font-medium`}>
        {FormatCompteur(nombre)}
      </div>
    </div>
  );
};

export default FavoriCoeur;