import React from 'react';

export const DescriptionInput = ({ value, onChange }) => (
  <div>
    <label htmlFor="description" className="block text-sm font-medium mb-2">
      Description
    </label>
    <textarea
      id="description"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      rows={4}
      required
      placeholder="Tell us about your work..."
    />
  </div>
);