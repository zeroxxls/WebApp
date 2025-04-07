import React from "react";
import { InfoVideo } from "../ui/InfoVideo";
import { HeaderBrand } from "../../../../Header/ui/HeaderBrand";
import { PresentVideo } from "../ui/PresentVideo";

export const FirstTextSection =()=>{
    return(
        <div>
          <div className="flex text-center justify-center mb-16">
         <HeaderBrand size="xl"/>
          <h1 className="text-3xl font-bold text-white">
             - The best place for Digital Art
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 mb-24">
          <div className="lg:w-1/2 w-full">
            <InfoVideo />
          </div>
          <div className="lg:w-1/2 w-full">
            <p className="text-gray-300 text-lg leading-relaxed">
              Create anything you can imagine on our platform. Share your work, 
              connect with other creators, and grow together with our community!
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
          <div className="lg:w-1/2 w-full">
            <PresentVideo />
          </div>
          <div className="lg:w-1/2 w-full">
            <p className="text-gray-300 text-lg leading-relaxed">
            Our platform isn't just for 2D art — here, you can also showcase your 3D creations! 
            Join a vibrant community of artists, designers, and creators who bring their ideas to life in three dimensions. 
            Whether it's models, animations, or full scenes, this is the place to share your work and get inspired.
            </p>
          </div>
        </div>
        </div>
    )
}