export const useCheckout = () => {
  const handleCheckout = (cartItems) => {
    // Логика оформления заказа
    console.log('Proceeding to checkout', cartItems);
  };
  return { handleCheckout };
};