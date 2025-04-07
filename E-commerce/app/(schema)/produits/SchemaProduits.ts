import { z } from "zod";

const SchemaImage = z.object({
  urlImage: z.string().url({ message: "URL d'image invalide" }),
  principale: z.boolean().default(false).optional(),
  ordre: z.number().int().nonnegative().default(0).optional()
});

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
  
  images: z
  .array(SchemaImage)
  .min(1, { message: "Vous devez ajouter au moins une image pour ce produit" }).max(4, { message: "Vous pouvez ajouter que 4 images au maximum" })
  .or(
    z.undefined().transform(() => {
      throw new Error("Vous devez ajouter au moins une image pour ce produit");
    })
  )
});