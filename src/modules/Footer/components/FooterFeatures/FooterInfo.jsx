import React from "react";
import { Logo } from "../../../../shared/ui/Logo";
import { Brand } from "../../../../shared/ui/Brand";

export const FooterInfo =()=>{
    return(
        <div className="md:col-span-2">
          <div className="flex items-center mb-4">
            <Logo/>
            <Brand />
          </div>
          <p className="text-gray-400 text-sm">
          The world of digital art, where everyone can find something new for themselves.
           A platform for artists who create universes and worlds.
          </p>
        </div>
    )
}