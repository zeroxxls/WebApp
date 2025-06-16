import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArticleUploadForm } from './ArticleForm/ArticleUploadForm';

export const ArticleUploadPage = () => {
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleReturnToProfile = () => {
    if (user && user._id) {
      navigate(`/profile/${user._id}`);
    }
  };

  if (uploadStatus === 'success') {
    return (
      <div className="min-h-screen text-white p-6">
        <div className="max-w-7xl mx-auto bg-gray-800/50 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl mb-12 p-8 text-center">
          <div className="text-green-500 text-5xl mb-4">✓</div>
          <h2 className="text-2xl font-bold mb-4">Статья успешно опубликована!</h2>
          <p className="mb-6">Ваша статья была успешно опубликована.</p>
          <button
            onClick={handleReturnToProfile}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Вернуться в профиль
          </button>
        </div>
      </div>
    );
  }

  if (uploadStatus === 'error') {
    return (
      <div className="min-h-screen text-white p-6">
        <div className="max-w-7xl mx-auto bg-gray-800/50 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl mb-12 p-8 text-center">
          <div className="text-red-500 text-5xl mb-4">✗</div>
          <h2 className="text-2xl font-bold mb-4">Публикация не удалась</h2>
          <p className="mb-6 text-red-400">{uploadError || 'Произошла неизвестная ошибка'}</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setUploadStatus(null)}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
            >
              Попробовать снова
            </button>
            <button
              onClick={handleReturnToProfile}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Вернуться в профиль
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-7xl mx-auto bg-gray-800/50 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl mb-12">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-full p-8 overflow-y-auto">
            <ArticleUploadForm 
              onUploadSuccess={() => setUploadStatus('success')}
              onUploadError={(error) => {
                setUploadStatus('error');
                setUploadError(error.message);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleUploadPage;