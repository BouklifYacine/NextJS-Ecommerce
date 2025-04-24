import React from "react";
import FooterMarque from "./FooterMarque";

const Footer = () => {
  return (
    <>
      <div className="bg-gray-400 text-red-500">
        <div className="container mx-auto">
          <div className="flex justify-between">
            <div className=" flex  flex-col items-center">
              {" "}
              <p>Yacine </p> 
              <p>Salah</p>{" "}
            </div>
            <div className="flex flex-col items-center">
                <p>Yacine</p>
                <p>Norhane</p>
            </div>
            <div className="flex flex-col items-center">
                <p>Yacine</p>
                <p>Norhane</p>
            </div>
          </div>
          <FooterMarque></FooterMarque>
        </div>
      </div>
    </>
  );
};

export default Footer;
