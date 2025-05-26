import React from "react";
import { FaCode } from "react-icons/fa";
import { availableTechOptions } from "../../../../shared/constants/constants";

const getTechIcon = (techName) => {
  const foundTech = availableTechOptions.find(option => option.name.toLowerCase() === techName.toLowerCase());
  return foundTech?.icon || <FaCode className="text-gray-400" />;
};

export const TechStackSection = ({ techStack }) => {
  if (!techStack?.length) return null;
  return (
    <div className="flex flex-wrap gap-3 mt-6 justify-center md:justify-start">
      {techStack.map((tech, index) => (
        <div
          key={index}
          className="flex items-center gap-2 bg-indigo-900/30 text-indigo-300 px-3 py-2 rounded-full text-sm"
        >
          {getTechIcon(tech)}
          <span>{tech}</span>
        </div>
      ))}
    </div>
  );
};
