import React from 'react'
import LogoManCity from "@/app/public/Logo_Manchester_City_2016.svg";
import LogoBayern from "@/app/public/FC_Bayern_München_logo_(2017).svg.png";
import LogoArsenal from "@/app/public/Arsenal_FC.svg.webp";
import Youtube from "@/app/public/png-logo-youtube.webp"
import Twitter from "@/app/public/Logo_of_Twitter.svg.png"
import Instagram from "@/app/public/Instagram_logo_2022.svg.webp"
import Nvidia from '@/app/public/Nvidia_(logo).svg.png'
import Nvidiaa from "@/app/public/Nvidia-Logo.wine.svg"
import Image from "next/image";

const FooterReseauxsociaux = () => {
  return (
    <>
    
 

        <h2> Nos réseaux sociaux </h2>
    <div className="flex flex-wrap justify-center gap-4 md:gap-10 mt-4 pb-8 mx-auto px-4">
        <Image src={Youtube} alt="Logo Liverpool" width={40} height={40} className="w-[40px] md:w-[50px]" />
        <Image src={LogoManCity} alt="Logo Manchester City" width={40} height={40} className="w-[40px] md:w-[60px]" />
        <Image src={Twitter} alt="Logo Real Madrid" width={40} height={40} className="w-[40px] md:w-[50px]" />
        <Image src={Instagram} alt="Logo Barcelone" width={40} height={40} className="w-[40px] md:w-[50px]" />
        <Image src={Nvidia} alt="Logo Bayern Munich" width={40} height={40} className="w-[40px] md:w-[50px]" />
        <Image src={Nvidiaa} alt="Logo Bayern Munich" width={40} height={40} className="w-[40px] md:w-[50px]" />
        <Image src={LogoArsenal} alt="Logo Arsenal" width={40} height={40} className="w-[40px] md:w-[50px]" />
      </div>

    </>
  )
}

export default FooterReseauxsociaux