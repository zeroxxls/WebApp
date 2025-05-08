import React from "react";

export const WorkCard = ({ work, user, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="relative cursor-pointer group overflow-hidden rounded shadow-md hover:shadow-xl transition-shadow bg-gray-100"
    >
      <img
        src={work.channelUrl}
        alt={work.title}
        className="w-full h-full object-cover aspect-square transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-30 transition duration-300 z-10" />
      <div className="absolute inset-0 flex flex-col items-start justify-end p-4 space-y-1 bg-gradient-to-t from-black/50 to-transparent">
        <h3 className="text-white text-lg font-semibold transform -translate-x-full group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
          {work.title}
        </h3>
        <div className="flex items-center space-x-2 transform -translate-x-full group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
          {user && (
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-6 h-6 rounded-full object-cover cursor-pointer"
            />
          )}
          <span className="text-white text-sm">{user?.name}</span>
        </div>
      </div>
    </div>
  );
};