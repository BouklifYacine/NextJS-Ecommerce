import { FormatCompteur, TailleBadge } from '@/lib/FonctionLogoTaille';
import { ShoppingBasket } from 'lucide-react'
import React from 'react'

const LogoPanier = () => {

   const nombre = 4;
    const badgeClasses = TailleBadge(nombre);
    
  return (
    <>
           <div className="relative">
  <ShoppingBasket className="text-red-500" size={44} strokeWidth={1.2} />
  <div className={`absolute ${badgeClasses} bg-white text-black rounded-full flex items-center justify-center font-medium `}>
          {FormatCompteur(nombre)}
        </div>
</div>
    </>
  )
}

export default LogoPanier