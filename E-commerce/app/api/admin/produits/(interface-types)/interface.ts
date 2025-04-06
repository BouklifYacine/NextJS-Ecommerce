import { Categorie } from "@prisma/client";

export interface reponseApiProduit {
  nom: string;
  description: string;
  prix: number;
  prixPromo? : number | null
  quantiteStock: number;
  categorie: Categorie;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  enPromotion: boolean;
}