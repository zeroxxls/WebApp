import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { GiShoppingCart } from "react-icons/gi";
import { AnimatePresence } from "framer-motion";
import { EmptyCart } from "./EmptyCart";
import { CartItem } from "./CartItem";
import { OrderSummary } from "./OrderSummary";
import { RelatedWorks } from "./RelatedWorks";
import { UsagePolicy } from "./UsagePolicy";
import { useCartItems } from "../hooks/useCartItems";
import { useTotalPrice } from "../hooks/useTotalPrice";
import { useCheckout } from "../hooks/useCheckout";
import { useSelector } from "react-redux";
import { useRelatedWorks as useRelatedWorksData } from "../hooks/useRelatedWorks";
import { ModalWindow } from "../../MainContent";
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export const Cart = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const { cartItems, removeFromCart, updateQuantity } = useCartItems();
  const totalPrice = useTotalPrice();
  const { handleCheckout } = useCheckout();
  const allWorks = useSelector((state) => state.works.userWorks);
  const { relatedWorks } = useRelatedWorksData(allWorks);

  const openWorkModal = (work, user) => {
    setSelectedWork(work);
    setSelectedUser(user);
    setOpenModal(true);
  };

  const closeWorkModal = () => {
    setOpenModal(false);
    setSelectedWork(null);
    setSelectedUser(null);
  };
   const handleGoBack = () => {
    navigate(-1);
  };

  return (
     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <button onClick={handleGoBack} className="text-white hover:text-gray-300 transition duration-300 mr-4">
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center">
            <GiShoppingCart className="mr-3 text-blue-400" />
            Your Shopping Cart
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {cartItems.map((item) => (
                  <CartItem
                    key={item.workId}
                    item={item}
                    updateQuantity={updateQuantity}
                    removeFromCart={removeFromCart}
                  />
                ))}
              </AnimatePresence>
            </div>
            <OrderSummary
              totalPrice={totalPrice}
              onCheckout={() => handleCheckout(cartItems)}
            />
          </div>
        )}

        {cartItems.length > 0 && (
          <RelatedWorks
            relatedWorks={relatedWorks}
            onOpenModal={openWorkModal}
          />
        )}
        <UsagePolicy />
        {openModal && selectedWork && (
          <ModalWindow
            onClose={closeWorkModal}
            selectedWork={selectedWork}
            selectedUser={selectedUser}
          />
        )}
      </div>
    </div>
  );
};