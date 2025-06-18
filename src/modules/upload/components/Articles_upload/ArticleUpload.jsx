import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArticleUploadForm } from './ArticleForm/ArticleUploadForm';

export const ArticleUpload = () => {
  const navigate = useNavigate();
  const [uploadError, setUploadError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUploadSuccess = () => {
    navigate('/NewsPage');
  };

  const handleUploadError = (errorMessage) => {
    setUploadError(errorMessage);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-4xl mx-auto bg-gray-800/50 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl mb-12 p-8">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          New Article
        </h1>
        
        {uploadError && (
          <div className="mb-6 p-4 bg-red-500/10 text-red-500 rounded-lg">
            {uploadError}
          </div>
        )}

        <ArticleUploadForm
          onUploadSuccess={handleUploadSuccess}
          onUploadError={handleUploadError}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
        />
      </div>
    </div>
  );
};