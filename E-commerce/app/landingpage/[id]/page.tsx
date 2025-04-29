"use client"
import { useProduitsId } from '@/app/dashboard/produits/(hooks)/UseProduits'
import React from 'react'

interface PropsId {
    params : {id : string}
}

const ProduitId = ({params} : PropsId) => {

    const {data : produitId, isLoading, error} = useProduitsId(params.id)

    if(error) return <p>Il y'a une erreur </p>

    if (isLoading) return <p>ca charge bg </p>
  return (
    <>
    <p>{produitId?.id}</p>
    <p>{produitId?.prix}</p>
    <p>{produitId?.description}</p>
    <p>{produitId?.nom}</p>
    <p>{produitId?.quantiteStock}</p>
    </>
  )
}

export default ProduitId