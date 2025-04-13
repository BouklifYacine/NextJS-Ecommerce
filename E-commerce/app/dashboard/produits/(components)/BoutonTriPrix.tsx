import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'

type enumTri = "default" | "croissant" | "decroissant"

interface Props {
    triPrix : string,
    setTriPrix : (value : enumTri ) => void 
}

const BoutonTriPrix = ({triPrix, setTriPrix} : Props) => {
  return (
    <>

          <Select value={triPrix}
           onValueChange={(value) => setTriPrix(value as enumTri)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Prix" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Catégories</SelectLabel>
                 <SelectItem value="default">Tri par défaut</SelectItem>
                <SelectItem value="croissant">Prix croissant </SelectItem>
                <SelectItem value="decroissant">Prix decroissant</SelectItem>

              </SelectGroup>
            </SelectContent>
          </Select>
    </>
  )
}

export default BoutonTriPrix