import React from 'react';
import { useArticleImages } from '../../../hooks/Articles_upload/useArticleImages';
import { useArticleForm } from '../../../hooks/Articles_upload/useArticleForm';
import { UploadDropzone } from '../../../ui/UploadDropzone';
import { ArticleForm } from './ArticleForm';
import { SubmitButton } from '../../../ui/SubmitButton';
import { ImagePreview } from './ImagePreview';
import { useDispatch } from 'react-redux';
import { addNewArticle } from '../../../../../store/slices/articleSlice';

export const ArticleUploadForm = ({ onUploadSuccess, onUploadError }) => {
    const dispatch = useDispatch();
    const { files, onDrop, removeFile } = useArticleImages();
    const { 
        formData, 
        handleChange, 
        isLoading, 
        submitForm,
        localError
    } = useArticleForm(files);

    const handleSubmit = async () => {
    try {
        const articleData = await submitForm();
        console.log('Upload response:', articleData); // Лог ответа
        
        if (!articleData?.article) {
            throw new Error('Неверный формат ответа сервера');
        }

        // Явно вызовите onUploadSuccess
        if (onUploadSuccess) {
            onUploadSuccess({
                article: articleData.article,
                status: 'success'
            });
        } else {
            console.warn('onUploadSuccess callback is not defined');
        }
    } catch (error) {
        console.error('Upload error:', error);
        if (onUploadError) {
            onUploadError(error);
        }
    }
};

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-white">Новая статья</h1>

            {localError && (
                <div className="p-4 mb-4 text-red-500 bg-red-500/10 rounded-lg">
                    {localError}
                </div>
            )}

            <ArticleForm formData={formData} handleChange={handleChange}>
                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Изображения*</label>
                    <UploadDropzone
                        onFilesAccepted={onDrop}
                        accept={{ 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] }}
                        multiple={true}
                    />
                </div>

                {files.length > 0 && (
                    <ImagePreview 
                        files={files} 
                        removeFile={removeFile} 
                        previewIndex={0}
                    />
                )}

                <SubmitButton
                    isLoading={isLoading}
                    onClick={handleSubmit}
                    label="Опубликовать статью"
                    loadingLabel="Публикация..."
                    disabled={isLoading || files.length === 0 || !formData.title.trim() || !formData.description.trim() || !formData.content.trim()}
                />
            </ArticleForm>
        </div>
    );
};

export default ArticleUploadForm;