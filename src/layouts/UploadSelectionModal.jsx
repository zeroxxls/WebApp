import React from 'react';
import { useNavigate } from 'react-router-dom';

export const UploadSelectionModal = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-white">What would you like to upload?</h2>
        
        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={() => navigate('/UploadPage')}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
          >
            <span className="mr-2">3D/2D Work</span>
          </button>
          
          <button
            onClick={() => navigate('/ArticleUploadPage')}
            className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
          >
            <span className="mr-2">Article</span>
          </button>
        </div>
        
        <button
          onClick={onClose}
          className="mt-6 text-gray-400 hover:text-white w-full py-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};