import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export const UploadDropzone = ({ onFilesAccepted }) => {
  const [localFiles, setLocalFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const filesWithPreview = acceptedFiles.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setLocalFiles(filesWithPreview);
    onFilesAccepted(filesWithPreview);
  }, [onFilesAccepted]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
      'video/*': ['.mp4', '.mov', '.avi'],
      'application/zip': ['.zip', '.rar'],
      'model/*': ['.obj', '.fbx', '.blend', '.gltf']
    },
    maxFiles: 10
  });

  useEffect(() => {
    return () => {
      localFiles.forEach(file => URL.revokeObjectURL(file.preview));
    };
  }, [localFiles]);

  return (
    <div
      {...getRootProps()}
      className={`h-full flex flex-col items-center justify-center p-8 rounded-xl transition-all duration-300 ${
        isDragActive
          ? 'bg-blue-900/20 border-2 border-dashed border-blue-400'
          : 'bg-gray-700/30 border-2 border-dashed border-gray-600 hover:border-blue-400 hover:bg-gray-700/50'
      }`}
    >
      <input {...getInputProps()} />
      <div className="text-center max-w-md space-y-4">
        {isDragActive ? (
          <div className="space-y-2">
            <div className="text-blue-400 text-5xl animate-bounce">↑</div>
            <h3 className="text-xl font-medium text-blue-400">Drop files to upload</h3>
          </div>
        ) : (
          <>
            <div className="inline-flex p-4 bg-gray-700 rounded-full">
              <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <h3 className="text-xl font-medium">Drag & drop files</h3>
            <p className="text-gray-400">or click to browse</p>
            <div className="pt-4">
              <p className="text-xs text-gray-500">
                Supports: JPEG, PNG, GIF, MP4, MOV, OBJ, FBX, BLEND, ZIP
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
