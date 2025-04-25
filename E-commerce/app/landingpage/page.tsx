
import BlocProduitTopVente from '@/components/SectionTopVente/BlocProduitTopVente'
import TitreTopVente from '@/components/SectionTopVente/Titre'
import React from 'react'
const LandingPage = () => {
  return (
    <>
    <div className='bg-purple-500'>

    <div className='container mx-auto bg-red-500'>
    <TitreTopVente></TitreTopVente>
    <BlocProduitTopVente></BlocProduitTopVente>
    </div>

    </div>
   
    </>
  )
}

export default LandingPage