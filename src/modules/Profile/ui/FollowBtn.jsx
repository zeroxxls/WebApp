import React from 'react';
import { useFollow } from '../hooks/useFollow';

export const FollowBtn = ({ profileUserId }) => {
  const { isFollowing, isLoading, toggleFollow } = useFollow(profileUserId);

  return (
    <button 
      onClick={toggleFollow}
      disabled={isLoading}
      className={`ml-auto px-6 py-2 rounded-full transition-all duration-300 shadow-lg ${
        isFollowing 
          ? 'bg-gray-700 hover:bg-gray-600 text-white' 
          : 'bg-blue-600 hover:bg-blue-500 text-white'
      }`}
    >
      {isLoading ? 'Loading...' : isFollowing ? 'Following' : 'Follow'}
    </button>
  );
};