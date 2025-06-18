import React from 'react';
import { useArticleImages } from '../../../hooks/Articles_upload/useArticleImages';
import { useArticleForm } from '../../../hooks/Articles_upload/useArticleForm';
import { UploadDropzone } from '../../../ui/UploadDropzone';
import { ArticleForm } from './ArticleForm';
import { SubmitButton } from '../../../ui/SubmitButton';
import { ImagePreview } from './ImagePreview';

export const ArticleUploadForm = ({ onUploadSuccess, onUploadError }) => {
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
      if (!articleData?.article) throw new Error('Invalid server response format');
      onUploadSuccess?.({ article: articleData.article, status: 'success' });
    } catch (error) {
      console.error('Submission error:', error);
      onUploadError?.(error.message || 'Publication error occurred');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {localError && (
        <div className="p-4 mb-4 text-red-500 bg-red-500/10 rounded-lg">
          {localError}
        </div>
      )}

      <ArticleForm formData={formData} handleChange={handleChange}>
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">Images*</label>
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
          label="Publish Article"
          loadingLabel="Publishing..."
          disabled={
            isLoading ||
            !files.length ||
            !formData.title.trim() ||
            !formData.description.trim() ||
            !formData.content.trim()
          }
        />
      </ArticleForm>
    </div>
  );
};