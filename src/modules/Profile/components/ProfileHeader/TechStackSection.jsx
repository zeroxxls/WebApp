import React from "react";
import { FaCode } from "react-icons/fa";
import { FaReact, FaNodeJs, FaJs, FaPython, FaJava, FaHtml5, FaCss3Alt, FaDatabase } from "react-icons/fa";
import { SiTypescript, SiMongodb, SiPostgresql, SiDocker, SiKubernetes } from "react-icons/si";

const techIcons = {
  react: <FaReact className="text-blue-500" />,
  node: <FaNodeJs className="text-green-500" />,
  javascript: <FaJs className="text-yellow-500" />,
  typescript: <SiTypescript className="text-blue-600" />,
  python: <FaPython className="text-blue-400" />,
  java: <FaJava className="text-red-500" />,
  html: <FaHtml5 className="text-orange-500" />,
  css: <FaCss3Alt className="text-blue-300" />,
  mongodb: <SiMongodb className="text-green-600" />,
  postgresql: <SiPostgresql className="text-blue-700" />,
  docker: <SiDocker className="text-blue-400" />,
  kubernetes: <SiKubernetes className="text-blue-600" />,
  database: <FaDatabase className="text-gray-400" />,
};

const getTechIcon = (tech) => {
  const key = tech.toLowerCase();
  return techIcons[key] || <FaCode className="text-gray-400" />;
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
