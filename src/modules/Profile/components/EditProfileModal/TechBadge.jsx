import React from 'react';
import { FaMinus } from 'react-icons/fa';
import { FaCode } from 'react-icons/fa';
import { availableTechOptions } from '../../constants/constants';

export const TechBadge = ({ tech, onRemove }) => {
  const techOption = availableTechOptions.find(t => 
    t.name.toLowerCase() === tech.toLowerCase()
  );

  return (
    <div className="flex items-center bg-indigo-900/40 text-indigo-100 px-3 py-1 rounded-full">
      {techOption?.icon || <FaCode className="mr-1" />}
      <span className="mx-1">{tech}</span>
      <button 
        type="button"
        onClick={onRemove}
        className="text-gray-300 hover:text-white ml-1"
      >
        <FaMinus size={12} />
      </button>
    </div>
  );
};