import { useSelector, useDispatch } from "react-redux";
import { removeFromCart as remove, updateQuantity as update } from "../../../store/slices/cartSlice";

export const useCartItems = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const removeFromCart = (workId) => {
    dispatch(remove(workId));
  };

  const updateQuantity = (workId, quantity) => {
    dispatch(update({ workId, quantity }));
  };

  return { cartItems, removeFromCart, updateQuantity };
};