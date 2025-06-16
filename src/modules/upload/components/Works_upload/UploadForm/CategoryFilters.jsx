import React from 'react';
import { SLIDER_FILTERS } from '../../../../filter/constant/filters';

export const CategoryFilters = ({ selectedFilters, onToggleFilter }) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        Tags
      </label>
      <div className="space-y-4">
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
          {SLIDER_FILTERS.map(filter => (
            <div 
              key={filter.id}
              onClick={() => onToggleFilter(filter.id)}
              className={`relative cursor-pointer rounded-lg overflow-hidden transition-all hover:scale-105 ${
                selectedFilters.includes(filter.id) 
                  ? 'ring-2 ring-blue-500 scale-105' 
                  : ''
              }`}
            >
              <img 
                src={filter.image} 
                alt={filter.label} 
                className="w-full h-24 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                <p className="text-white text-xs font-medium">{filter.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};