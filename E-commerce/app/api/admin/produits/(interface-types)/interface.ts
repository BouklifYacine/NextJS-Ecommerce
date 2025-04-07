import { Categorie } from "@prisma/client";
interface Image{
    id: string;
    produitId: string;
    urlImage: string;
    principale: boolean;
    ordre: number;
    createdAt: Date;
    updatedAt: Date;
}

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
  images : Image[]

}