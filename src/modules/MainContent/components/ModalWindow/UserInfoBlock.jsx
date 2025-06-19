import React from 'react';

export const UserInfoBlock = ({ selectedUser, onProfileClick }) => {
  if (!selectedUser) return null;

  const userId = selectedUser?._id;
  const displayName = selectedUser?.fullName || selectedUser?.name || 'Creator';

  return (
    <div className="mb-8 flex items-center">
      <div
        className="relative w-16 h-16 rounded-full overflow-hidden cursor-pointer"
        onClick={() => userId && onProfileClick(userId)}
      >
        <img
          src={userId ? `${import.meta.env.VITE_BACKEND_URL}/avatars/${userId}/avatar?${Date.now()}` : '/default-avatar.png'}
          alt={displayName}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => { e.target.src = '/default-avatar.png'; }}
        />
      </div>
      <h2
        className="ml-4 text-lg font-bold hover:text-blue-100 text-white cursor-pointer"
        onClick={() => userId && onProfileClick(userId)}
      >
        {displayName}
      </h2>
    </div>
  );
};
