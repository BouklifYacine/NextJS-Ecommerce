import React from "react";
import LogoLiverpool from "@/app/public/Logo_FC_Liverpool.svg.png";
import LogoRealMadrid from "@/app/public/Logo_Real_Madrid.svg.png";
import LogoBarcelone from "@/app/public/Logo_FC_Barcelona.svg.webp";
import LogoManCity from "@/app/public/Logo_Manchester_City_2016.svg";
import LogoBayern from "@/app/public/FC_Bayern_München_logo_(2017).svg.png";
import Nvidiaa from "@/app/public/Nvidia-Logo.wine.svg"
import Image from "next/image";

const FooterMarque = () => {
  
  return (
    <>
      <h2 className="text-center mt-10 text-2xl md:text-5xl font-bold tracking-tighter">
        Ces marques nous font confiance
      </h2>
      <div className="flex flex-wrap justify-center gap-4 md:gap-10 mt-8 pb-8 mx-auto px-4">
        <Image src={LogoLiverpool} alt="Logo Liverpool" width={45} height={45} className="w-[45px] md:w-[60px]" />
        <Image src={LogoManCity} alt="Logo Manchester City" width={45} height={45} className="w-[45px] md:w-[60px]" />
        <Image src={LogoRealMadrid} alt="Logo Real Madrid" width={45} height={45} className="w-[45px] md:w-[60px]" />
        <Image src={LogoBarcelone} alt="Logo Barcelone" width={45} height={45} className="w-[45px] md:w-[60px]" />
        <Image src={LogoBayern} alt="Logo Bayern Munich" width={45} height={45} className="w-[45px] md:w-[60px]" />
        <Image src={Nvidiaa} alt="Logo Arsenal" width={60} className="w-[60px] md:w-[80px]" />
      </div>
    </>
  );
};

export default FooterMarque;