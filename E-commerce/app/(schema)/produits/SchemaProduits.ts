import { z } from "zod";

export const SchemaAjouterProduits = z.object({
  nom: z
    .string({ message: "Vous devez mettre un nom" })
    .min(1, { message: "Vous devez mettre un nom" })
    .max(25, { message: "Maximum 25 caractères" }),

  description: z
    .string({ message: "Vous devez mettre une description" })
    .min(1, { message: "Vous devez mettre une description" })
    .max(500, { message: "Maximum 500 caractères" }),

  prix: z.number({ message: "Doit être un nombre" }).nonnegative(),
  prixPromo: z.number({ message: "Doit être un nombre" }).nonnegative().nullable().optional(),

  quantiteStock: z
    .number({ message: "Doit être un nombre" })
    .int()
    .nonnegative(),
  categorie: z.enum(["ELECTRONIQUE", "INFORMATIQUE", "GAMING", "MOBILIER"]),
  image: z.object({
    urlImage: z.string().url({ message: "URL d'image invalide" }),
    publicId: z.string().min(1, { message: "ID public requis" })
  }).refine(data => data.urlImage, {
    message: "Vous devez ajouter une image pour ce produit",
  })
});