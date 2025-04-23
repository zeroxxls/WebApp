import React from "react";
import presentVideo from '../../../assets/video/frog-present.mp4';

export const PresentVideo =()=>{
    return(
        <div className="rounded-xl overflow-hidden shadow-lg">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-auto max-w-2xl rounded-xl"
              >
                <source src={presentVideo} type="video/mp4" />
              </video>
            </div>
    )
}