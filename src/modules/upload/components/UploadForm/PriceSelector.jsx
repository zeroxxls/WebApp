import React from 'react';
import { AVAILABLE_PRICES } from '../../../../shared/constants/uploadFilters';

export const PriceSelector = ({ value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-gray-300">
        Price ($)
      </label>
      <div className="flex flex-wrap gap-2">
        {AVAILABLE_PRICES.map((priceOption) => (
          <button
            key={priceOption.id}
            type="button"
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              value === priceOption.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            onClick={() => onChange(priceOption.value)}
          >
            {priceOption.label}
          </button>
        ))}
      </div>
    </div>
  );
};