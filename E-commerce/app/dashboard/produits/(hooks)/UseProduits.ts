import { reponseApiProduit } from "@/app/api/admin/produits/(interface-types)/interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { ajouterProduit, ModifierProduit, supprimerProduit } from "../(actions)/ActionProduit";

export function useProduits() {
  return useQuery<reponseApiProduit[]>({
    queryKey: ["produits"],
    queryFn: async () => {
      const response = await axios.get<{ produits: reponseApiProduit[] }>(
        "/api/admin/produits"
      );
      return response.data.produits;
    },
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
      await queryClient.cancelQueries({ queryKey: ["produits"] });
      const anciensProduits = queryClient.getQueryData(["produits"]);

      queryClient.setQueryData(
        ["produits"],
        (listeActuelle: reponseApiProduit[]) =>
          listeActuelle.filter((produit) => produit.id !== produitId)
      );

      return { anciensProduits };
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erreur lors de la suppression du produit");
    },
    onSuccess: (data) => {
      toast.dismiss();
      if (data.success) {
        toast.success(data.message || "Produit modifié avec succès");
      } else {
        // En cas d'échec côté serveur, on revient à l'état précédent
        toast.error(data.message || "Échec de la modification du produit");
        queryClient.invalidateQueries({ queryKey: ["produits"] });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["produits"] });
    },
  });
}

export function useAjouterProduit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: reponseApiProduit) => {
      const result = await ajouterProduit(data);
      return result;
    },

    onMutate: () => {
      toast.loading("Création du produit en cours ... ");
    },

    onSuccess: (data) => {
      toast.dismiss();
      if(data.success){
        toast.success(data.message)
        queryClient.invalidateQueries({queryKey: ["produits"]})
      }
      else {
        toast.error(data.message || "Echec de l'ajout du produit")
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["produits"] });
    },
  });
}

export function useModifierProduit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: reponseApiProduit }) => {
      const result = await ModifierProduit(id, data);
      return result;
    },

    onMutate: async ({ id, data }) => {
      // Annuler les requêtes en cours pour éviter les écrasements
      await queryClient.cancelQueries({ queryKey: ["produits"] });
      
      const anciensProduits = queryClient.getQueryData<reponseApiProduit[]>(["produits"]);
      
      // Mise à jour optimiste
      queryClient.setQueryData<reponseApiProduit[]>(["produits"], (produitsActuels) => {
        if (!produitsActuels) return [data];
        
        return produitsActuels.map(produit => 
          produit.id === id ? { ...data, id } : produit
        );
      });
      
      toast.loading("Modification du produit en cours...");
      
      return { anciensProduits };
    },

    onSuccess: (data) => {
      toast.dismiss();
      if (data.success) {
        toast.success(data.message || "Produit modifié avec succès");
      } else {
        // En cas d'échec côté serveur, on revient à l'état précédent
        toast.error(data.message || "Échec de la modification du produit");
        queryClient.invalidateQueries({ queryKey: ["produits"] });
      }
    },

    // Pour gérer l'optimistic update
    onError: (error, variables, context) => {
      toast.dismiss();
      toast.error(error instanceof Error ? error.message : "Erreur lors de la modification du produit");
      
      if (context?.anciensProduits) {
        queryClient.setQueryData(["produits"], context.anciensProduits);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["produits"] });
    },
  });
}