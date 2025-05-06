import React from "react";
import { FooterInfo } from "../FooterFeatures/FooterInfo";
import { FooterSections } from "../FooterFeatures/FooterSections";
import { FooterCooperation } from "../FooterFeatures/FooterCooperation";
import { FooterCopyRight } from "../FooterFeatures/FooterCopyRight";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-#1c1c25 to-black border-t border-gray-800/90 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <FooterInfo/>
        <FooterSections/>
        <FooterCooperation/>
      </div>
        <FooterCopyRight/>
    </footer>
  );
};