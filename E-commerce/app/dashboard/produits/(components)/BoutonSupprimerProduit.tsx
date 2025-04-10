
import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'

const BoutonSupprimerProduit = () => {
  return (
    <AlertDialog>
    <AlertDialogTrigger asChild>
        <Button>Supprimer </Button>
        </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Etes vous sur de supprimer ce produit?</AlertDialogTitle>
        <AlertDialogDescription>
          Cette action sera irréversible. Cela va supprimer définitivement ce produit de votre site 

        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Annuler</AlertDialogCancel>
        <AlertDialogAction>Supprimer</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}

export default BoutonSupprimerProduit