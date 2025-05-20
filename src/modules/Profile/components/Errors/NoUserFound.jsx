import React from "react";

export const NoUserFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-4">
        <svg
          className="w-12 h-12 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-semibold text-white mb-2">User Not Found</h2>
      <p className="text-gray-400 max-w-md">
        We couldn't find the user you're looking for. Please check the URL or go back to the homepage.
      </p>
    </div>
  );
};
