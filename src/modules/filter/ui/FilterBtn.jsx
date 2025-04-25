import React from 'react'

export const FilterBtn = () => {
  return (
    <div className="relative">
      <div className="flex gap-4 flex-shrink-0 overflow-x-auto w-full pb-3 hide-scrollbar">
        {['All', 'Trending', 'Following', 'Community', 'NoAi'].map((btn, index) => (
          <button
            key={index}
            className="px-8 h-10 flex items-center justify-center rounded bg-gray-800/80 text-white text-sm font-medium cursor-pointer hover:bg-gray-700/90 border border-gray-700 hover:border-indigo-400 transition-all duration-300 whitespace-nowrap relative overflow-hidden group"
          >
            <span className="relative z-10">{btn}</span>
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        ))}
      </div>
    </div>
  )
}