import React from "react";
import digitalVideo from "../../../assets/video/digital-art.mp4";

export const InfoVideo = () => {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg">
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="w-full h-auto max-w-2xl rounded-xl"
      >
        <source src={digitalVideo} type="video/mp4" />
      </video>
    </div>
  );
};