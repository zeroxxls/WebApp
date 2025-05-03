import React from 'react'
import { useFilters } from '../context/FilterContext'
import { BUTTON_FILTERS } from '../constant/filters'

export const FilterBtn = () => {
  const {activeFilter, setActiveFilter} = useFilters()

  return (
    <div className="relative">
      <div className="flex gap-4 flex-shrink-0 overflow-x-auto w-full pb-3 hide-scrollbar">
        {BUTTON_FILTERS.map((btn) => (
          <button
            key={btn.id}
            onClick={() => setActiveFilter(activeFilter === btn.id ? null : btn.id)}
            className={`px-8 h-10 flex items-center justify-center rounded text-sm font-medium cursor-pointer border transition-all duration-300 whitespace-nowrap relative overflow-hidden group ${
              activeFilter === btn.id
                ? 'bg-indigo-600/20 text-indigo-300 border-indigo-400'
                : 'bg-gray-800/80 text-white border-gray-700 hover:bg-gray-700/90 hover:border-indigo-400'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  )
}