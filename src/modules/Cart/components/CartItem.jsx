import React from "react";
import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import { motion } from "framer-motion";

export const CartItem = ({ item, updateQuantity, removeFromCart }) => (
  <motion.div
    key={item.workId}
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, x: -100 }}
    transition={{ duration: 0.3 }}
    className="bg-gray-800 rounded-xl p-5 flex flex-col sm:flex-row items-center gap-5 hover:bg-gray-700 transition duration-300"
  >
    <div className="w-24 h-24 flex-shrink-0">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover rounded-lg"
      />
    </div>
    <div className="flex-grow">
      <h3 className="font-semibold text-lg">{item.title}</h3>
      <p className="text-gray-400 text-sm">{item.author}</p>
      <p className="text-blue-400 font-medium mt-1">
        ${item.price.toFixed(2)}
      </p>
    </div>
    <div className="flex items-center space-x-3">
      <button
        onClick={() => updateQuantity(
          item.workId,
          Math.max(1, item.quantity - 1)
        )}
        className="p-1 rounded-full bg-gray-700 hover:bg-gray-600 transition"
      >
        <FiMinus className="w-4 h-4" />
      </button>
      <span className="font-medium w-6 text-center">
        {item.quantity}
      </span>
      <button
        onClick={() => updateQuantity(
          item.workId,
          item.quantity + 1)
        }
        className="p-1 rounded-full bg-gray-700 hover:bg-gray-600 transition"
      >
        <FiPlus className="w-4 h-4" />
      </button>
    </div>
    <button
      onClick={() => removeFromCart(item.workId)}
      className="p-2 text-red-400 hover:text-red-300 transition"
    >
      <FiTrash2 className="w-5 h-5" />
    </button>
  </motion.div>
);