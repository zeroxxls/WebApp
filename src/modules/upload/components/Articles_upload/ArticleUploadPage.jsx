import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadDropzone } from '../../../ui/UploadDropzone';
import { ArticleUploadForm } from './ArticleUploadForm';
import { UploadPreview } from './UploadPreview';
import { useSelector, useDispatch } from 'react-redux';
import { addNewArticle } from '../../../../store/slices/articleSlice';

export const ArticleUploadPage = () => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(null); // 'success' | 'error' | null
  const [uploadError, setUploadError] = useState(null);
  const [uploadedArticleId, setUploadedArticleId] = useState(null);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

const handleUploadSuccess = (uploadData) => {
    console.log('Upload success data:', uploadData); // Добавьте лог
    try {
        dispatch(addNewArticle(uploadData.article));
        setUploadedArticleId(uploadData.article._id);
        setUploadStatus('success');
        setUploadError(null);
        console.log('Before navigation'); // Лог перед навигацией
        navigate('/NewsPage', { replace: true });
        console.log('After navigation'); // Лог после навигации (не должен выполняться при успехе)
    } catch (error) {
        console.error('Navigation error:', error);
    }
};

  const handleUploadError = (error) => {
    setUploadStatus('error');
    setUploadError(error.message || 'Неизвестная ошибка');
  };

  const handleReturnToProfile = () => {
    if (user && user._id) {
      navigate(`/profile/${user._id}`);
    }
  };

  if (uploadStatus === 'success') {
    return (
      <div className="min-h-screen text-white p-6">
        <div className="max-w-2xl mx-auto bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-2xl p-8 text-center">
          <div className="text-green-500 text-5xl mb-4">✓</div>
          <h2 className="text-2xl font-bold mb-4">Статья успешно опубликована!</h2>
          <p className="mb-6">Вы можете просмотреть статью или вернуться в профиль.</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate(`/article/${uploadedArticleId}`)}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Посмотреть статью
            </button>
            <button
              onClick={handleReturnToProfile}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
            >
              В профиль
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (uploadStatus === 'error') {
    return (
      <div className="min-h-screen text-white p-6">
        <div className="max-w-2xl mx-auto bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-2xl p-8 text-center">
          <div className="text-red-500 text-5xl mb-4">✗</div>
          <h2 className="text-2xl font-bold mb-4">Ошибка загрузки</h2>
          <p className="mb-6 text-red-400">{uploadError}</p>
          <button
            onClick={() => setUploadStatus(null)}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-7xl mx-auto bg-gray-800/50 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl mb-12">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-6 border-b lg:border-b-0 lg:border-r border-gray-700">
            <UploadDropzone 
              onFilesAccepted={setFiles}
              accept={{ 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] }}
              multiple={true}
            />
          </div>

          <div className="lg:w-1/2 p-8 overflow-y-auto">
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Новая статья
            </h1>
            <UploadPreview files={files} setFiles={setFiles} />
            <ArticleUploadForm 
              files={files} 
              setFiles={setFiles}
              onUploadSuccess={handleUploadSuccess}
              onUploadError={handleUploadError}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
