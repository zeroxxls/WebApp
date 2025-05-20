import React, { useState } from 'react';

export const TechnologiesInput = ({ technologies, onAddTech, onRemoveTech }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim() && !technologies.includes(inputValue.trim())) {
      onAddTech(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-gray-300">
        Technologies Used
      </label>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Add technology (e.g. Blender, Photoshop)"
          className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 flex items-center"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech, index) => (
          <div key={index} className="flex items-center bg-gray-700 rounded-full px-3 py-1 group">
            <span className="text-white text-sm">{tech}</span>
            <button
              type="button"
              onClick={() => onRemoveTech(tech)}
              className="ml-2 text-gray-400 hover:text-white transition-colors"
              aria-label={`Remove ${tech}`}
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};