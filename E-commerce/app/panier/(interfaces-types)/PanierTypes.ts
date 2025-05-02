import { Categorie } from "@prisma/client";

export interface SupprimerPanierResult {
  success: boolean;
  message: string;
  status: number;
}

export interface ProduitInPanier {
    id: string;
    nom: string;
    description: string;
    prix: number;
    prixPromo: number | null; 
    quantiteStock: number;
    enPromotion: boolean;
    categorie: Categorie; 
    createdAt: string; 
    updatedAt: string;
  }
  
  export interface PanierItem {
    id: string;
    panierId: string;
    produitId: string;
    quantite: number;
    createdAt: string;
    updatedAt: string;
    produit: ProduitInPanier; 
  }
  
  export interface Panier {
    id: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    items: PanierItem[]; 
  }
  

export interface PanierApiResponse {
    panier: Panier; 
  }
  
  