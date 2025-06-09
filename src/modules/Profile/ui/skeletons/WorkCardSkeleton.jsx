import React from 'react';

export const WorkCardSkeleton = () => {
  return (
    <div className="animate-pulse bg-gray-800 rounded-lg p-4">
      <div className="bg-gray-700 h-48 w-full rounded mb-4"></div>
      <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-1/2"></div>
    </div>
  );
};
