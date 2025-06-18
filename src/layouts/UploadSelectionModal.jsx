import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiImage, FiFileText } from 'react-icons/fi';

export const UploadSelectionModal = () => {
  const navigate = useNavigate();
  const [hoveredOption, setHoveredOption] = useState(null);

  const options = [
    {
      id: '3d',
      title: '3D/2D Work',
      icon: <FiImage className="text-2xl" />,
      color: 'from-blue-500 to-cyan-400',
      route: '/UploadPage'
    },
    {
      id: 'article',
      title: 'Article',
      icon: <FiFileText className="text-2xl" />,
      color: 'from-purple-500 to-pink-400',
      route: '/ArticleUploadPage'
    }
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-gray-900/97  flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ type: 'spring', damping: 25 }}
          className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-md w-full relative overflow-hidden"
        >
          {hoveredOption && (
            <motion.div
              className={`absolute inset-0 opacity-10 bg-gradient-to-r ${options.find(o => o.id === hoveredOption)?.color} pointer-events-none`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              transition={{ duration: 0.3 }}
            />
          )}

          <div className="relative z-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Create New Content
              </h2>
            </div>

            <div className="space-y-3">
              {options.map((option) => (
                <motion.button
                  key={option.id}
                  onClick={() => navigate(option.route)}
                  onHoverStart={() => setHoveredOption(option.id)}
                  onHoverEnd={() => setHoveredOption(null)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full p-4 rounded-lg flex items-center transition-all duration-300 bg-gray-800 hover:bg-gray-700 border border-gray-700 relative overflow-hidden group`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${option.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  <div className="relative z-10 flex items-center">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${option.color} mr-4`}>
                      {option.icon}
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-white">{option.title}</h3>
                      <p className="text-sm text-gray-400 group-hover:text-gray-300">
                        {option.id === '3d' ? 'Upload 3D models or 2D artwork' : 'Publish a new article'}
                      </p>
                    </div>
                  </div>
                  <div className="ml-auto text-gray-400 group-hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </motion.button>
              ))}
            </div>

            <motion.button
              onClick={()=> navigate(-1)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-6 w-full py-2.5 text-gray-300 hover:text-white transition-colors font-medium"
            >
              Maybe later
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};