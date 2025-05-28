import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const EmptyCart = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="text-center py-20"
  >
    <div className="text-6xl mb-4">🛒</div>
    <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
    <p className="text-gray-400 mb-6">
      Looks like you haven't added anything to your cart yet
    </p>
    <Link
      to="/"
      className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105"
    >
      Continue Shopping
    </Link>
  </motion.div>
);