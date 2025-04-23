import React from "react";
import { InfoSection } from "./InfoSection";
import { MainTextSection } from "./MainTextSection";
import { PresentSection } from "./PresentSection";
import { CharachterSection } from "./CharachterSection";

export const FirstTextSection =()=>{
    return(
        <div>
          <MainTextSection/>
          <InfoSection/>
          <PresentSection/>
          <CharachterSection/>
        </div>
    )
}