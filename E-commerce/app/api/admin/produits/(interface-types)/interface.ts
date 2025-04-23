import { Categorie } from "@prisma/client";
export interface Image{
    id: string;
    produitId: string;
    urlImage: string; 
    principale?: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProduitFormData {
  nom: string;
  description: string;
  prix: number;
  prixPromo?: number | null;
  quantiteStock: number;
  categorie: Categorie;
  image: {
    urlImage: string;
    publicId: string;
  };
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
  image : Image
}

export interface ApiResponse {
  data: reponseApiProduit[];
  
}
