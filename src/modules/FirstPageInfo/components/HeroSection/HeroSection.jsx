import React from "react";
import { Logo } from "../../../../shared/ui/Logo";
import { Brand } from "../../../../shared/ui/Brand";
import { FirstNavBtn } from "../../ui/FirstNavBtn";
import { MainVideo } from "../../ui/MainVideo";

export const HeroSection=()=>{
    return(
        <div className="relative h-screen">
          <MainVideo/>
        <div className="absolute inset-0 backdrop-blur-sm bg-black/20"></div>
        <div className="relative z-10 flex items-center h-full w-full">
          <div className="mx-auto px-4 text-white flex-col  ">
            <div className="flex mx-auto items-center justify-center">
            <Logo size="xl" className="drop-shadow-lg"/>
            <Brand textSize="2xl"/>
            </div>
            <FirstNavBtn/>
          </div>
        </div>
      </div>
    )
}