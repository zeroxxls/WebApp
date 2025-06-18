import { motion, AnimatePresence } from 'framer-motion';
import { FiXCircle, FiArrowLeft } from 'react-icons/fi';

export const ErrorStatus = ({ error, onTryAgain, onReturnToProfile }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-gray-900 to-gray-800"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="max-w-md w-full bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-red-500/30"
        >
          <div className="p-8 text-center">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-red-500 rounded-full opacity-20 animate-ping"></div>
              <FiXCircle className="text-red-500 text-6xl relative" />
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-3">Upload Failed</h2>
            <div className="bg-red-900/20 rounded-lg p-4 mb-6">
              <p className="text-red-300">{error}</p>
            </div>
            
            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={onTryAgain}
                className="w-full py-3 px-6 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium rounded-lg shadow-lg hover:shadow-red-500/20 transition-all"
              >
                Try Again
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={onReturnToProfile}
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
};