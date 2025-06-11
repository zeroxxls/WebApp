import { useDispatch } from "react-redux";
import { clearCart } from "../../../store/slices/cartSlice";

export const useCheckout = () => {
  const dispatch = useDispatch();

  const handleCheckout = async (cartItems) => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const workIdsToPurchase = cartItems.map(item => item.workId);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:4444/users/me/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ workIds: workIdsToPurchase }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Purchase successful:', data);
        alert('Purchase successful! The works have been added to your profile.');
        dispatch(clearCart());
      } else {
        const errorData = await response.json();
        console.error('Checkout failed:', errorData);
        alert(`Checkout failed: ${errorData.message || 'Something went wrong.'}`);
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('An unexpected error occurred during checkout.');
    }
  };

  return { handleCheckout };
};