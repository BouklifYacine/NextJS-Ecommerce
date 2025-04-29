import { create } from "zustand";
import { persist } from "zustand/middleware";

export type EnumsStock = "all" | "faible" | "moyen" | "excellent";
export type EnumCategorie = "tous" | "ELECTRONIQUE" | "INFORMATIQUE" | "GAMING" | "MOBILIER";
export type enumTri = "default" | "croissant" | "decroissant";

interface FiltreProduitState {
  recherche: string;
  setRecherche: (val: string) => void;
  promotion: boolean;
  setPromotion: (val: boolean) => void;
  categorie: EnumCategorie;
  setCategorie: (val: EnumCategorie) => void;
  stock: EnumsStock;
  setStock: (val: EnumsStock) => void;
  triPrix: enumTri;
  setTriPrix: (val: enumTri) => void;
}

export const StoreFiltreProduit = create<FiltreProduitState>()(
  persist(
    (set) => ({
      recherche: "",
      setRecherche: (val) => set({ recherche: val }),
      promotion: false,
      setPromotion: (val) => set({ promotion: val }),
      categorie: "tous",
      setCategorie: (val) => set({ categorie: val }),
      stock: "all",
      setStock: (val) => set({ stock: val }),
      triPrix: "default",
      setTriPrix: (val) => set({ triPrix: val }),
    }),
    { name: "filtre-produit" }
  )
);
