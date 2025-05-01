import React from 'react'
import ListeFavoris from './(components)/ListeFavoris'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

const Favoris = async () => {

  const session = await auth()

  if(!session || !session.user?.id) {
    redirect("/")
  }
  return (
   <><ListeFavoris></ListeFavoris></>
  )
}

export default Favoris