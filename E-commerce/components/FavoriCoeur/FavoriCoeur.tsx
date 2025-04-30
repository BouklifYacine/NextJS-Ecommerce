import { useFavoris } from "@/app/(hooks)/useFavoris";
import { CouleurIcone, FormatCompteur, TailleBadge } from "@/lib/FonctionIconeNavbar";
import React from "react";
import { FaHeart } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";

const FavoriCoeur = () => {
  const { data, isLoading } = useFavoris();
  const nombre = data?.nombrefavoris || 0;
  const CouleurFavoris = CouleurIcone(nombre);
  
  return (
    <div className="relative inline-block">
      <FaHeart className={`${CouleurFavoris}`} size={36} />
      <div className={`absolute -top-2 -right-2 ${TailleBadge(nombre)} bg-white text-black rounded-full flex items-center justify-center font-medium`}>
        {isLoading ? (
          <ImSpinner8 className="animate-spin h-4 w-4" />
        ) : (
          FormatCompteur(nombre)
        )}
      </div>
    </div>
  );
};

export default FavoriCoeur;
