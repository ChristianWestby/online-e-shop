import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.discountedPrice, 0);

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                <h3>{item.title}</h3>
                <p>{item.discountedPrice} NOK</p>
                {/* ✅ Fjernet `addToCart` her */}
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <h2>Total: {total} NOK</h2>
          <button onClick={clearCart}>Clear Cart</button>
          <Link to="/checkout">Proceed to Checkout</Link>
        </>
      )}
    </div>
  );
};

export default CartPage;