import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'

const FiltresStock = () => {
  return (
    <>
 <Select>
      <SelectTrigger className="w-full sm:w-[180px] h-12 bg-gray-300 rounded-full select-trigger">
        <SelectValue placeholder="Prix" className="text-red-500 text-lg font-medium" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Catégories</SelectLabel>
          <SelectItem value="default">Tri par défaut</SelectItem>
          <SelectItem value="croissant">Prix croissant</SelectItem>
          <SelectItem value="decroissant">Prix décroissant</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    </>
  )
}

export default FiltresStock