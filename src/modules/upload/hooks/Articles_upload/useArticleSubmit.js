import { toast } from 'react-toastify';

export const useArticleSubmit = ({
  files, title, description, content, tags,
  setIsLoading, setLocalError, setFiles,
  resetFormFields,
  onUploadSuccess, onUploadError
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    if (!files || files.length === 0) {
      setLocalError('Пожалуйста, загрузите хотя бы одно изображение');
      toast.error('Загрузите хотя бы одно изображение');
      return;
    }
    if (!title.trim() || !description.trim() || !content.trim()) {
      setLocalError('Пожалуйста, заполните все обязательные поля');
      toast.error('Заполните все обязательные поля');
      return;
    }

    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file);
    });
    formData.append('title', title);
    formData.append('description', description);
    formData.append('content', content);
    formData.append('tags', tags);

    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:4444/articles', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка при загрузке статьи');
      }

      const data = await response.json();
      toast.success('Статья успешно опубликована!');

      setFiles([]);
      resetFormFields();

      if (onUploadSuccess) {
        onUploadSuccess(data);
      }
    } catch (err) {
      console.error('Upload error:', err);
      setLocalError(err.message || 'Не удалось опубликовать статью');
      toast.error(err.message || 'Не удалось опубликовать статью');
      if (onUploadError) {
        onUploadError(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSubmit };
};