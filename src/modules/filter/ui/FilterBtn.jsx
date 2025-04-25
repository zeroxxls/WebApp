import React from 'react'

export const FilterBtn = () => {
  return (
    <div>
        <div className="flex gap-5 flex-shrink-0 overflow-x-auto w-full md:w-auto m-3"> 
              {['All', 'Trending', 'Following', 'Community', 'NoAi'].map((btn, index) => (
                <button
                  key={index}
                  className="px-10 h-10 flex items-center justify-center rounded bg-gray-800 text-white text-sm font-medium cursor-pointer hover:bg-gray-700 hover:[background:linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.indigo.500)_86%,_theme(colors.indigo.300)_90%,_theme(colors.indigo.500)_94%,_theme(colors.slate.600/.48))_border-box] border border-transparent animate-border transition-all duration-500 hover:shadow-md hover:outline-none whitespace-nowrap" 
                >
                  {btn}
                </button>
              ))}
            </div>
    </div>
  )
}
