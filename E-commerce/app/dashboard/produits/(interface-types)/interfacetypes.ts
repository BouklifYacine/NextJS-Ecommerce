import { Categorie } from "@prisma/client";

export interface BoutonModifierProps {
    produit: {
      id: string;
      nom: string;
      prix: number;
      description: string;
      quantiteStock: number;
      categorie: Categorie;
      prixPromo?: number | null;
      enPromotion: boolean;
    }
  }