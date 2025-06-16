import { toast } from 'react-toastify';

export const useArticleSubmit = ({
  files, title, description, content, tags, // Добавлены content и tags
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
    // Изменение: Multer на бэкенде ожидает 'images' для всех файлов (upload.array('images')).
    // Поэтому все файлы должны быть добавлены под именем 'images'.
    // Логика previewImage и images будет обрабатываться на бэкенде в articleService.js
    files.forEach(file => {
      formData.append('images', file); // ВСЕ файлы добавляем под именем 'images'
    });

    formData.append('title', title);
    formData.append('description', description);
    formData.append('content', content);
    // Теги уже должны быть строкой (через запятую),
    // articleService.js преобразует их в массив
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
      console.log('Upload success:', data);
      toast.success('Статья успешно опубликована!');

      setFiles([]); // Очищаем файлы
      resetFormFields(); // Сбрасываем поля формы

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