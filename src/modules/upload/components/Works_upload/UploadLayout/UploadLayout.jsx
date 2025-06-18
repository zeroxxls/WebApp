import { motion } from 'framer-motion';
import { FiUploadCloud } from 'react-icons/fi';

export const UploadLayout = ({ children, files, setFiles }) => {
  return (
    <div className="min-h-screen text-white p-6 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto bg-gray-800/50 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl mb-12 border border-gray-700">
        <div className="flex flex-col lg:flex-row">
          {children[0]} {/* Dropzone */}
          
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
            {children[1]} {/* Preview and Form */}
          </div>
        </div>
      </div>
    </div>
  );
};