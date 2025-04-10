import { reponseApiProduit } from "@/app/api/admin/produits/(interface-types)/interface";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useProduits() {
    return useQuery<reponseApiProduit[]>({  
        queryKey: ['produits'],
        queryFn: async () => {
            const response = await axios.get<{ produits: reponseApiProduit[] }>("/api/admin/produits");
            return response.data.produits; 
        }
    });
}