" use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import React from 'react'
import { Badge } from '@/components/ui/badge'

const QuantiteStock : number = 11

let prixPromotion ;

const promotion : boolean = true 

const GestionduStock = () => {

  if(QuantiteStock <= 10) return "bg-red-500 text-white"
  else if (QuantiteStock < 50) return "bg-yellow-500 text-white"
  else return "bg-green-500 text-white"
}

const TableProduitComposant = () => {
  return (
    <div className="rounded-md  p-6 mt-6">
      <h1 className='text-xl font-bold m-4 text-center'>Liste des produits </h1>
      <Table className='rounded-3xl'>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead className="font-bold text-black">Nom</TableHead>
            <TableHead className="font-bold text-black">Prix </TableHead>
            <TableHead className="font-bold text-black">Prix en Promotion</TableHead>
            <TableHead className="font-bold text-black">Quantité Stock</TableHead>
            <TableHead className="font-bold text-black">En Promotion</TableHead>
            <TableHead className="font-bold text-black">Catégorie</TableHead>
            <TableHead className="font-bold text-black"> Images</TableHead>
            <TableHead className="font-bold text-black"> Avis</TableHead>
            <TableHead className="font-bold text-black"> Produits commande</TableHead>
            <TableHead className="font-bold text-black"> Favoris</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell>Jean Dupont</TableCell>
            <TableCell>
             599 euros
            </TableCell>
            <TableCell><Badge className={prixPromotion ? "bg-green-500 text-white": "bg-red-500 text-white"}>{prixPromotion ? prixPromotion : "Pas en Promo"}</Badge></TableCell>
            <TableCell><Badge className={GestionduStock()}> {QuantiteStock} </Badge></TableCell>
            <TableCell><Badge className={promotion === true ? "bg-green-500 text-white": "bg-red-500 text-white"}>{promotion === true ? "Oui" : "Non"}</Badge></TableCell>
            <TableCell>
              <div className="flex items-center">
               
                <select className="ml-2 text-xs border rounded p-1">
                  <option>GAMING</option>
                  <option>ELECTRONIQUE</option>
                  <option>INFORMATIQUE</option>
                  <option>MOBILIER</option>
                </select>
              </div>
            </TableCell>
            <TableCell>
             3
            </TableCell>
            <TableCell>
              <Badge className='bg-green-500'> Coucou</Badge>
            </TableCell>
            <TableCell>
             5
            </TableCell>
            <TableCell>
              6
            </TableCell>
          </TableRow>

         
        </TableBody>
      </Table>
    </div>
  )
}

export default TableProduitComposant