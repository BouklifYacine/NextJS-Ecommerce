import React from "react";
import FooterReseauxsociaux from "./FooterReseauxsociaux";
import Image from "next/image";
import Paypal from "@/app/public/paypal-icon-logo-svgrepo-com.svg"
import ApplePay from "@/app/public/apple-pay-logo-svgrepo-com.svg"
import Mastercard from "@/app/public/mastercard-2-logo-svgrepo-com.svg"
import Visa from "@/app/public/visa-logo-svgrepo-com.svg"


const Footer = () => {
  return (
    <>
      <div className="bg-sky-500 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="flex flex-col items-center md:items-start">
              <h2 className="text-lg md:text-xl font-medium border-b-2 border-white mb-3 md:mb-4">
                Qui sommes nous?
              </h2>
              <p className="text-sm md:text-base mb-1 md:mb-2">Notre histoire</p> 
              <p className="text-sm md:text-base mb-1 md:mb-2">Mentions légale</p> 
              <p className="text-sm md:text-base mb-1 md:mb-2">CGV / Avis client</p> 
              <p className="text-sm md:text-base mb-1 md:mb-2">Données personnelles et cookies</p> 
              <p className="text-sm md:text-base">Gérer mes cookies</p> 
            </div>
          
            <div className="flex flex-col items-center md:items-start">
              <h2 className="text-lg md:text-xl font-medium border-b-2 border-white mb-3 md:mb-4">
                Besoin d&apos;aide?
              </h2>
              <p className="text-sm md:text-base mb-1 md:mb-2">Les retours</p>
              <p className="text-sm md:text-base mb-1 md:mb-2">Service client</p>
              <p className="text-sm md:text-base mb-1 md:mb-2">Avis</p>
              <p className="text-sm md:text-base">Nous contacter</p>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <h2 className="text-lg md:text-xl font-medium border-b-2 border-white mb-3 md:mb-4">
                Paiement
              </h2>
              <p className="text-sm md:text-base mb-1 md:mb-2">3x sans frais</p>
              <p className="text-sm md:text-base mb-1 md:mb-2">Retour et remboursement</p>
              <p className="text-sm md:text-base mb-1 md:mb-2">Payement sécurisé</p>
              <p className="text-sm md:text-base mb-1 md:mb-2">Moyens de payement</p> 
              <div className="flex gap-4 flex-wrap mt-3 justify-center md:justify-start">
                <Image src={Visa} alt="Visa" width={40} className="w-[30px] md:w-[40px]" />
                <Image src={ApplePay} alt="ApplePay" width={40} className="w-[30px] md:w-[40px]" />
                <Image src={Paypal} alt="Paypal" width={40} className="w-[30px] md:w-[40px]" />
                <Image src={Mastercard} alt="Mastercard" width={40} className="w-[30px] md:w-[40px]" />
              </div>
            </div>
          </div>
          
          <div className="mt-8 md:mt-12 border-t border-white pt-6">
            <FooterReseauxsociaux />
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;