import { CouleurIcone, FormatCompteur, TailleBadge } from "@/lib/FonctionIconeNavbar";
import Link from "next/link";
import React from "react";
import { FaHeart } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";

interface Props {
  nombreFavoris : number,
  isLoading : boolean
}

const FavoriCoeur = ({nombreFavoris ,isLoading} : Props) => {
  const CouleurFavoris = CouleurIcone(nombreFavoris);
  
  return (
    <div className="relative inline-block">
      <Link href='/favoris'>
      <FaHeart className={`${CouleurFavoris}`} size={36} /></Link>
      <div className={`absolute -top-2 -right-2 ${TailleBadge(nombreFavoris)} bg-white text-black rounded-full flex items-center justify-center font-medium`}>
        {isLoading ? (
          <ImSpinner8 className="animate-spin h-4 w-4" />
        ) : (
          FormatCompteur(nombreFavoris)
        )}
        
      </div>
    </div>
  );
};

export default FavoriCoeur;
