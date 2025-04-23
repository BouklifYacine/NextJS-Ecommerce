"use client"

import React from 'react';
import { useProduits } from '../(hooks)/UseProduits';
import { Badge } from "@/components/ui/badge";
import { Euro } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Controller } from 'react-hook-form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Props {
  params: { id: string } 
}

const ProduitID = ({ params }: Props) => {
  const { data: produits, isLoading } = useProduits();
  const produit = produits?.find(p => p.id.toString() === params.id);
  
  if (isLoading) {
    return <div className="p-6">Chargement en cours...</div>;
  }
  
  if (!produit) {
    return (
      <div className="p-6">
        <p>Produit non trouvé</p>
        <Link href="/produits">
          <Button className="mt-4">Retour à la liste des produits</Button>
        </Link>
      </div>
    );
  }
  

  const getStockBadgeClass = (quantitestock: number) => {
    if (quantitestock <= 15) return "bg-red-500 text-white";
    else if (quantitestock >= 16 && quantitestock <= 70) return "bg-yellow-500 text-white";
    else return "bg-green-500 text-white";
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Ajouter un Produit</h2>
      <form  className="space-y-4">
        <div>
          <Label htmlFor="nom">Nom du Produit*</Label>
          <Input
            id="nom"
            placeholder="Nom du produit"
            // {...register("nom")}
            className="mt-1"
            defaultValue={produit.nom}
          />
          {/* {errors.nom && <p className="text-red-500 text-sm">{errors.nom.message}</p>} */}
        </div>
        
        <div>
          <Label htmlFor="prix">Prix*</Label>
          <Input
            id="prix"
            type="number"
            step="0.01"
            placeholder="0.00"
            // {...register('prix', { valueAsNumber: true })}
            className="mt-1"
            defaultValue={produit.prix}
          />
          {/* {errors.prix && <p className="text-red-500 text-sm">{errors.prix.message}</p>} */}
        </div>
        
        <div>
          <Label htmlFor="description">Description*</Label>
          <Input
            id="description"
            placeholder="Description du produit"
            // {...register('description')}
            className="mt-1"
            defaultValue={produit.description}
          />
          {/* {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>} */}
        </div>
        
        <div>
          <Label htmlFor="quantiteStock">Quantité en Stock*</Label>
          <Input
            id="quantiteStock"
            type="number"
            placeholder="0"
            defaultValue={produit.quantiteStock}
            // {...register('quantiteStock', { valueAsNumber: true })}
            className="mt-1"
          />
          {/* {errors.quantiteStock && <p className="text-red-500 text-sm">{errors.quantiteStock.message}</p>} */}
        </div>
        
        <div>
          <Label htmlFor="categorie">Catégorie*</Label>
          <Select defaultValue={produit.categorie} >
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Sélectionner une catégorie"  />
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
          {/* {errors.categorie && <p className="text-red-500 text-sm">{errors.categorie.message}</p>} */}
        </div>
        
        <div>
          <Label htmlFor="prixPromo">Prix Promotion (Optionnel)</Label>
          <Input
            id="prixPromo"
            type="number"
            step="0.01"
            placeholder="0.00"
            // {...register('prixPromo', { valueAsNumber: true })}
            className="mt-1"
            defaultValue={produit.prixPromo || 0}
          />
          {/* {errors.prixPromo && <p className="text-red-500 text-sm">{errors.prixPromo.message}</p>} */}
        </div>
        
        
        
        <Button 
          type="submit" 
          className="w-full mt-4" 
        //   disabled={isPending}
        >
          {/* {isPending ? "Ajout du produit..." : "Ajouter Produit"} */} {"Modifier produit"}
        </Button>
      </form>
    </div>
  );
};

export default ProduitID;