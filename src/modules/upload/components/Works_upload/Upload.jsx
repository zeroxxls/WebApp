import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadDropzone } from '../../ui/UploadDropzone';
import { UploadForm } from './UploadForm/UploadForm';
import { UploadPreview } from './UploadPreview';
import { useSelector, useDispatch } from 'react-redux';
import { addNewWork } from '../../../../store/slices/workSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiXCircle, FiArrowLeft, FiUploadCloud } from 'react-icons/fi';
import { RiCloseLine } from 'react-icons/ri';

export const Upload = () => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleUploadSuccess = (uploadData) => {
    dispatch(addNewWork(uploadData.work));
    setUploadStatus('success');
    setUploadError(null);
  };

  const handleUploadError = (error) => {
    setUploadStatus('error');
    setUploadError(error.message || 'An unknown error occurred');
  };

  const handleReturnToProfile = () => {
    user?._id && navigate(`/profile/${user._id}`);
  };

  const resetUpload = () => {
    setUploadStatus(null);
    setFiles([]);
  };

  // Анимации
  const successVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring', 
        stiffness: 100,
        damping: 15
      }
    },
    exit: { opacity: 0, y: -20 }
  };

  const errorVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: 'spring', 
        stiffness: 100
      }
    }
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  };

  if (uploadStatus === 'success') {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-gray-900 to-gray-800"
        >
          <motion.div
            variants={successVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="max-w-md w-full bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-gray-700"
          >
            <div className="p-8 text-center">
              <motion.div
                animate={pulseAnimation}
                className="inline-flex items-center justify-center mb-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500 rounded-full opacity-20 animate-ping"></div>
                  <FiCheckCircle className="text-green-500 text-6xl relative" />
                </div>
              </motion.div>
              
              <h2 className="text-3xl font-bold text-white mb-3">Upload Complete!</h2>
              <p className="text-gray-300 mb-8">Your files are now available in your profile.</p>
              
              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleReturnToProfile}
                  className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-medium rounded-lg shadow-lg hover:shadow-blue-500/20 transition-all"
                >
                  View Profile
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={resetUpload}
                  className="w-full py-3 px-6 bg-gray-700 text-gray-300 font-medium rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Upload More
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  if (uploadStatus === 'error') {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-gray-900 to-gray-800"
        >
          <motion.div
            variants={errorVariants}
            initial="hidden"
            animate="visible"
            className="max-w-md w-full bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-red-500/30"
          >
            <div className="p-8 text-center">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-red-500 rounded-full opacity-20 animate-ping"></div>
                <FiXCircle className="text-red-500 text-6xl relative" />
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-3">Upload Failed</h2>
              <div className="bg-red-900/20 rounded-lg p-4 mb-6">
                <p className="text-red-300">{uploadError}</p>
              </div>
              
              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={resetUpload}
                  className="w-full py-3 px-6 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium rounded-lg shadow-lg hover:shadow-red-500/20 transition-all"
                >
                  Try Again
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleReturnToProfile}
                  className="w-full py-3 px-6 bg-gray-700 text-gray-300 font-medium rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
                >
                  <FiArrowLeft />
                  Return to Profile
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div className="min-h-screen text-white p-6 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto bg-gray-800/50 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl mb-12 border border-gray-700">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-6 border-b lg:border-b-0 lg:border-r border-gray-700">
            <UploadDropzone
             onFilesAccepted={setFiles}
             existingFiles={files} 
             />
          </div>

          <div className="lg:w-1/2 p-8 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 mb-6"
            >
              <FiUploadCloud className="text-3xl text-blue-400" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Share Your Creation
              </h1>
            </motion.div>
            
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