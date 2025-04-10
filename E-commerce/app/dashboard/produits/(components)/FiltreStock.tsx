import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'

type EnumsStock = 'all' | 'faible' | 'moyen' | 'excellent';

interface FiltreStockProps {
  stock: string;
  setStock: (value: EnumsStock) => void;
}

const FiltreStock = ({ stock, setStock } : FiltreStockProps ) => {
  return (
    <>
     <Select value={stock}  onValueChange={(value) => setStock(value as EnumsStock)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Liste Stock" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Stocks : </SelectLabel>
                 <SelectItem value="all">Tout type de stock </SelectItem>
                <SelectItem value="faible" className="text-red-500">Stock faible (15 max) </SelectItem>
                <SelectItem value="moyen" className="text-yellow-500">Stock Moyen (16 a 70)</SelectItem>
                <SelectItem value="excellent" className="text-green-500">Stock excellent (+71)</SelectItem>
             
              </SelectGroup>
            </SelectContent>
          </Select>
    </>
  )
}

export default FiltreStock