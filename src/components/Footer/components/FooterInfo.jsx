import React from "react";
import { Logo } from "../../Header/ui/Logo";
import { HeaderBrand } from "../../Header/ui/HeaderBrand";

export const FooterInfo =()=>{
    return(
        <div className="md:col-span-2">
          <div className="flex items-center mb-4">
            <Logo/>
            <HeaderBrand />
          </div>
          <p className="text-gray-400 text-sm">
          The world of digital art, where everyone can find something new for themselves.
           A platform for artists who create universes and worlds.
          </p>
        </div>
    )
}