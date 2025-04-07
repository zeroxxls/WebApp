import React from "react";
import { HeroSection } from "../../components/FirstPageInfo/HeroSection";
import { TextSection } from "../../components/FirstPageInfo/TextSection";
import { Footer } from "../../components/Footer/Footer";

export const FirstPage = () => {
    return (
      <div >
      <HeroSection/>
      <TextSection/>
      <Footer/>
      </div>
    );
};