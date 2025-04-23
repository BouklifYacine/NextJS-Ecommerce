"use client"

import { reponseApiProduit } from "@/app/api/admin/produits/(interface-types)/interface"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm, Controller } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { SchemaAjouterProduits } from "@/app/(schema)/produits/SchemaProduits"
import { useState } from "react"
import { CldUploadWidget, CldImage } from 'next-cloudinary'
import { useAjouterProduit } from "../../(hooks)/UseProduits"

// Définition de l'interface pour les données d'image
interface ImageData {
  url: string
  publicId: string
}

export function FormulaireAjouterProduit() {
  const [imageData, setImageData] = useState<ImageData | null>(null)
  
  const { handleSubmit, register, control, reset, setValue, formState: { errors } } = useForm<reponseApiProduit>({
    resolver: zodResolver(SchemaAjouterProduits),
    defaultValues: {
      nom: "",
      prix: 0,
      description: "",
      quantiteStock: 0,
      categorie: "ELECTRONIQUE",
      prixPromo: 0,
    }
  })
  
  const { isPending, mutate } = useAjouterProduit()

  const handleImageUpload = (result: { url: string; publicId: string }) => {
    setImageData(result)
    setValue('imageUrl', result.url)
    setValue('imagePublicId', result.publicId)
    console.log('Image reçue:', result)
  }

  const onSubmit = (data: reponseApiProduit) => {
    console.log("Données du formulaire:", data)
    mutate(data, {
      onSuccess: () => {
        reset()
        setImageData(null)
      }
    })
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Ajouter un Produit</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="nom">Nom du Produit*</Label>
          <Input
            id="nom"
            placeholder="Nom du produit"
            {...register("nom")}
            className="mt-1"
          />
          {errors.nom && <p className="text-red-500 text-sm">{errors.nom.message}</p>}
        </div>
        
        <div>
          <Label htmlFor="prix">Prix*</Label>
          <Input
            id="prix"
            type="number"
            step="0.01"
            placeholder="0.00"
            {...register('prix', { valueAsNumber: true })}
            className="mt-1"
          />
          {errors.prix && <p className="text-red-500 text-sm">{errors.prix.message}</p>}
        </div>
        
        <div>
          <Label htmlFor="description">Description*</Label>
          <Input
            id="description"
            placeholder="Description du produit"
            {...register('description')}
            className="mt-1"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>
        
        <div>
          <Label htmlFor="quantiteStock">Quantité en Stock*</Label>
          <Input
            id="quantiteStock"
            type="number"
            placeholder="0"
            {...register('quantiteStock', { valueAsNumber: true })}
            className="mt-1"
          />
          {errors.quantiteStock && <p className="text-red-500 text-sm">{errors.quantiteStock.message}</p>}
        </div>
        
        <div>
          <Label htmlFor="categorie">Catégorie*</Label>
          <Controller
            name="categorie"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Sélectionner une catégorie" />
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
        
        <div>
          <Label htmlFor="prixPromo">Prix Promotion</Label>
          <Input
            id="prixPromo"
            type="number"
            step="0.01"
            placeholder="0.00"
            {...register('prixPromo', { valueAsNumber: true })}
            className="mt-1"
          />
          {errors.prixPromo && <p className="text-red-500 text-sm">{errors.prixPromo.message}</p>}
        </div>
        
        <div>
          <Label>Image Produit</Label>
          <div className="mt-2 space-y-2">
            <CldUploadWidget
              uploadPreset="dcjfs98o"
              options={{
                sources: ['local'],
                multiple: false,
                maxFiles: 1
              }}
              onSuccess={(result: any) => {
                const url = result.info.secure_url
                const publicId = result.info.public_id
                
                handleImageUpload({ url, publicId })
              }}
            >
              {({ open }) => (
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={() => open()}
                  className="w-full"
                >
                  Uploader une image
                </Button>
              )}
            </CldUploadWidget>
            
            {imageData && (
              <div className="mt-2 flex flex-col items-center">
                <CldImage
                  src={imageData.publicId}
                  width={200}
                  height={150}
                  alt="Image du produit"
                  className="rounded-lg border"
                />
                <p className="text-xs text-gray-500 mt-1 break-all text-center">
                  {imageData.url}
                </p>
              </div>
            )}
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full mt-4" 
          disabled={isPending}
        >
          {isPending ? "Sauvegarde en cours..." : "Sauvegarder"}
        </Button>
      </form>
    </div>
  )
}