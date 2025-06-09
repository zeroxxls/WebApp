import React from 'react'

export const DescriptionBlock = ({ title, description }) => (
  <div className='flex flex-col gap-4 p-4 rounded-2xl border border-gray-700 bg-gray-800 shadow-md mb-8'>
    <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
    <p className="text-gray-400">{description}</p>
  </div>
)
