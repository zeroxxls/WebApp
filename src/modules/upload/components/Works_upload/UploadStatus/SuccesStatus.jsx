import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';

export const SuccessStatus = ({ onReturnToProfile, onResetUpload }) => {
  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-gray-900 to-gray-800"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
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
                onClick={onReturnToProfile}
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-medium rounded-lg shadow-lg hover:shadow-blue-500/20 transition-all"
              >
                View Profile
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={onResetUpload}
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
};