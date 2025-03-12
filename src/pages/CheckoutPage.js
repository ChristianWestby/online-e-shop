import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { boxShadow } from "../styles/mixins";

const CheckoutPageContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 1400px; 
  margin: 40px auto;
  padding: 20px;
  ${boxShadow} 
  transition: transform 0.4s ease-in-out;   
  border-radius: 0px;
`;

const CheckoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 950px;
  background: white;
  padding: 30px;
  border-radius: 0px;
  transition: transform 0.2s ease-in-out;
`;

const OrderSummary = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  margin-bottom: 20px;
`;

const OrderItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  ${boxShadow}
  transition: transform 0.2s ease-in-out;
  
  &:hover {
    transform: scale(1.02);
  }
`;

const TotalPrice = styled.h3`
  font-size: 20px;
  color: #d32f2f;
  margin-top: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  gap: 15px;
  margin-top: 20px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;

  &:focus {
    outline: none;
    border-color: rgb(110, 182, 197);
    box-shadow: 0px 0px 5px rgb(110, 182, 197);
  }
`;

const SubmitButton = styled.button`
  background: rgb(110, 182, 197);
  color: white;
  padding: 12px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
  &:hover {
    background: #0056b3;
  }
`;

const CheckoutPage = () => {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const totalPrice = cart.reduce((sum, item) => sum + item.discountedPrice, 0).toFixed(2);
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
    <CheckoutPageContainer> 
      <CheckoutContainer>
        <h1>Checkout</h1>

        {cart.length === 0 ? (
          <p>Basket is empty. Do some more shopping?</p>
        ) : (
          <>
            <h2>Order Summary</h2>
            <OrderSummary>
              {cart.map((item, index) => (
                <OrderItem key={index}>
                  <span>{item.title}</span>
                  <strong>{item.discountedPrice.toFixed(2)} NOK</strong>
                </OrderItem>
              ))}
            </OrderSummary>

            <TotalPrice>Total: {totalPrice} NOK</TotalPrice>

            <h2>Delivery Details</h2>
            <Form onSubmit={handleSubmit}>
              <Input
                type="text"
                name="name"
                placeholder="Name"
                value={customerInfo.name}
                onChange={handleInputChange}
                required
              />

              <Input
                type="email"
                name="email"
                placeholder="E-mail"
                value={customerInfo.email}
                onChange={handleInputChange}
                required
              />

              <Input
                type="text"
                name="address"
                placeholder="Address"
                value={customerInfo.address}
                onChange={handleInputChange}
                required
              />

              <SubmitButton type="submit">Complete Purchase</SubmitButton>
            </Form>
          </>
        )}
      </CheckoutContainer>
    </CheckoutPageContainer>
  );
};

export default CheckoutPage;