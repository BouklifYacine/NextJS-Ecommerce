import React from "react";
import BlocUnique, { PropsBlocUnique } from "./BlocUnique";

const ProductCard = ({titre,prix,note,NoteAvis,description}: PropsBlocUnique) => {
  return (
    <BlocUnique titre={titre} prix={prix} note={note} NoteAvis={NoteAvis} description={description}/>
  );
};

const BlocProduitTopVente = () => {
  {/* Ici on va fetch la réelle data plus tard ca sera mieux  */ }
  const produits = [
    {
      titre: "Produit Premium",
      prix: 89.99,
      note: 4.5,
      NoteAvis: 24,
      description:
        "Description détaillée du produit avec ses caractéristiques principales.",
    },
    {
      titre: "Produit Premium",
      prix: 89.99,
      note: 4.5,
      NoteAvis: 24,
      description:
        "Description détaillée du produit avec ses caractéristiques principales.",
    },
    {
      titre: "Produit Premium",
      prix: 89.99,
      note: 4.5,
      NoteAvis: 24,
      description:
        "Description détaillée du produit avec ses caractéristiques principales.",
    },
    {
      titre: "Produit Premium",
      prix: 89.99,
      note: 4.5,
      NoteAvis: 24,
      description:
        "Description détaillée du produit avec ses caractéristiques principales.",
    },
    {
      titre: "Produit Premium",
      prix: 89.99,
      note: 4.5,
      NoteAvis: 24,
      description:
        "Description détaillée du produit avec ses caractéristiques principales.",
    },
    {
      titre: "Produit Standard",
      prix: 59.99,
      note: 4,
      NoteAvis: 15,
      description:
        "Version standard de notre best-seller avec un excellent rapport qualité-prix.",
    },
    {
      titre: "Nouveauté",
      prix: 79.99,
      note: 5,
      NoteAvis: 8,
      description: "Notre nouveau produit déjà très apprécié par nos clients.",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-8">
    {produits.map((produit, index) => (
      <div key={index} className="w-full md:w-[45%] lg:w-[30%]">
        <ProductCard {...produit} />
      </div>
    ))}
  </div>
  );
};

export default BlocProduitTopVente;
