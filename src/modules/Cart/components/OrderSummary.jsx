import React from "react";
import { Link } from "react-router-dom";

export const OrderSummary = ({ totalPrice, onCheckout }) => (
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
      onClick={onCheckout}
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
);