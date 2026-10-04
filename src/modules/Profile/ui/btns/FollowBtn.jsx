import React from 'react';

export const FollowBtn = ({ isFollowing, isLoading, onToggle }) => {
  return (
    <button 
      onClick={onToggle}
      disabled={isLoading}
      className={`px-8 py-3 text-lg rounded-full transition-all duration-300 shadow-lg md:px-6 md:py-2 md:text-base ${
        isFollowing 
          ? 'bg-gray-700 hover:bg-gray-600 text-white' 
          : 'bg-blue-600 hover:bg-blue-500 text-white'
      }`}
    >
      {isLoading ? 'Loading...' : isFollowing ? 'Following' : 'Follow'}
    </button>
  );
};
