import React from 'react'

export const ThreeDModelLogo = () => {
  return (
      <div className="absolute top-4 left-4 bg-indigo-600/90 text-white text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm flex items-center space-x-1.5 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            <span>3D MODEL</span>
      </div>
  )
}
