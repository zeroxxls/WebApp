import React from "react";
import character from '../../../assets/video/charachter.mp4'

export const CharacterVideo =()=>{
    return(
        <div className="rounded-xl overflow-hidden shadow-lg">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-auto max-w-2xl rounded-xl"
              >
                <source src={character} type="video/mp4" />
              </video>
            </div>
    )
}