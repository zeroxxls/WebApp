import React from 'react';

export const BioTab = ({ bio, setBio }) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-gray-300 mb-2 font-medium">Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full bg-gray-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          rows="5"
          placeholder="Tell about yourself..."
        />
      </div>
    </div>
  );
};