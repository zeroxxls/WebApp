import { useContext } from 'react';
import { FilterContext } from '../context/FilterContext';

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
};
