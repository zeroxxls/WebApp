import { useState } from 'react';
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        if (!files.length) {
            setLocalError('Upload at least one image');
            return false;
        }

        if (!formData.title.trim() || !formData.description.trim() || !formData.content.trim()) {
            setLocalError('Fill all required fields');
            return false;
        }

        return true;
    };

    const submitForm = async () => {
        if (!validateForm()) {
            throw new Error('Invalid form data');
        }

        try {
            setIsLoading(true);
            setLocalError(null);

            const formDataToSend = new FormData();
            files.forEach(file => formDataToSend.append('images', file));
            
            Object.entries(formData).forEach(([key, value]) => {
                formDataToSend.append(key, value);
            });

            return await uploadArticle(formDataToSend);
        } catch (error) {
            setLocalError(error.message || 'Failed to publish article');
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return { formData, handleChange, isLoading, submitForm, localError };
};