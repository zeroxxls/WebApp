import React from 'react'
import { ActionBtn } from '../../ui/ActionBtn'
import { IoMdAddCircle, IoMdAddCircleOutline } from "react-icons/io";

export const PriceBlock = ({ price, isAddingToCart, handleAddToCart }) => (
  <div className="flex flex-col gap-4 p-4 rounded-2xl border border-gray-700 bg-gray-800 shadow-md mb-8">
    <h2 className="text-xl font-bold text-white">
      Cost: <span className="text-green-400">{price}$</span>
    </h2>
    <ActionBtn variant="cart" isActive={isAddingToCart} onClick={handleAddToCart}>
      {isAddingToCart ? (
        <IoMdAddCircle className="w-6 h-6 text-green-400" />
      ) : (
        <IoMdAddCircleOutline className="w-6 h-6" />
      )}
      <span>{isAddingToCart ? 'Added' : 'Add to Cart'}</span>
    </ActionBtn>
  </div>
)
