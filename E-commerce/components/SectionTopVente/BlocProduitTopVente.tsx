import React from "react";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

const BlocProduitTopVente = () => {
  return (
    <>
      <div className="flex flex-wrap gap-10 justify-between items-center bg-blue-500 px-20 py-5">
        <div>
          <div className="bg-red-500 rounded-xl w-96 h-96">
            YACINE
            <div className="flex justify-between items-center px-4 ">
              <p className="text-xl">Titre du produits </p>
              <p className="text-xl">$89.990</p>
            </div>
            <div className="flex justify-between items-center px-4">
              <p className="text-xl">Titre du produittt </p>
              <div className="flex items-center gap-4">
              <Rating
  value={4}
  precision={1}  // Active les demi-étoiles
  max={5}
  size="medium"
  readOnly // Pas de hover effet sur les ratings 
/>
    
  
    <span>(2)</span>
              </div>
              
          
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
