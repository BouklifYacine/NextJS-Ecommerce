import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { AjouterFavoris } from "../(actions)/FavorisAction";
import { useSession } from "next-auth/react";
import { Favori } from "../(types)/favoris";

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

export function useAjouterFavoris() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: AjouterFavoris,

    onMutate: async (produitId: string) => {
      // Annule les requêtes en cours sur "favoris"
      await queryClient.cancelQueries({ queryKey: ["favoris"] })

      // Sauvegarde l'ancien état
      const anciensFavoris = queryClient.getQueryData<Favori[]>(["favoris"]) || []

      // Ajoute le nouveau favori "optimiste"
     

      return { anciensFavoris }
    },

    // Étape 2: Si erreur, on annule
    onError: (err, _, context) => {
      if (context?.anciensFavoris) {
        queryClient.setQueryData(["favoris"], context.anciensFavoris)
      }
      alert(`Erreur: ${err.message}`) // Simple alert pour l'exemple
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["favoris"] })
    }
  })
}
