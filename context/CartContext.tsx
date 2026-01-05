'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  style?: string;
  pattern?: string;
  stitching?: string;
}

export interface CartItem extends Product {
  quantity: number;
  size: string; // S, M, L
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Cargar carrito del localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('bikimar-cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    setIsLoaded(true);
  }, []);

  // Guardar carrito en localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('bikimar-cart', JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const addToCart = (product: Product, size: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item._id === product._id && item.size === size
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item._id === product._id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1, size }];
    });
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item._id === productId && item.size === size))
    );
  };

  const updateQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
