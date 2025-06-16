import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { uploadArticle } from '../../../../api/articlesApi';

export const useArticleForm = (files) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        content: '',
        tags: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [localError, setLocalError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        if (!files.length) {
            setLocalError('Загрузите хотя бы одно изображение');
            return false;
        }

        if (!formData.title.trim() || !formData.description.trim() || !formData.content.trim()) {
            setLocalError('Заполните все обязательные поля');
            return false;
        }

        return true;
    };

    const submitForm = async (onSuccess) => {
        if (!validateForm()) return;

        try {
            setIsLoading(true);
            setLocalError(null);

            const formDataToSend = new FormData();
            files.forEach(file => {
                formDataToSend.append('images', file);
            });

            formDataToSend.append('title', formData.title);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('content', formData.content);
            formDataToSend.append('tags', formData.tags);

            const response = await uploadArticle(formDataToSend);
            
            toast.success('Статья успешно опубликована!');
            if (onSuccess) onSuccess(response);
            navigate('/NewsPage'); // Перенаправляем на страницу со статьями
        } catch (error) {
            console.error('Ошибка:', error);
            setLocalError(error.message || 'Не удалось опубликовать статью');
            toast.error(error.message || 'Не удалось опубликовать статью');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formData,
        handleChange,
        isLoading,
        submitForm,
        localError
    };
};