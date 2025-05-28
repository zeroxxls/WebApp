import { useSelector } from "react-redux";

export const useTotalPrice = () => {
  const cartItems = useSelector(state => state.cart.items);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return totalPrice;
};