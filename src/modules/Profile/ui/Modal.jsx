import React from 'react';

export const Modal = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-4xl mx-auto">
        {children}
      </div>
    </div>
  );
};