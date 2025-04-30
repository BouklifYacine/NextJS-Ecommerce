import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Produit {
  id: string;
  nom: string;
  description: string;
  prix: number;
  prixPromo: number | null;
  quantiteStock: number;
  enPromotion: boolean;
  categorie: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiFavoris {
  message: string;
  produits: Produit[];
  nombrefavoris: number;
}

export function useFavoris() {
  return useQuery<ApiFavoris>({
    queryKey: ["favoris"],
    queryFn: async () => {
      const reponse = await axios.get<ApiFavoris>("/api/favoris");
      return reponse.data;
    },
  });
}
