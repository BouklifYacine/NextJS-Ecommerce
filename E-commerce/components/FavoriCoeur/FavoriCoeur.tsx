import { FormatCompteur, TailleBadge } from "@/lib/FonctionLogoTaille";
import React from "react";
import { FaHeart } from "react-icons/fa";

const FavoriCoeur = () => {
  
  const nombre = 4;
  const badgeClasses = TailleBadge(nombre);
  
  return (
    <div className="relative inline-flex">
      <FaHeart className="text-red-500" size={40} />
      <div className={`absolute ${badgeClasses} bg-white text-black rounded-full flex items-center justify-center font-medium `}>
        {FormatCompteur(nombre)}
      </div>
    </div>
  );
};

export default FavoriCoeur;