import React from 'react'
import clsx from 'clsx'

export const AuthBtns = ({children, variant='signIn', className='', ...props}) => {
  const baseClasses = "w-full bg-blue-700 hover:bg-blue-500 transition-all duration-500 text-white py-2 rounded" 
  const variants = {
    signIn: {baseClasses},
    signUp: "w-full bg-blue-700 hover:bg-blue-800 transition-all duration-500 text-white py-2 rounded"
  }
  return (
    <button 
        className={clsx(baseClasses, variants[variant], className)}
        {...props}
    >
        {children}
    </button>
  )
}
