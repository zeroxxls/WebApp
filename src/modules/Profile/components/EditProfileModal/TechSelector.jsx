import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { availableTechOptions } from '../../constants/constants';

export const TechSelector = ({ techStack, setTechStack }) => {
  const toggleTech = (tech) => {
    if (techStack.includes(tech)) {
      setTechStack(techStack.filter(t => t !== tech));
    } else {
      setTechStack([...techStack, tech]);
    }
  };

  return (
    <div>
      <label className="block text-gray-300 mb-2 font-medium">Popular Technologies</label>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {availableTechOptions.map((tech) => (
          <button
            key={tech.name}
            type="button"
            onClick={() => toggleTech(tech.name)}
            className={`flex items-center p-3 rounded-lg border transition-all ${
              techStack.includes(tech.name)
                ? 'bg-indigo-600/20 border-indigo-500 text-white'
                : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <span className="mr-2">{tech.icon}</span>
            <span className="truncate">{tech.name}</span>
            {techStack.includes(tech.name) && (
              <span className="ml-auto text-green-400">
                <FaCheck size={14} />
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};