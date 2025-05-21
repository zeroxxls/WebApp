// UploadForm.jsx
import React, { useState } from 'react';
import { DescriptionInput } from './DescriptionInput';
import { PriceInput } from './PriceInput';
import { TechnologiesInput } from './TechnologiesInput';
import { CategoryFilters } from './CategoryFilters';
import { SubmitButton } from './SubmitButton';

export const UploadForm = ({ 
  files, 
  setFiles,
  onUploadSuccess,
  onUploadError
}) => {
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    if (!files || files.length === 0) {
      setLocalError('Please select at least one file');
      return;
    }

    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    formData.append('description', description);
    formData.append('price', price.toString());
    formData.append('technologies', JSON.stringify(selectedTechnologies));
    formData.append('filters', JSON.stringify(selectedFilters));

    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:4444/works/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Upload failed');
      }

      const data = await response.json();
      console.log('Upload success:', data);
      
      // Reset form
      setFiles([]);
      setDescription('');
      setPrice(0);
      setSelectedTechnologies([]);
      setSelectedFilters([]);
      
      // Notify parent component
      if (onUploadSuccess) {
        onUploadSuccess(data);
      }
    } catch (err) {
      console.error('Upload error:', err);
      setLocalError(err.message || 'Failed to upload files');
      
      // Notify parent component
      if (onUploadError) {
        onUploadError(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {localError && (
        <div className="p-4 mb-4 text-red-500 bg-red-500/10 rounded-lg">
          {localError}
        </div>
      )}
      
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
        disabled={isLoading || !files || files.length === 0}
      />
    </form>
  );
};