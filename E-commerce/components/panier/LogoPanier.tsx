import { ShoppingBasket } from 'lucide-react'
import React from 'react'

const LogoPanier = () => {
  return (
    <>
           <div className="relative">
  <ShoppingBasket className="text-red-500" size={44} strokeWidth={1.2} />
  <div className="absolute top-0 right-0 bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-sm"> 50 </div>
</div>
    </>
  )
}

export default LogoPanier