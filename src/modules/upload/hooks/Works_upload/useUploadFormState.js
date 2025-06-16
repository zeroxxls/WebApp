import { useState } from 'react';

export const useUploadFormState = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState(null);

  const handleToggleTechnology = (technology) => {
    setSelectedTechnologies(prev =>
      prev.includes(technology)
        ? prev.filter(t => t !== technology)
        : [...prev, technology]
    );
  };

  const handleToggleFilter = (filterId) => {
    setSelectedFilters(prev =>
      prev.includes(filterId)
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  return {
    title, setTitle,
    description, setDescription,
    price, setPrice,
    selectedFilters, setSelectedFilters,
    selectedTechnologies, setSelectedTechnologies,
    handleToggleTechnology,
    handleToggleFilter,
    isLoading, setIsLoading,
    localError, setLocalError
  };
};
