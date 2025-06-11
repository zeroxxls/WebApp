import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

export const EmptyCart = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="text-center py-16 md:py-24"
  >
    <div className="mx-auto w-16 h-16 text-blue-500 mb-6">
      <ShoppingBagIcon className="w-full h-full" />
    </div>
    <h2 className="text-2xl font-semibold text-gray-300 mb-3">Your cart is empty</h2>
    <p className="text-gray-500 mb-8">
      Looks like you haven't added any amazing artworks yet.
    </p>
    <Link
      to="/MainPage"
      className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105"
    >
      Explore Artworks
    </Link>
  </motion.div>
);