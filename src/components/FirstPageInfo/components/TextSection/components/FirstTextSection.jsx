import React from "react";
import { InfoSection } from "../ui/InfoSection";
import { MainTextSection } from "../ui/MainTextSection";
import { PresentSection } from "../ui/PresentSection";
import { CharachterSection } from "../ui/CharachterSection";

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