import React from 'react';

export const ImagePreview = ({ files, removeFile, previewIndex = 0 }) => {
  if (!files.length) return null;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium text-white">Selected Files</h2>
        <span className="text-sm text-gray-400">
          {files.length} {files.length === 1 ? 'изображение' : 'изображений'}
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {files.map((file, index) => (
          <div key={index} className="relative group rounded-lg overflow-hidden">
            <div className="aspect-square bg-gray-700/50 flex items-center justify-center">
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview ${index}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col justify-between p-2 transition-opacity">
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="self-end bg-red-500/80 hover:bg-red-500 rounded-full w-6 h-6 flex items-center justify-center transition-colors"
              >
                ×
              </button>
              <p className="text-xs text-white truncate bg-black/50 rounded px-1 py-0.5">
                {file.name}
              </p>
            </div>
            {index === previewIndex && (
              <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                Preview
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};