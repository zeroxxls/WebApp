import React from "react";
import { Link } from "react-router-dom";
import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import { GiShoppingCart } from "react-icons/gi";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../hooks/useCart";

export const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity
  } = useCart();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const handleCheckout = () => {
    // Логика оформления заказа
    console.log('Proceeding to checkout', cartItems);
  };

  const relatedWorks = [
    { id: 3, title: "Abstract Cityscape", author: "Jane Smith", price: 7.50, image: "https://via.placeholder.com/100" },
    { id: 4, title: "Mystical Forest", author: "Peter Jones", price: 12.00, image: "https://via.placeholder.com/100" },
    { id: 5, title: "Steampunk Clockwork", author: "Alice Brown", price: 6.00, image: "https://via.placeholder.com/100" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 flex items-center">
          <GiShoppingCart className="mr-3 text-blue-400" />
          Your Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
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
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Список товаров */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {cartItems.map((item) => (
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
                ))}
              </AnimatePresence>
            </div>

            {/* Итоговая сумма */}
            <div className="bg-gray-800 rounded-xl p-6 h-fit sticky top-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Discount</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between border-t border-gray-700 pt-3">
                  <span className="font-medium">Total</span>
                  <span className="font-bold text-lg text-blue-400">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300 transform hover:scale-[1.02]"
              >
                Proceed to Checkout
              </button>
              <p className="text-xs text-gray-500 mt-3 text-center">
                By placing your order, you agree to our <Link to="/terms" className="text-blue-400 hover:underline">Terms of Service</Link>
              </p>
              <Link
                to="/"
                className="block text-center text-blue-400 hover:text-blue-300 mt-4 text-sm transition"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}

        {/* Больше интересных работ */}
        {cartItems.length > 0 && (
          <div className="mt-12 py-8 border-t border-gray-700">
            <h2 className="text-2xl font-semibold mb-6">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedWorks.map((work) => (
                <div key={work.id} className="bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300">
                  <img src={work.image} alt={work.title} className="w-full h-32 object-cover" />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{work.title}</h3>
                    <p className="text-gray-400 text-sm mb-2">{work.author}</p>
                    <p className="text-blue-400 font-medium">${work.price.toFixed(2)}</p>
                    <Link
                      to={`/work/${work.id}`} // Замените на реальный путь
                      className="inline-block mt-3 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg text-sm transition duration-300"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Правила использования */}
        <div className="mt-12 py-8 border-t border-gray-700 text-gray-400 text-sm">
          <h2 className="text-lg font-semibold mb-4">Usage Policy</h2>
          <p className="mb-2">
            All digital artworks purchased are for personal use only. Commercial redistribution or modification
            without explicit permission from the artist is prohibited.
          </p>
          <p className="mb-2">
            By completing your purchase, you agree to respect the intellectual property rights of the creators.
          </p>
          <p>
            For any queries regarding commercial use or licensing, please contact the artist directly.
          </p>
          <Link to="/privacy" className="text-blue-400 hover:underline mt-4 block">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
};
