import { z } from "zod";

export const SchemaPanier = z.object({
    produitId :  z
    .string({ message: "Vous devez mettre un nom" })
    .min(1, { message: "Vous devez mettre un nom" }), 
    quantite : z.number().min(1,{ message: "Vous devez mettre un produit" }).max(1,{ message: "Vous devez mettre max un produit" })
    
})