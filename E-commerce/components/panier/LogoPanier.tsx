import { FormatCompteur, TailleBadge } from '@/lib/FonctionLogoTaille';
import React from 'react'
import { BsCartFill } from "react-icons/bs";
import { GiShoppingCart } from "react-icons/gi";

const LogoPanier = () => {
  const nombre = 88;
  
  return (
    <div className="relative inline-block">
      <GiShoppingCart className="text-red-500" size={40} strokeWidth={1.2}  />
      <div className={`absolute -top-1 -right-1 ${TailleBadge(nombre)} bg-white text-black rounded-full flex items-center justify-center font-medium`}>
        {FormatCompteur(nombre)}
      </div>
    </div>
  );
};

export default LogoPanier