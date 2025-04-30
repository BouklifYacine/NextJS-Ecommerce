import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { AjouterFavoris, SupprimerFavoris } from "../(actions)/FavorisAction";
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
      await queryClient.cancelQueries({ queryKey: ["favoris"] })

      const anciensFavoris = queryClient.getQueryData<Favori[]>(["favoris"]) || []

      // Ajoute le nouveau favori "optimiste"
     

      return { anciensFavoris }
    },

    onError: (err, _, context) => {
      if (context?.anciensFavoris) {
        queryClient.setQueryData(["favoris"], context.anciensFavoris)
      }
      alert(`Erreur: ${err.message}`)
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["favoris"] })
    }
  })
}

export function useSupprimerFavoris() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: SupprimerFavoris,
    // onMutate: async (produitId) => {
    //   await queryClient.cancelQueries({ queryKey: ["favoris"] });
    //   const previousFavoris = queryClient.getQueryData<Favori[]>("favoris") || [];
      
    //   // Optimistic update
    //   queryClient.setQueryData<Favori[]>("favoris", (old = []) => 
    //     old.filter(f => f.produit.id !== produitId)
    //   );

    //   return { previousFavoris };
    // },
    // onError: (err, produitId, context) => {
    //   if (context?.previousFavoris) {
    //     queryClient.setQueryData(["favoris"], context.previousFavoris);
    //   }
    // },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["favoris"] });
    }
  });
}

