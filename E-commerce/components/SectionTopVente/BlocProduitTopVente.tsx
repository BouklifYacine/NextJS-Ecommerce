import React from "react";

const BlocProduitTopVente = () => {
  return (
    <>
      <div className="flex flex-wrap gap-10 justify-between items-center bg-blue-500 px-20 py-5">
        <div>
          <div className="bg-red-500 rounded-xl w-96 h-96">
            YACINE
            <div className="flex justify-between px-4 ">
              <p className="text-xl">Titre du produit </p>
              <p className="text-xl">$89.99</p>
            </div>
            <div className="flex justify-between px-4">
              <p className="text-xl">Titre du produit </p>
              <p className="text-xl">$89.99</p>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-red-500 rounded-xl w-96 h-96">YACINE</div>
        </div>

        <div>
          <div className="bg-red-500 rounded-xl w-96 h-96">YACINE</div>
        </div>
      </div>
    </>
  );
};

export default BlocProduitTopVente;
