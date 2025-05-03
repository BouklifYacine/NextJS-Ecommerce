"use client";

import React from "react";
import { useGetPanier, useSupprimerArticlePanier, useSupprimerPanier } from "../(hook)/useGetPanier";
import { Trash2 } from "lucide-react";

const AffichageProduitPanier = () => {
  const { data, isLoading } = useGetPanier();
  const {mutate , isPending} = useSupprimerPanier()
  const {mutate : supprimerArticle, isPending: Pending} = useSupprimerArticlePanier()

  if (isLoading) {
    return (
      <div className="container mx-auto">
        <p>Chargement...</p>
      </div>
    );
  }

  const produitPanier = data?.panier?.items;
  const PanierId = data?.panier.id
 

  const supprimerPanier = () => {
    mutate(PanierId!)
  }



  const prixTotal = produitPanier?.reduce((acc, item) => {
    const totalProduit = item.quantite * item.produit.prix;
    return acc + totalProduit;
  }, 0);

  const prixHorsTaxe = prixTotal ? prixTotal / 1.2 : 0;

  return (
    <>
      <div className="container mx-auto">
        <h1>Mon Panier</h1>

<button onClick={supprimerPanier}  disabled={isPending}>  <Trash2 className={`${isPending ? "text-red-500 opacity-50" : "text-red-500"} cursor-pointer`} size={44}></Trash2></button>
      

        <div>
          <p>Prix total du panier : {prixTotal ? prixTotal.toFixed(2) : 0 } €</p>
          <p>Prix hors taxe : {prixHorsTaxe.toFixed(2)} €</p>
        </div>

        {produitPanier && produitPanier.length > 0 ? (
          produitPanier.map((item) => (
            <div
              key={item.id}
              style={{
                borderBottom: "1px solid #ccc",
                marginBottom: "10px",
                paddingBottom: "10px",
              }}
            >
              <p>
                <strong>{item.produit.nom}</strong>
              </p>
              <p>Description: {item.produit.description}</p>
              <p>Quantité: {item.quantite}</p>
              <p>Prix unitaire: {item.produit.prix} €</p>
              <p>
                Total pour cet article:{" "}
                {item.quantite * item.produit.prix} €
              </p>
        
<button onClick={() => supprimerArticle(item.produit.id)}  disabled={Pending}>  <Trash2 className={`${Pending ? "text-red-500 opacity-50" : "text-red-500"} cursor-pointer`} size={44}></Trash2></button>
            </div>
          ))
        ) : (
          <p>Votre panier est vide.</p>
        )}
      </div>
    </>
  );
};

export default AffichageProduitPanier;
