import { useState } from 'react';

export const useArticleFormState = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState(''); // Для статьи
  const [tags, setTags] = useState('');     // Для статьи (строка через запятую)
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState(null);

  return {
    title, setTitle,
    description, setDescription,
    content, setContent,
    tags, setTags,
    isLoading, setIsLoading,
    localError, setLocalError
  };
};