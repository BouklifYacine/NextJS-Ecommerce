import { useQuery } from "@tanstack/react-query";
import axios from "axios"; 
import { PanierApiResponse } from "../(interfaces-types)/PanierTypes";

export function useGetPanier() {
 
  return useQuery<PanierApiResponse>({
    queryKey: ["Panier"],
    queryFn: async (): Promise<PanierApiResponse> => {
      const reponse = await axios.get<PanierApiResponse>("/api/panier");
      return reponse.data;
    },
  });
}
