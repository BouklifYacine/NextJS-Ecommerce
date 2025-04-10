"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { useProduits } from "../(hooks)/UseProduits";

const TableProduitComposant = () => {
  const { data : produits } = useProduits();

  const GestionduStock = (quantitestock: number) => {
    if (quantitestock <= 25) return "bg-red-500 text-white";
    else if (quantitestock >= 26 && quantitestock <= 70 ) return "bg-yellow-500 text-white";
    else return "bg-green-500 text-white";
  };

  return (
    <div className="rounded-md  p-6 mt-6">
      <h1 className="text-xl font-bold m-4 text-center">Liste des produits </h1>
      <Table className="rounded-3xl">
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead className="font-bold text-black">Nom</TableHead>
            <TableHead className="font-bold text-black">Prix </TableHead>
            <TableHead className="font-bold text-black">
              Prix en Promotion
            </TableHead>
            <TableHead className="font-bold text-black">
              Quantité Stock
            </TableHead>
            <TableHead className="font-bold text-black">En Promotion</TableHead>
            <TableHead className="font-bold text-black">Catégorie</TableHead>
            <TableHead className="font-bold text-black"> Images</TableHead>
            <TableHead className="font-bold text-black"> Date création</TableHead>
           
          </TableRow>
        </TableHeader>

       

        <TableBody>
          {produits?.map((produit) => (
            <TableRow key={produit.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>{produit.nom}</TableCell>
              <TableCell>{produit.prix}</TableCell>
              <TableCell>
                <Badge
                  className={
                    produit.prixPromo
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }
                >
                  {produit.prixPromo ? produit.prixPromo : "Pas en Promo"}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={GestionduStock(produit.quantiteStock)}>
                  {" "}
                  {produit.quantiteStock}{" "}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  className={
                    produit.enPromotion === true
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }
                >
                  {produit.enPromotion === true ? "Oui" : "Non"}
                </Badge>
              </TableCell>
              <TableCell>
               {produit.categorie.toLowerCase()}
              </TableCell>
              <TableCell> {produit.images.length}</TableCell>
              <TableCell>
                {new Date(produit.createdAt).toLocaleDateString("fr-FR")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableProduitComposant;
