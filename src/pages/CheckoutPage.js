import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  
  const totalPrice = cart.reduce((sum, item) => sum + item.discountedPrice, 0).toFixed(2);

  // ✅ State for checkout-form
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    address: "",
  });

  const handleInputChange = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order is sent:", customerInfo);
    clearCart(); 
    navigate("/checkout-success"); 
  };

  return (
    <div>
      <h1>Checkout</h1>

      {cart.length === 0 ? (
        <p>Basket is empty. Do some moore shopping?</p>
      ) : (
        <>
          <h2>Order Summery</h2>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.title} - {item.discountedPrice.toFixed(2)} NOK
              </li>
            ))}
          </ul>

          <h3>Total: {totalPrice} NOK</h3>

          <h2>Delivery details</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={customerInfo.name}
                onChange={handleInputChange}
                required
              />
            </label>

            <br />
            
            <label>
              E-mail:
              <input
                type="email"
                name="email"
                value={customerInfo.email}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <label>
              Adress:
              <input
                type="text"
                name="address"
                value={customerInfo.address}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <button type="submit">Complete purches</button>
          </form>
          
        </>
      )}
    </div>
  );
};

export default CheckoutPage;