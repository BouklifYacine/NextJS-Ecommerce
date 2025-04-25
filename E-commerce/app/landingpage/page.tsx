import Filtres from '@/components/MainPage/Filtres';
import BlocProduitTopVente from '@/components/SectionTopVente/BlocProduitTopVente';
import TitreTopVente from '@/components/SectionTopVente/Titre';
import React from 'react';

const LandingPage = () => {
  return (
    <section className="bg-gray-50 py-12"> {/* Fond plus doux */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <TitreTopVente />
        <BlocProduitTopVente />
        <Filtres></Filtres>
      </div>
    </section>
  );
};

export default LandingPage;