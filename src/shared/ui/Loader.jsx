import React from "react";

export const Loader = () => {
  return (
    <div className="flex items-center justify-center h-64 w-full">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

