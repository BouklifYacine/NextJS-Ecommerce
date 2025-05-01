import { Button } from "@/components/ui/button";
import { MoveLeft, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface Props {
  id: string | undefined;
  prix: number | undefined;
  prixPromo?: number | null;
  description: string | undefined;
  nom: string | undefined;
  stock: number | undefined;
  image: string | undefined;
  categorie: string | undefined;
}


const calculerPromo = (prix: number, prixPromo: number) => {
  return Math.round(((prix - prixPromo) / prix) * 100);
};

const BlocProduitUnique = ({
  id,
  prix,
  description,
  nom,
  stock,
  prixPromo,
  image,
  categorie,
}: Props) => {
  const [quantite, setQuantite] = useState(0);

  return (
    <div className="min-h-screen">
      <div className="p-4 md:p-6">
        <Link href="/landingpage">
          <Button className="p-5 text-lg gap-2 bg-black text-white hover:bg-black hover:text-white" variant="outline">
          <MoveLeft />
            Retour
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 p-4 md:p-16">
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

        <div className="flex-1 w-full max-w-[500px] flex flex-col justify-center gap-4 md:gap-6">
          <p className="text-sky-500 font-bold uppercase text-lg">{categorie}</p>
          <h1 className="text-3xl md:text-5xl font-bold">{nom}</h1>
          <p className="text-gray-600 leading-relaxed text-base md:text-lg">
            {description}
          </p>

          <div className="flex items-center gap-4 flex-wrap">
            {prixPromo && (
              <div className="flex items-center gap-4">
                <span className="text-2xl md:text-3xl font-bold text-sky-500">
                  ${prixPromo.toFixed(2)}
                </span>
                <span className="text-xl line-through text-gray-400">
                  ${prix?.toFixed(2)}
                </span>
                {prixPromo && prix && (
                  <span className="bg-green-400 text-black px-2 py-2 rounded-md text-sm">
                    -{calculerPromo(prix, prixPromo)}%
                  </span>
                )}
              </div>
            )}
            {!prixPromo && (
              <span className="text-2xl md:text-3xl font-bold">
                ${prix?.toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex gap-4 md:gap-8 items-center flex-wrap">
            <div className="flex items-center gap-4 bg-gray-100 p-2 rounded-lg">
              <Button
                className="h-10 w-10 p-2"
                onClick={() => setQuantite(Math.max(0, quantite - 1))}
              >
                -
              </Button>
              <span className="min-w-[20px] text-center">{quantite}</span>
              <Button
                className="h-10 w-10 p-2"
                onClick={() => setQuantite(quantite + 1)}
              >
                +
              </Button>
            </div>

            <Button className="flex-1 bg-sky-500 hover:bg-sky-600 py-7 gap-3 text-lg">
            <ShoppingCart style={{ width: '34px', height: '34px' }}   />
              <span>Ajouter au panier</span>
            </Button>
          </div>

          {stock && (
            <p className="text-lg text-gray-500 font-bold">
              {stock > 10 ? "En stock" : `Derniers ${stock} disponibles`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlocProduitUnique;