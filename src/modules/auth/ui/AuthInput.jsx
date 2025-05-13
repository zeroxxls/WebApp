import React from 'react'

export const AuthInput = ({placeholder, type='text',value, onChange}) => {
  return (
    <input className="w-full p-2 mb-5 bg-transparent border-b-1 border-b-gray-400 focus:border-b-blue-500 transition-border-b duration-500 focus:outline-none text-white"
     placeholder={placeholder} 
     type={type}
     value={value}
     onChange={onChange}
    />
  )
}
