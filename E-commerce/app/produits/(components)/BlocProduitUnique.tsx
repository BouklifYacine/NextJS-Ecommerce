// src/components/BlocProduitUnique.tsx
import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MoveLeft, ShoppingCart } from "lucide-react"
import toast from "react-hot-toast"
import { useAjouterAuPanier } from "@/app/panier/(hook)/useGetPanier"

interface Props {
  id?: string
  prix?: number
  prixPromo?: number | null
  description?: string
  nom?: string
  stock?: number
  image?: string
  categorie?: string
}

const calculerPromo = (prix: number, prixPromo: number) =>
  Math.round(((prix - prixPromo) / prix) * 100)

export default function BlocProduitUnique({
  id,
  prix,
  description,
  nom,
  stock,
  prixPromo,
  image,
  categorie,
}: Props) {
  const [quantite, setQuantite] = useState(1)
  const { mutate: ajouter, isPending } = useAjouterAuPanier()

  const AjouterProduit = () => {
    if (!id) {
      toast.error("Produit non défini")
      return
    }
    if (quantite <= 0) {
      toast.error("Veuillez sélectionner au moins 1 article")
      return
    }
    ajouter({ produitId: id, quantite })
  }

  return (
    <div className="min-h-screen">
      <div className="p-4 md:p-6">
        <Link href="/">
          <Button
            variant="outline"
            className="p-5 text-lg gap-2 bg-black text-white hover:bg-black hover:text-white"
          >
            <MoveLeft />
            Retour
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 p-4 md:p-16">
        {/* Image */}
        <div className="flex-1 w-full max-w-[500px]">
          <div className="rounded-2xl overflow-hidden aspect-square relative">
            <Image
              src={image || "/placeholder.png"}
              alt={nom || "Produit"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Détails & actions */}
        <div className="flex-1 w-full max-w-[500px] flex flex-col justify-center gap-4 md:gap-6">
          <p className="text-sky-500 font-bold uppercase text-lg">
            {categorie}
          </p>
          <h1 className="text-3xl md:text-5xl font-bold">{nom}</h1>
          <p className="text-gray-600 leading-relaxed text-base md:text-lg">
            {description}
          </p>

          {/* Prix */}
          <div className="flex items-center gap-4 flex-wrap">
            {prixPromo != null ? (
              <div className="flex items-center gap-4">
                <span className="text-2xl md:text-3xl font-bold text-sky-500">
                  ${prixPromo.toFixed(2)}
                </span>
                <span className="text-xl line-through text-gray-400">
                  ${prix?.toFixed(2)}
                </span>
                {prix && (
                  <span className="bg-green-400 text-black px-2 py-2 rounded-md text-sm">
                    -{calculerPromo(prix, prixPromo)}%
                  </span>
                )}
              </div>
            ) : (
              <span className="text-2xl md:text-3xl font-bold">
                ${prix?.toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex gap-4 md:gap-8 items-center flex-wrap">
            {/* Contrôle de quantité */}
            <div className="flex items-center gap-4 bg-gray-100 p-2 rounded-lg">
              <Button
                className="h-10 w-10 p-2"
                disabled={quantite <= 1}
                onClick={() => setQuantite((q) => q - 1)}
              >
                -
              </Button>

              <input
                type="number"
                min={1}
                value={quantite}
                onChange={(e) =>
                  setQuantite(Math.max(1, Number(e.target.value) || 1))
                }
                className="w-12 text-center bg-transparent border-none outline-none"
              />

              <Button
                className="h-10 w-10 p-2"
                onClick={() => setQuantite((q) => q + 1)}
              >
                +
              </Button>
            </div>

            {/* Bouton ajouter */}
            <Button
              className="flex-1 bg-sky-500 hover:bg-sky-600 py-7 gap-3 text-lg"
              onClick={AjouterProduit}
              disabled={isPending}
            >
              {isPending ? (
                "Ajout..."
              ) : (
                <>
                  <ShoppingCart />
                  Ajouter au panier
                </>
              )}
            </Button>
          </div>

          {/* Stock */}
          {stock != null && (
            <p className="text-lg text-gray-500 font-bold">
              {stock > 10
                ? "En stock"
                : `Derniers ${stock} disponibles`}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
