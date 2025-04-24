import React from 'react';
import { FilterSlider } from '../FilterSlider/FilterSlider';

export const FilterSection = () => {
  return (
    <div className="w-full px-6 py-10 max-w-screen-xl mx-auto">
      <div className="flex gap-6">
        {/* Фильтры */}
        <div className="flex gap-4 items-center justify-center md:justify-start">
          {['All Categories', 'Trending', 'Following'].map((btn, index) => (
            <button
              key={index}
              className="px-4 py-2 rounded-full "
            >
              {btn}
            </button>
          ))}
        </div>

        {/* Слайдер */}
        <FilterSlider />
      </div>
    </div>
  );
};
