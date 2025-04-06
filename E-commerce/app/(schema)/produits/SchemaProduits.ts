import { z } from "zod";

export const SchemaAjouterProduits = z.object({
    nom: z.string({message: "Vous devez mettre un nom"})
        .min(1, {message: "Vous devez mettre un nom"})
        .max(25, {message: "Maximum 25 caractères"}),
    
    url: z.string({message: "Vous devez mettre une url"})
        .min(1, {message: "Vous devez mettre une URL"})
        .url({message: "Format d'URL invalide"}), 
    
    description: z.string({message: "Vous devez mettre une description"})
        .min(1, {message: "Vous devez mettre une description"})
        .max(500, {message: "Maximum 500 caractères"}),
    
    prix: z.number({message: "Doit être un nombre"})
        .nonnegative(),
    
    quantiteStock: z.number({message: "Doit être un nombre"})
        .int()
        .nonnegative(), 
    
    categorie: z.enum(["ELECTRONIQUE", "INFORMATIQUE", "GAMING", "MOBILIER"])
});