import { z } from "zod";

export const SchemaFavoris = z.object({
    produitId :  z
    .string({ message: "Vous devez mettre un nom" })
    .min(1, { message: "Vous devez mettre un nom" })
    
})