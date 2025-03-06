import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useContext(CartContext);

  // ✅ Oppretter et objekt for å telle antall produkter
  const cartItemsCount = cart.reduce((acc, item) => {
    acc[item.id] = (acc[item.id] || 0) + 1;
    return acc;
  }, {});

  // ✅ Totalt antall varer i handlekurven
  const totalItems = Object.values(cartItemsCount).reduce((sum, count) => sum + count, 0);

  // ✅ Regn ut totalpris (rundet til 2 desimaler)
  const totalPrice = cart.reduce((sum, item) => sum + item.discountedPrice, 0).toFixed(2);

  return (
    <div>
      <h1>Shopping Cart</h1>

      {/* 🔹 Hvis handlekurven er tom, vis melding og "Gå til Produkter"-knapp */}
      {cart.length === 0 ? (
        <div>
          <p>Your cart is empty</p>
          <Link to="/">
            <button>Go to Products</button>
          </Link>
        </div>
      ) : (
        <>
          <ul>
            {Object.keys(cartItemsCount).map((itemId, index) => {
              const item = cart.find((product) => product.id === itemId);
              return (
                <li key={index}>
                  <h3>{item.title}</h3>
                  <p>{item.discountedPrice.toFixed(2)} NOK</p>

                  {/* 🔹 Antall produkter */}
                  <button onClick={() => removeFromCart(item.id)}>-</button>
                  <span> {cartItemsCount[itemId]} </span>
                  <button onClick={() => addToCart(item)}>+</button>

                  {/* 🔹 Fjern helt */}
                  <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </li>
              );
            })}
          </ul>

          <h3>Sum items in this order: {totalItems}</h3>
          <h2>Total: {totalPrice} NOK</h2>

          {/* 🔹 "Fortsett å handle"-knapp */}
          <Link to="/">
            <button>Continue shopping</button>
          </Link>

          {/* 🔹 Tøm handlekurven */}
          <button onClick={clearCart}>Clear Cart</button>

          {/* 🔹 Gå til checkout */}
          <Link to="/checkout">
            <button>Proceed to Checkout</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default CartPage;