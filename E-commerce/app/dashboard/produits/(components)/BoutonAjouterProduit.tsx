"use client"

import { reponseApiProduit } from "@/app/api/admin/produits/(interface-types)/interface"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm, Controller } from "react-hook-form"
import { useAjouterProduit } from './../(hooks)/UseProduits';
import { zodResolver } from "@hookform/resolvers/zod"
import { SchemaAjouterProduits } from "@/app/(schema)/produits/SchemaProduits"
import { useState } from "react"

export function BoutonAjouterProduit() {
  const [open, setOpen] = useState(false)
  const { handleSubmit, register, control, reset, formState: { errors } } = useForm<reponseApiProduit>({
    resolver: zodResolver(SchemaAjouterProduits),
    defaultValues: {
      nom: "",
      prix: 0,
      description: "",
      quantiteStock: 0,
      categorie: "ELECTRONIQUE",
      prixPromo: 0
    }
  })
  
  const { isPending, mutate } = useAjouterProduit()

  const onSubmit = (data: reponseApiProduit) => {
    console.log("Données du formulaire:", data) // Pour déboguer
    mutate(data, {
      onSuccess: () => {
        setOpen(false)
        reset()
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Ajouter Produit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter Produit</DialogTitle>
          <DialogDescription>
            Ajouter un produit que les clients pourront acheter en respectant les modalités du formulaire
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nom" className="text-right">
                Nom*
              </Label>
              <div className="col-span-3 space-y-1">
                <Input
                  id="nom"
                  placeholder="Nom du produit"
                  {...register("nom")}
                />
                {errors.nom && <p className="text-red-500 text-sm">{errors.nom.message}</p>}
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="prix" className="text-right">
                Prix*
              </Label>
              <div className="col-span-3 space-y-1">
                <Input
                  id="prix"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register('prix', { valueAsNumber: true })}
                />
                {errors.prix && <p className="text-red-500 text-sm">{errors.prix.message}</p>}
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description*
              </Label>
              <div className="col-span-3 space-y-1">
                <Input
                  id="description"
                  placeholder="Description du produit"
                  {...register('description')}
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantitestock" className="text-right">
                Quantité stock*
              </Label>
              <div className="col-span-3 space-y-1">
                <Input
                  id="quantitestock"
                  type="number"
                  placeholder="0"
                  {...register('quantiteStock', { valueAsNumber: true })}
                />
                {errors.quantiteStock && <p className="text-red-500 text-sm">{errors.quantiteStock.message}</p>}
              </div>
            </div>
           
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="categorie" className="text-right">
                Catégorie*
              </Label>
              <div className="col-span-3 space-y-1">
                <Controller
                  name="categorie"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Liste Catégories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Catégories</SelectLabel>
                          <SelectItem value="ELECTRONIQUE">Electronique</SelectItem>
                          <SelectItem value="INFORMATIQUE">Informatique</SelectItem>
                          <SelectItem value="GAMING">Gaming</SelectItem>
                          <SelectItem value="MOBILIER">Mobilier</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.categorie && <p className="text-red-500 text-sm">{errors.categorie.message}</p>}
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="prixPromotion" className="text-right">
                Prix Promotion
              </Label>
              <div className="col-span-3 space-y-1">
                <Input
                  id="prixPromotion"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register('prixPromo', { valueAsNumber: true })}
                />
                {errors.prixPromo && <p className="text-red-500 text-sm">{errors.prixPromo.message}</p>}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Sauvegarde en cours..." : "Sauvegarder"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}