"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext<any>(null);

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: any, quantity: number = 1) => {
  const existing = cart.find(
    (item) => item.id === product.id
  );

  if (existing) {
    setCart(
      cart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + quantity,
            }
          : item
      )
    );
  } else {
    setCart([
      ...cart,
      {
        ...product,
        quantity,
      },
    ]);
  }
};

  const removeFromCart = (id: string) => {
    setCart(
      cart.filter((item) => item.id !== id)
    );
  };

  const increaseQuantity = (id: string) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id: string) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };
  const clearCart = () => {
  setCart([]);
};

  return (
    <CartContext.Provider
      value={{
  cart,
  addToCart,
  removeFromCart,
  isCartOpen,
  setIsCartOpen,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
}}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);