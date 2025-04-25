import React from 'react';
import { FilterSlider } from '../FilterSlider/FilterSlider';
import { FilterBtn } from '../../ui/FilterBtn';
import '../../../shared/styles/Border.css';

export const FilterSection = () => {
  return (
    <div className="w-full py-4">
      <div className="flex flex-col gap-6">
        <div className='ml-4'>
          <FilterBtn />
        </div>
        <div className='ml-4'>
         <FilterSlider />
        </div>
      </div>
    </div>
  );
};