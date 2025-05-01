import React from 'react'
import clsx from "clsx";

export const ActionBtn = ({children, variant='like', className='', ...props}) => {
    const baseClasses = "bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-4 py-2  transition duration-300"
    const variants={
        like:"bg-blue-600 hover:bg-blue-500",
        save:"bg-gray-600/70 hover:bg-gray-600",
    };
  return (
    <button className={clsx(baseClasses, variants[variant], className)} {...props}>
        {children}
    </button>
  )
}
