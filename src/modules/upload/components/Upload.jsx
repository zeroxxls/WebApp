import React, { useState } from 'react';
import { UploadDropzone } from './UploadDropzone';
import { UploadForm } from './UploadForm/UploadForm';
import { UploadPreview } from './UploadPreview';
import { Header } from '../../Header';

export const Upload = () => {
  const [files, setFiles] = useState([]);

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
            <UploadForm files={files} />
          </div>
        </div>
      </div>
    </div>
  );
};

