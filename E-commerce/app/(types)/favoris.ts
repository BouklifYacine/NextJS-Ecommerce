export interface Produit {
    id: string
    nom: string
  }
  
  export interface Favori {
    userId: string
    produitId: string
    produit: Produit
  }
  