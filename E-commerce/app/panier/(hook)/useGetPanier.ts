import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  PanierApiResponse,
  SupprimerPanierResult,
} from "../(interfaces-types)/PanierTypes";
import { SupprimerPanier } from "../(actions)/PanierActions";
import toast from "react-hot-toast";

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

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const previousPanierData =
        queryClient.getQueryData<PanierApiResponse>(queryKey);

      queryClient.setQueryData<PanierApiResponse | undefined>(
        queryKey,
        undefined
      );

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
      queryClient.invalidateQueries({ queryKey });
    },

    onSuccess: (data) => {
      toast.success(data.message);
    },
  });
}
