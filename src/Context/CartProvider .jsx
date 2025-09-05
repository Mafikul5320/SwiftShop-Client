import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const index = prev.findIndex((i) => i._id === product._id);

      const price = Number(product.price) || 0;
      const discount = Number(product.discount) || 0;
      const final = price - (price * discount) / 100;

      if (index > -1) {
        const copy = [...prev];
        copy[index] = { ...copy[index], quantity: copy[index].quantity + qty };
        return copy;
      }

      return [
        ...prev,
        {
          _id: product._id,
          product_name: product.product_name,
          product_img: Array.isArray(product.product_img)
            ? product.product_img[0]
            : product.product_img,
          price,
          discount,
          finalPrice: Number(final.toFixed(2)),
          quantity: qty,
        },
      ];
    });
  };

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((i) => i._id !== id));

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);
  console.log(totalItems)
  const subtotal = cart.reduce((s, i) => s + i.finalPrice * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, totalItems, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
};
