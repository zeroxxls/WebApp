import React from 'react';
import clsx from 'clsx';

export const ActionBtn = ({
  children,
  variant = 'like',
  isActive = false,
  className = '',
  ...props
}) => {
  const baseClasses = `
    flex items-center justify-center gap-2
    text-white rounded-lg px-4 py-2
    transition-all duration-300
    cursor-pointer text-xl w-xl
    hover:scale-101
  `;

  const variants = {
    like: isActive ? 'bg-blue-500 shadow-md' : 'bg-blue-600',
    save: isActive ? 'bg-gray-600 shadow-md' : 'bg-gray-600/70',
  };

  return (
    <button
      className={clsx(baseClasses, variants[variant], className)}
      aria-pressed={isActive}
      {...props}
    >
      {children}
    </button>
  );
};