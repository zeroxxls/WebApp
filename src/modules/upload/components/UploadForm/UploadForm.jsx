import React, { useState } from 'react';
import { DescriptionInput } from './DescriptionInput';
import { PriceInput } from './PriceInput';
import { TechnologiesInput } from './TechnologiesInput';
import { CategoryFilters } from './CategoryFilters';
import { SubmitButton } from './SubmitButton';

export const UploadForm = ({files}) => {
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData();
  files.forEach(file => {
    formData.append('files', file); // multiple files
  });
  formData.append('description', description);
  formData.append('price', price);
  formData.append('technologies', JSON.stringify(selectedTechnologies));
  formData.append('filters', JSON.stringify(selectedFilters));

  setIsLoading(true);
  fetch('/api/upload', {
    method: 'POST',
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      console.log('Upload success:', data);
      // optionally clear state
    })
    .catch(err => {
      console.error('Upload failed:', err);
    })
    .finally(() => {
      setIsLoading(false);
    });
};


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <DescriptionInput 
        value={description} 
        onChange={setDescription} 
      />
      
      <PriceInput 
        value={price} 
        onChange={setPrice} 
      />
      
      <TechnologiesInput 
        technologies={selectedTechnologies}
        onAddTech={(tech) => setSelectedTechnologies([...selectedTechnologies, tech])}
        onRemoveTech={(tech) => setSelectedTechnologies(selectedTechnologies.filter(t => t !== tech))}
      />
      
      <CategoryFilters 
        selectedFilters={selectedFilters}
        onToggleFilter={(filterId) => 
          setSelectedFilters(prev => 
            prev.includes(filterId) 
              ? prev.filter(id => id !== filterId) 
              : [...prev, filterId]
          )
        }
      />
      
      <SubmitButton 
        isLoading={isLoading}
        disabled={isLoading}
      />
    </form>
  );
};