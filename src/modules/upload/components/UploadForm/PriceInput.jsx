import React from 'react';

export const PriceInput = ({ value, onChange }) => (
  <div>
    <label htmlFor="price" className="block text-sm font-medium mb-2">
      Price ($)
    </label>
    <input
      type="number"
      id="price"
      value={value}
      onChange={(e) => onChange(Math.max(0, e.target.value))}
      min="0"
      step="0.01"
      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
      placeholder="0.00"
    />
  </div>
);