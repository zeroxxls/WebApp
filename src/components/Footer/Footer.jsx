import React from "react";
import { FooterInfo } from "./components/FooterInfo";
import { FooterSections } from "./components/FooterSections";
import { FooterCooperation } from "./components/FooterCooperation";
import { FooterCopyRight } from "./components/FooterCopyRight";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black border-t border-gray-800 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <FooterInfo/>
        <FooterSections/>
        <FooterCooperation/>
      </div>
        <FooterCopyRight/>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-20" />
    </footer>
  );
};