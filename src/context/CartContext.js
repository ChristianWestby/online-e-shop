import { createContext, useState } from "react";

// 1️⃣ Oppretter konteksten
export const CartContext = createContext();

// 2️⃣ Lager en provider som gjør handlekurven tilgjengelig i hele appen
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Legg til et produkt i handlekurven
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Fjern et produkt fra handlekurven
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Tøm hele handlekurven
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};


export default CartContext;