import React from 'react'
import LogoManCity from "@/app/public/Logo_Manchester_City_2016.svg";
import Nvidiaa from "@/app/public/Nvidia-Logo.wine.svg"
import Snapchat from "@/app/public/snapchat-logo-svgrepo-com.svg"
import Youtube from "@/app/public/youtube-icon-logo-svgrepo-com.svg"
import Twitter from "@/app/public/twitter-3-logo-svgrepo-com.svg"
import Instagram from "@/app/public/instagram-2-1-logo-svgrepo-com.svg"
import Tiktok from "@/app/public/tiktok-logo-logo-svgrepo-com.svg"
import Whatsapp from "@/app/public/whatsapp-icon-logo-svgrepo-com.svg"

import Image from "next/image";

const FooterReseauxsociaux = () => {
  return (
    <>
<h2 className='text-center text-xl md:text-3xl tracking-tight font-medium'>Nos Réseaux Sociaux </h2>
    <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-4 pb-8 mx-auto px-4">

        <Image src={Snapchat} alt="Logo Manchester City" width={40}  className="w-[30px] md:w-[40px]" />
        <Image src={Youtube} alt="Logo Manchester City" width={40}   className="w-[30px] md:w-[40px]" />
        <Image src={Twitter} alt="Logo Manchester City" width={40}   className="w-[30px] md:w-[40px]" />
        <Image src={Instagram} alt="Logo Manchester City" width={40}   className="w-[30px] md:w-[40px]" />
        <Image src={Tiktok} alt="Logo Manchester City" width={40}   className="w-[30px] md:w-[40px]" />
        <Image src={Whatsapp} alt="Logo Bayern Munich" width={40}   className="w-[30px] md:w-[40px]" />

      </div>

    </>
  )
}

export default FooterReseauxsociaux