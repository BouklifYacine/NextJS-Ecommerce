import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'

type EnumCategorie = "tous" | "ELECTRONIQUE" | "INFORMATIQUE" | "GAMING" | "MOBILIER"

interface CategorieProps {
    categorie : string 
    setCategorie : (value : EnumCategorie ) => void
}

const FiltreCategories = ({categorie, setCategorie} : CategorieProps) => {
  return (
   <>
   <Select value={categorie} onValueChange={(value) => setCategorie(value as EnumCategorie)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Liste Catégories" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Catégories</SelectLabel>
                 <SelectItem value="tous">Toutes les catégories</SelectItem>
                <SelectItem value="ELECTRONIQUE">Electronique </SelectItem>
                <SelectItem value="INFORMATIQUE">Informatique</SelectItem>
                <SelectItem value="GAMING">Gaming</SelectItem>
                <SelectItem value="MOBILIER">Mobilier</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
   </>
  )
}

export default FiltreCategories