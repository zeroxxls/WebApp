import React, { useState } from 'react';
import { FilterContext } from './FilterContext';
export const FilterProvider = ({ children }) => {
    const [activeFilter, setActiveFilter] = useState([]);
    const toggleFilter = (filterId) => {
      setActiveFilter((prevFilters) =>
        prevFilters.includes(filterId)
          ? prevFilters.filter((id) => id !== filterId)
          : [...prevFilters, filterId]
      );
    };
  
    return (
      <FilterContext.Provider value={{ activeFilter, setActiveFilter, toggleFilter }}>
        {children}
      </FilterContext.Provider>
    );
  };