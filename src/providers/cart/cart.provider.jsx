import React, { createContext, useState, useEffect } from "react";

import {
  addItemToCart,
  decreaseItemQuantity,
  filterItemFromCart,
  getCartItemsCount,
  getCartTotalValue,
} from "./cart.utils";

export const CartContext = createContext({
  hidden: true,
  toggleHidden: () => {},
  cartItems: [],
  addItem: () => {},
  clearItem: () => {},
  decreaseQuantity: () => {},
  cartItemsCount: 0,
  cartTotalValue: 0,
});

export const CartProvider = ({ children }) => {
  const cartItemsFromStorage = () =>
    JSON.parse(window.localStorage.getItem("cartItems"));
  const [cartItems, setCartItems] = useState(cartItemsFromStorage() || []);

  const [hidden, setHidden] = useState(true);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [cartTotalValue, setCartTotalValue] = useState(0);

  const addItem = (item) => setCartItems(addItemToCart(cartItems, item));
  const decreaseQuantity = (item) =>
    setCartItems(decreaseItemQuantity(cartItems, item));
  const toggleHidden = () => setHidden(!hidden);
  const clearItem = (item) => setCartItems(filterItemFromCart(cartItems, item));

  useEffect(() => {
    setCartTotalValue(getCartTotalValue(cartItems));
    setCartItemsCount(getCartItemsCount(cartItems));
    window.localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        hidden,
        toggleHidden,
        cartItems,
        addItem,
        clearItem,
        decreaseQuantity,
        cartItemsCount,
        cartTotalValue,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
