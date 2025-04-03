import React from "react";
import heroVideo from '../../../assets/video/hero-bg.mp4'
import { Logo } from "../../Header/ui/Logo";
import { HeaderBrand } from "../../Header/ui/HeaderBrand";
import { Link } from "react-router-dom";

export const HeroSection=()=>{
    return(
        <div className="relative h-screen">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 backdrop-blur-sm bg-black/20"></div>
        <div className="relative z-10 flex items-center h-full w-full">
          <div className="mx-auto px-4 text-white flex-col  ">
            <div className="flex mx-auto items-center justify-center">
            <Logo size="xl" className="drop-shadow-lg"/>
              <HeaderBrand textSize="2xl"/>
            </div>
            <div className="mt-5 flex flex-col md:h-[72px] md:w-[460px] md:flex-row justify-center">
              <Link to='/MainPage' className="flex gap-x-2 border border-gray-200 px-9 py-6 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:text-gray-700 rounded-t-lg border-b-0 md:rounded-l-lg md:rounded-tr-none md:border-b md:border-r-0 cursor-pointer">
              <a>
                Explore
              </a>
              </Link>
              <a className="flex gap-x-2 border border-gray-200 px-9 py-6 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:text-gray-700 cursor-pointer">
                Shop
              </a>
              <a className="flex gap-x-2 border border-gray-200 px-9 py-6 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:text-gray-700 rounded-b-lg border-t-0 md:rounded-r-lg md:rounded-bl-none md:border-l-0 md:border-t cursor-pointer">
                Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    )
}