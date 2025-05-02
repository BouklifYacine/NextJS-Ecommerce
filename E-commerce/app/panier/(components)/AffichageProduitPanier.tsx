"use client";

import React from "react";
import { useGetPanier } from "../(hook)/useGetPanier"; 

const AffichageProduitPanier = () => {
  const { data, isLoading, error } = useGetPanier();

  if (isLoading) { return <div className="container mx-auto"><p>Chargement...</p></div>; }

  if (error) { return <div className="container mx-auto"><p>Erreur: {error.message}</p></div>;}

  const produitPanier = data?.panier?.items;

 const prixTotal = produitPanier?.reduce((acc, item) => {
    const totalProduit = item.quantite * item.produit.prix
    return acc + totalProduit
 }, 0)

 

  return (
    <>
      <div className="container mx-auto">
        <h1>Mon Panier</h1>

        <div>
                <p>Prix total du panier : {prixTotal} euros</p>
              </div>
       
        {produitPanier && produitPanier.length > 0 ? (
          produitPanier.map((produit) => (
            <div key={produit.id} style={{ borderBottom: '1px solid #ccc', marginBottom: '10px', paddingBottom: '10px' }}>
              <p><strong>{produit.produit.nom}</strong></p>
              <p>Description: {produit.produit.description}</p>
              <p>Quantité: {produit.quantite}</p>
              <p>Prix unitaire: {produit.produit.prix} €</p>
              <p>Total pour cet article: {produit.quantite * produit.produit.prix} €</p>

          
          
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
