import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

export const CustomTechInput = ({ techStack, setTechStack }) => {
  const [customTech, setCustomTech] = useState('');

  const addCustomTech = () => {
    if (customTech.trim() && !techStack.includes(customTech.trim())) {
      setTechStack([...techStack, customTech.trim()]);
      setCustomTech('');
    }
  };

  return (
    <div>
      <label className="block text-gray-300 mb-2 font-medium">Add Custom Technology</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={customTech}
          onChange={(e) => setCustomTech(e.target.value)}
          className="flex-1 bg-gray-700 text-white rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Enter technology name"
        />
        <button
          type="button"
          onClick={addCustomTech}
          disabled={!customTech.trim()}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-indigo-700"
        >
          Add
        </button>
      </div>
    </div>
  );
};