// Upload.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadDropzone } from './UploadDropzone';
import { UploadForm } from './UploadForm/UploadForm';
import { UploadPreview } from './UploadPreview';
import { Header } from '../../Header';

export const Upload = () => {
  const [files, setFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(null); // 'success', 'error', null
  const [uploadError, setUploadError] = useState(null);
  const navigate = useNavigate();

  const handleUploadSuccess = (uploadData) => {
    setUploadStatus('success');
    setUploadError(null);
  };

  const handleUploadError = (error) => {
    setUploadStatus('error');
    setUploadError(error.message);
  };

  const handleReturnToProfile = () => {
    navigate('/profile');
  };

  if (uploadStatus === 'success') {
    return (
      <div className="min-h-screen text-white p-6">
        <div className="max-w-7xl mx-auto bg-gray-800/50 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl mb-12 p-8 text-center">
          <div className="text-green-500 text-5xl mb-4">✓</div>
          <h2 className="text-2xl font-bold mb-4">Files Uploaded Successfully!</h2>
          <p className="mb-6">Your files have been successfully uploaded to the cloud storage.</p>
          <button
            onClick={handleReturnToProfile}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Return to Profile
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
          <h2 className="text-2xl font-bold mb-4">Upload Failed</h2>
          <p className="mb-6 text-red-400">{uploadError || 'An unknown error occurred'}</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setUploadStatus(null)}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={handleReturnToProfile}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Return to Profile
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
          <div className="lg:w-1/2 p-6 border-b lg:border-b-0 lg:border-r border-gray-700">
            <UploadDropzone onFilesAccepted={setFiles} />
          </div>

          <div className="lg:w-1/2 p-8 overflow-y-auto">
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Share Your Creation
            </h1>
            <UploadPreview files={files} setFiles={setFiles} />
            <UploadForm 
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