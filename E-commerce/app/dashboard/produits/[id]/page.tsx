"use client"

import React from 'react';
import { useProduits } from '../(hooks)/UseProduits';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import FormulaireModifierProduit from '../(components)/FormulaireModifierProduit';

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

  return (
   <FormulaireModifierProduit produit={produit}></FormulaireModifierProduit>
  );
};

export default ProduitID;