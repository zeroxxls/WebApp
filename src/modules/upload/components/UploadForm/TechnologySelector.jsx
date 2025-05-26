import React from 'react';
import { AVAILABLE_TECHNOLOGIES } from '../../../../shared/constants/uploadFilters';

export const TechnologySelector = ({ selectedTechnologies, onToggleTechnology }) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-gray-300">
        Technologies Used
      </label>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {AVAILABLE_TECHNOLOGIES.map((techOption) => (
          <button
            key={techOption.id}
            type="button"
            className={`relative rounded-lg overflow-hidden transition-all hover:scale-105 cursor-pointer flex flex-col items-center justify-center p-3 bg-gray-800/50 ${
              selectedTechnologies.includes(techOption.label) ? 'ring-2 ring-purple-500 scale-105' : ''
            }`}
            onClick={() => onToggleTechnology(techOption.label)}
          >
            <div className="text-center mb-1">
              {techOption.icon}
            </div>
            <div className="text-white text-xs text-center">
              {techOption.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};