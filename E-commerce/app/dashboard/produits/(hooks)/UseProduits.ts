import { reponseApiProduit } from "@/app/api/admin/produits/(interface-types)/interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export function useProduits() {
    return useQuery<reponseApiProduit[]>({  
        queryKey: ['produits'],
        queryFn: async () => {
            const response = await axios.get<{ produits: reponseApiProduit[] }>("/api/admin/produits");
            return response.data.produits; 
        }
    });
}


export function useSupprimerProduits(){
    const QueryClient = useQueryClient()

    return useMutation({
        mutationFn : async (produitId : string) => {
            const response = await axios.delete(`/api/admin/produits/${produitId}`)
            return response.data
        },
        onMutate: async (produitId) => {
            await QueryClient.cancelQueries({ queryKey: ['produits'] });
            
            const AnciensProduits = QueryClient.getQueryData(['produits']);
            QueryClient.setQueryData(['produits'], (ListeActuelle : reponseApiProduit[]) => 
                ListeActuelle.filter(produit => produit.id !== produitId)
            );
            return { AnciensProduits };
          },
        
        onSettled: () => {
            QueryClient.invalidateQueries({ queryKey: ['produits'] });
          },
        onSuccess : () => {
            toast.success("Produit supprimé avec succès")
        }
    })

}