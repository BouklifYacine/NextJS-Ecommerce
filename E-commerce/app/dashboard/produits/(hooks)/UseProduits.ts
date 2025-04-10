import { reponseApiProduit } from "@/app/api/admin/produits/(interface-types)/interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { supprimerProduit } from "../(actions)/ActionProduit";

export function useProduits() {
    return useQuery<reponseApiProduit[]>({  
        queryKey: ['produits'],
        queryFn: async () => {
            const response = await axios.get<{ produits: reponseApiProduit[] }>("/api/admin/produits");
            return response.data.produits; 
        }
    });
}

export function useSupprimerProduits() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async (produitId: string) => {
        const result = await supprimerProduit(produitId);
        return result;
      },
      onMutate: async (produitId) => {
        await queryClient.cancelQueries({ queryKey: ['produits'] });
        const anciensProduits = queryClient.getQueryData(['produits']);

        queryClient.setQueryData(['produits'], (listeActuelle: reponseApiProduit[]) => 
          listeActuelle.filter(produit => produit.id !== produitId)
        );
        
        return { anciensProduits };
      },
      onError: (error: Error, ) => {
        toast.error(error.message || "Erreur lors de la suppression du produit");
      },
      onSuccess: (data) => {
        toast.success(data.message || "Produit supprimé avec succès");
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['produits'] });
      }
    });
}