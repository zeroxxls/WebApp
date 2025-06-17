import { useState } from 'react';

export const useArticleFormState = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState(null);

  const resetFormFields = () => {
    setTitle('');
    setDescription('');
    setContent('');
    setTags('');
  };

  return {
    title, setTitle,
    description, setDescription,
    content, setContent,
    tags, setTags,
    isLoading, setIsLoading,
    localError, setLocalError,
    resetFormFields
  };
};