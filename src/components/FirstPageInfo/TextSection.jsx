import React from "react";
import { FirstTextSection } from "./components/TextSection/components/FirstTextSection";

export const TextSection = () => {
  return (
    <div className="bg-[#1c1c25] w-full py-12 px-4">
      <section className="max-w-7xl mx-auto">
        <FirstTextSection/>
      </section>
    </div>
  );
};