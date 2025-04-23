import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const BoutonAjouterProduit = () => {
  return (
    
  <> <Link href={"/dashboard/produits/ajouterproduits"}> <Button variant="default">Ajouter Produit</Button> </Link>   
  </>
  )
}

export default BoutonAjouterProduit