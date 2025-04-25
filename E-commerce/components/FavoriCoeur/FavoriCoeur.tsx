import { CouleurIcone, FormatCompteur, TailleBadge } from "@/lib/FonctionIconeNavbar";
import React from "react";
import { FaHeart } from "react-icons/fa";

const FavoriCoeur = () => {
  const nombre = 10;
  const CouleurFavoris = CouleurIcone(nombre)
  
  return (
    <div className="relative inline-block">
      <FaHeart className={`${CouleurFavoris}`} size={36} />
      <div className={`absolute -top-2 -right-2 ${TailleBadge(nombre)} bg-white text-black rounded-full flex items-center justify-center font-medium`}>
        {FormatCompteur(nombre)}
      </div>
    </div>
  );
};

export default FavoriCoeur;