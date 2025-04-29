import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProduitFiltersState {
  recherche: string;
  setRecherche: (valeur: string) => void;

  promotion: boolean;
  setPromotion: (valeur: boolean) => void;

  categorie: string;
  setCategorie: (valeur: string) => void;

  stock: string;
  setStock: (valeur: string) => void;

  triPrix: string;
  setTriPrix: (valeur: string) => void;
}

export const StoreFiltreProduit = create<ProduitFiltersState>()(
  persist(
    (set) => ({
      recherche: "",
      setRecherche: (valeur) => set({ recherche: valeur }),

      promotion: false,
      setPromotion: (valeur) => set({ promotion: valeur }),

      categorie: "tous",
      setCategorie: (valeur) => set({ categorie: valeur }),

      stock: "all",
      setStock: (valeur) => set({ stock: valeur }),

      triPrix: "default",
      setTriPrix: (valeur) => set({ triPrix: valeur }),
    }),
    {
      name: "produit-filters", // clé du localStorage
    }
  )
);
