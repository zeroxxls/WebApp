import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useCart } from '../../../Cart';

export const useAddToCartWork = (selectedWork) => {
  const userId = useSelector(state => state.auth.user?._id);
  const { cartItems, addToCart } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const isInCart = cartItems.some(item => item.workId === selectedWork?._id);

  const handleAddToCart = async () => {
    if (!selectedWork) return;
    const currentOwner = selectedWork.owner || selectedWork.author;
    if (currentOwner?._id === userId) {
      alert("You cannot add your own work to the cart.");
      return;
    }

    setIsAddingToCart(true);
    try {
      addToCart({
        workId: selectedWork._id,
        title: selectedWork.title,
        author: currentOwner?.fullName || selectedWork.author?.fullName || 'Unknown',
        price: selectedWork.price,
        image: selectedWork.files?.[0]?.url || 'https://via.placeholder.com/150',
        authorId: currentOwner?._id,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  return { handleAddToCart, isInCart, isAddingToCart };
};
