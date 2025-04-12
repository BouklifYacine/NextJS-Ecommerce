"use client"
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
import { useSupprimerProduits } from '../(hooks)/UseProduits'
import { Trash2 } from 'lucide-react'

interface ProduitId { produitId: string }

const BoutonSupprimerProduit = ({produitId }: ProduitId) => {
    const { isPending, mutate } = useSupprimerProduits()

    const SupprimerProduit = () => {
        console.log("ID du produit dans le bouton :", produitId);
        mutate(produitId)
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button 
                    disabled={isPending} 
                    className={isPending ? "opacity-50" : "opacity-100"}
                    variant={"destructive"}
                >
                    {isPending ? "Suppression" : "Supprimer"}
                    <Trash2 />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Êtes-vous sûr de supprimer ce produit ?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Cette action sera irréversible. Cela va supprimer définitivement ce produit de votre site
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction onClick={SupprimerProduit}>Supprimer</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default BoutonSupprimerProduit