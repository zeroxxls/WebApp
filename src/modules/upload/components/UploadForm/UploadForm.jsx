import React, { useState } from 'react';
import { DescriptionInput } from './DescriptionInput';
import { SubmitButton } from './SubmitButton';
import { CategoryFilters } from './CategoryFilters';
import { PriceSelector } from './PriceSelector';
import { TechnologySelector } from './TechnologySelector';

export const UploadForm = ({
  files,
  setFiles,
  onUploadSuccess,
  onUploadError
}) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    if (!files || files.length === 0) {
      setLocalError('Please select at least one file');
      return;
    }
    if (!title.trim()) {
      setLocalError('Please enter a title for your work');
      return;
    }

    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    formData.append('title', title);
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

      setFiles([]);
      setTitle('');
      setDescription('');
      setPrice(0);
      setSelectedTechnologies([]);
      setSelectedFilters([]);

      if (onUploadSuccess) {
        onUploadSuccess(data);
      }
    } catch (err) {
      console.error('Upload error:', err);
      setLocalError(err.message || 'Failed to upload files');
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

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
          placeholder="Enter a title for your work"
          required
        />
      </div>

      <DescriptionInput
        value={description}
        onChange={setDescription}
      />

      <PriceSelector
        value={price}
        onChange={setPrice}
      />

      <TechnologySelector
        selectedTechnologies={selectedTechnologies}
        onToggleTechnology={handleToggleTechnology}
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
        disabled={isLoading || !files || files.length === 0 || !title.trim()}
      />
    </form>
  );
};