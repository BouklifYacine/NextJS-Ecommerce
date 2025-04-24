import React from "react";
import LogoLiverpool from "@/app/public/Logo_FC_Liverpool.svg.png";
import LogoRealMadrid from "@/app/public/Logo_Real_Madrid.svg.png";
import LogoBarcelone from "@/app/public/Logo_FC_Barcelona.svg.webp";
import LogoManCity from "@/app/public/Logo_Manchester_City_2016.svg";
import LogoBayern from "@/app/public/FC_Bayern_München_logo_(2017).svg.png";
import LogoArsenal from "@/app/public/Arsenal_FC.svg.webp";
import Image from "next/image";

const FooterMarque = () => {
  
  return (
    <>
      <h2 className="text-center mt-10 text-xl md:text-3xl font-bold tracking-tighter">
        Ces marques nous font confiance
      </h2>
      <div className="flex flex-wrap justify-center gap-4 md:gap-10 mt-4 pb-8 mx-auto px-4">
        <Image src={LogoLiverpool} alt="Logo Liverpool" width={40} height={40} className="w-[40px] md:w-[50px]" />
        <Image src={LogoManCity} alt="Logo Manchester City" width={40} height={40} className="w-[40px] md:w-[60px]" />
        <Image src={LogoRealMadrid} alt="Logo Real Madrid" width={40} height={40} className="w-[40px] md:w-[50px]" />
        <Image src={LogoBarcelone} alt="Logo Barcelone" width={40} height={40} className="w-[40px] md:w-[50px]" />
        <Image src={LogoBayern} alt="Logo Bayern Munich" width={40} height={40} className="w-[40px] md:w-[50px]" />
        <Image src={LogoArsenal} alt="Logo Arsenal" width={40} height={40} className="w-[40px] md:w-[50px]" />
      </div>
    </>
  );
};

export default FooterMarque;