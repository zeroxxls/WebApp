import React from "react";

export const WorkCard = ({ work, user, onClick }) => {
  const imageUrl = work.files && work.files.length > 0 ? work.files[0].url : 'URL_ЗАГЛУШКИ'; // Замените на URL по умолчанию, если нужно

  return (
    <div
      onClick={onClick}
      className="relative cursor-pointer group overflow-hidden rounded shadow-md hover:shadow-xl transition-shadow bg-gray-100"
    >
      <img
        src={imageUrl}
        alt={work.description || 'Work'}
        className="w-full h-full object-cover aspect-square transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-30 transition duration-300 z-10" />
      <div className="absolute inset-0 flex flex-col items-start justify-end p-4 space-y-1 bg-gradient-to-t from-black/50 to-transparent">
        <h3 className="text-white text-lg font-semibold transform -translate-x-full group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
          {work.description} {/* Используем описание работы */}
        </h3>
        <div className="flex items-center space-x-2 transform -translate-x-full group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-50">
          {user && (
            <img
              src={`http://localhost:4444/avatars/${user._id}/avatar?${Date.now()}`}
              alt={user.fullName || user.name || 'User'}
              className="w-6 h-6 rounded-full object-cover cursor-pointer"
            />
          )}
          <span className="text-white text-sm">{user?.fullName || user?.name || 'User'}</span>
        </div>
      </div>
    </div>
  );
};