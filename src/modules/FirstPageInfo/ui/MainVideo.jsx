import React from "react";
import heroVideo from '../../../assets/video/hero-bg.mp4'
export const MainVideo=()=>{
    return(
        <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="absolute w-full h-full object-cover"
                  >
                    <source src={heroVideo} type="video/mp4" />
                  </video>
    )
}