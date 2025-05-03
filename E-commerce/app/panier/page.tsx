import React from 'react'
import AffichageProduitPanier from './(components)/AffichageProduitPanier'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

const PagePanier = async () => {

  const session = await auth()
  if(!session || !session.user?.id) { return redirect("/inscription")}
  return (
    <><AffichageProduitPanier></AffichageProduitPanier></>
  )
}

export default PagePanier