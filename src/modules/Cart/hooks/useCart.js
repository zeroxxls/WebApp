import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, updateQuantity, clearCart } from "../../../store/slices/cartSlice";

export const useCart=()=>{
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);

    return{
        cartItems: cart.items,
        addToCart: (workData) => dispatch(addToCart(workData)),
        removeFromCart: (workId) => dispatch(removeFromCart(workId)),
        updateQuantity: (workId,quantity) => dispatch(updateQuantity({workId,quantity})),
        clearCart: ()=> dispatch(clearCart()),
    }
}