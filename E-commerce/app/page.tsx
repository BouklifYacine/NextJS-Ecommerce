import Footer from "@/components/FooterComponents/Footer";
import Header from "@/components/header";
import Filtres from "@/components/MainPage/Filtres";
import BlocProduitSite from "@/components/SectionTopVente/BlocProduitSite";
import BlocProduitTopVente from "@/components/SectionTopVente/BlocProduitTopVente";
import TitreTopVente from "@/components/SectionTopVente/Titre";

export default function Home() {
  return (
    <>
    <Header></Header>
    <section className="bg-gray-50 py-12"> 
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <TitreTopVente />
        <BlocProduitTopVente />
        <h1 className='text-2xl md:text-7xl text-center pt-40 pb-16 font-bold tracking-tighter'>Tout nos produits </h1>
        <Filtres></Filtres>
        <BlocProduitSite></BlocProduitSite>
      </div>
    </section>
    <Footer></Footer>
    </>
  );
}
