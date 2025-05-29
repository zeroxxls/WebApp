import React from 'react';

export const Comment = ({ comment }) => (
  <div className="bg-gray-700 p-3 rounded-lg flex items-start gap-2">
    {comment.author?._id ? (
      <img
        src={`http://localhost:4444/avatars/${comment.author._id}/avatar?${Date.now()}`}
        alt={comment.author?.fullName || comment.author?.name || 'User'}
        className="w-8 h-8 rounded-full object-cover"
      />
    ) : (
      <div className="w-8 h-8 rounded-full bg-gray-600"></div>
    )}
    <div className="flex flex-col">
      <p className="text-sm text-gray-300">
        <span className="font-semibold text-white">
          {comment.author?.fullName || comment.author?.name || 'User'}:
        </span>
        {comment.text}
      </p>
      {/* Здесь может быть дополнительная информация */}
    </div>
  </div>
);