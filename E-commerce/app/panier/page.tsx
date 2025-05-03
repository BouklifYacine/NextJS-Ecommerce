import React from 'react'
import AffichageProduitPanier from './(components)/AffichageProduitPanier'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Footer from '@/components/FooterComponents/Footer'
import Header from '@/components/header'

const PagePanier = async () => {

  const session = await auth()
  if(!session || !session.user?.id) { return redirect("/inscription")}
  return (

    <>
    <Header></Header>
    <AffichageProduitPanier></AffichageProduitPanier>
    <Footer></Footer>
    </>
  )
}

export default PagePanier