export const useUploadSubmit = ({
  files, title, description, price,
  selectedFilters, selectedTechnologies,
  setIsLoading, setLocalError, setFiles,
  resetFormFields,
  onUploadSuccess, onUploadError
}) => {
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
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/works/upload`, {
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
      resetFormFields();

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

  return { handleSubmit };
};
