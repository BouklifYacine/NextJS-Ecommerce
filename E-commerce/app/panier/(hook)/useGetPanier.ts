import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  PanierApiResponse,
  SupprimerPanierResult,
} from "../(interfaces-types)/PanierTypes";
import { AjouterAuPanier, SupprimerArticlePanier, SupprimerPanier } from "../(actions)/PanierActions";
import toast from "react-hot-toast";

type Variables = { produitId: string; quantite: number }
type Result = { success: boolean; message: string }

type PanierItem = { produitId: string; quantite: number }
type PanierCache = { panier: { items: PanierItem[] } }

export function useAjouterAuPanier() {
  const queryClient = useQueryClient()
  const queryKey = ["Panier"]

  return useMutation<
    Result,
    Error,
    Variables,
    { previousData?: PanierCache }
  >({
    mutationFn: async ({ produitId, quantite }) => {
      const res = await AjouterAuPanier(produitId, quantite)
      if (!res.success) throw new Error(res.message)
      return res
    },

    onMutate: async ({ produitId, quantite }) => {
      await queryClient.cancelQueries({ queryKey })
      const previousData = queryClient.getQueryData<PanierCache>(queryKey)

      const oldItems = previousData?.panier.items ?? []
      const exists = oldItems.find((i) => i.produitId === produitId)
      const newItems = exists
        ? oldItems.map((i) =>
            i.produitId === produitId
              ? { ...i, quantite: i.quantite + quantite }
              : i
          )
        : [...oldItems, { produitId, quantite }]

      queryClient.setQueryData<PanierCache>(queryKey, {
        panier: { items: newItems },
      })

      return { previousData }
    },

    onError: (err, _vars, ctx) => {
      toast.error(err.message)
      if (ctx?.previousData) {
        queryClient.setQueryData(queryKey, ctx.previousData)
      }
    },

    onSuccess: (data) => {
      toast.success(data.message)
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })
}

export function useGetPanier() {
  return useQuery<PanierApiResponse>({
    queryKey: ["Panier"],
    queryFn: async (): Promise<PanierApiResponse> => {
      const reponse = await axios.get<PanierApiResponse>("/api/panier");
      return reponse.data;
    },
  });
}

export function useSupprimerPanier() {
  const queryClient = useQueryClient();
  const queryKey = ["Panier"];
  
  return useMutation<
    SupprimerPanierResult,
    Error,
    string,
    { previousPanierData?: PanierApiResponse }
  >({
    mutationFn: async (panierId: string): Promise<SupprimerPanierResult> => {
      const result = await SupprimerPanier(panierId);
      if (!result.success) {
        throw new Error(result.message || "La suppression du panier a échoué.");
      }
      return result;
    },
    
    onMutate: async (panierId) => {
      
      await queryClient.cancelQueries({ queryKey });
      
      const previousPanierData = 
        queryClient.getQueryData<PanierApiResponse>(queryKey);
      
      if (previousPanierData && previousPanierData.panier) {
        queryClient.setQueryData<PanierApiResponse>(queryKey, {
          ...previousPanierData,
          panier: {
            ...previousPanierData.panier,
            items: [] 
          }
        });
      }
      
      return { previousPanierData };
    },
    
    onError: (error, variables, context) => {
      toast.error(`Erreur: ${error.message}`);
      
      if (context?.previousPanierData) {
        queryClient.setQueryData(queryKey, context.previousPanierData);
        console.log("Cache restauré après erreur.");
      }
    },
    
    onSettled: () => {
      // Rafraîchir les données après la mutation
      queryClient.invalidateQueries({ queryKey });
    },
    
    onSuccess: (data) => {
      toast.success(data.message);
    },
  });
}

export function useSupprimerArticlePanier() {
  const queryClient = useQueryClient();
  const queryKey = ["Panier"];
  
  return useMutation<
    SupprimerPanierResult,
    Error,
    string,
    { 
      previousPanierData?: PanierApiResponse;
      articleId: string;
    }
  >({
    mutationFn: async (articleId: string): Promise<SupprimerPanierResult> => {
      const result = await SupprimerArticlePanier(articleId);
      
      if (!result.success) {
        throw new Error(result.message || "La suppression de l'article a échoué.");
      }
      
      return result
    },
    
    onMutate: async (articleId) => {
      await queryClient.cancelQueries({ queryKey });
      
      const previousPanierData = 
        queryClient.getQueryData<PanierApiResponse>(queryKey);
      
      if (previousPanierData?.panier.items) {
        queryClient.setQueryData<PanierApiResponse>(queryKey, {
          ...previousPanierData,
          panier: {
            ...previousPanierData.panier,
            items: previousPanierData.panier.items.filter(
              item => item.produitId !== articleId
            )
          }
        });
      }
      
      return { 
        previousPanierData,
        articleId 
      };
    },
    
    onError: (error, variables, context) => {
      toast.error(`Erreur: ${error.message}`);
      
      if (context?.previousPanierData) {
        queryClient.setQueryData(queryKey, context.previousPanierData);
      }
    },
    
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
    
    onSuccess: (data) => {
      toast.success(data.message);
      
      if (data.message.includes("Panier supprimé")) {
        queryClient.setQueryData<PanierApiResponse>(queryKey, {
          panier: {
            id: "",
            userId: "",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            items: []
          }
        });
      }
    },
  });
}
