import { z } from "zod";

export const AjouterProduits = z.object({
    nom : z.string({message : "Vous devez mettre un nom"}).min(1, {message : "Vous devez mettre un nom"}).max(25, {message : "Maximum 25 caractères"}),
    url : z.string({message : "Vous devez mettre une url"}).min(1, {message : "Vous devez mettre une URL"}), 
    description : z.string({message : "Vous devez mettre une description"}).min(1, {message : "Vous devez mettre une description"}).url({message : "Format d'URL invalide"}),
    prix : z.number({message : "Doit etre un nombre"}).nonnegative(),
    quantiteStock : z.number({message : "Doit etre un nombre"}).int().nonnegative(), 
    categorie : z.enum(["ELECTRONIQUE, INFORMATIQUE, GAMING, MOBILIER"])
    
})