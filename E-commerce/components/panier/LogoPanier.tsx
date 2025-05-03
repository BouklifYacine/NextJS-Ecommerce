import { CouleurIcone, FormatCompteur, TailleBadge } from '@/lib/FonctionIconeNavbar';
import React from 'react'
import { GiShoppingCart } from "react-icons/gi";

interface Props {
  nombreArticle : number
}

const LogoPanier = ({nombreArticle} : Props) => {
  const nombre = 880;
   const CouleurFavoris = CouleurIcone(nombre)
  
  return (
    <div className="relative inline-block">
      <GiShoppingCart className={`${CouleurFavoris}`} size={40} strokeWidth={1.2}  />
      <div className={`absolute -top-1 -right-1 ${TailleBadge(nombre)} bg-white text-black rounded-full flex items-center justify-center font-medium`}>
        {FormatCompteur(nombreArticle)}
      </div>
    </div>
  );
};

export default LogoPanier