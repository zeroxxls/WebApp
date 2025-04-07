import React from "react";
import { Logo } from "../Header/ui/Logo";
import { HeaderBrand } from "../Header/ui/HeaderBrand";
import { FirstNavBtn } from "./components/HeroSection/FirstNavBtn";
import { MainVideo } from "./components/HeroSection/MainVideo";

export const HeroSection=()=>{
    return(
        <div className="relative h-screen">
          <MainVideo/>
        <div className="absolute inset-0 backdrop-blur-sm bg-black/20"></div>
        <div className="relative z-10 flex items-center h-full w-full">
          <div className="mx-auto px-4 text-white flex-col  ">
            <div className="flex mx-auto items-center justify-center">
            <Logo size="xl" className="drop-shadow-lg"/>
            <HeaderBrand textSize="2xl"/>
            </div>
            <FirstNavBtn/>
          </div>
        </div>
      </div>
    )
}