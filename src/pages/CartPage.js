import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { boxShadow } from "../styles/mixins"; 


const CartPageContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 1400px; 
  margin: 40px auto;
  padding: 20px;
  ${boxShadow} 
  border-radius: 0px;
`;

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  max-width: 950px; 
  background: white;
  padding: 30px;
  border-radius: 0px;
   ${boxShadow}
    transition: transform 0.2s ease-in-out; 
  border-radius: 0px;
`;

const CartList = styled.ul`
  list-style: none;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const CartItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  ${boxShadow} 
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.02);
  }
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 5px;
`;

const ProductTitle = styled.h3`
  font-size: 16px;
  margin: 0;
`;

const ProductPrice = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: #d32f2f;
  margin: 15px;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 15px;

  button {
    background: rgb(110, 182, 197);
    color: white;
    padding: 6px 10px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s;
    &:hover {
      background: #0056b3;
    }
  }
`;

const CartActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 30px;

  a, button {
    background: rgb(110, 182, 197);
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    font-size: 16px;
    text-decoration: none;
    text-align: center;
    cursor: pointer;
    transition: background 0.3s;
    border: none;
    margin: 8px;

    &:hover {
      background: #0056b3;
    }
  }
`;

const CartPage = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useContext(CartContext);
  const cartItemsCount = cart.reduce((acc, item) => {
    acc[item.id] = (acc[item.id] || 0) + 1;
    return acc;
  }, {}
);

  const totalItems = Object.values(cartItemsCount).reduce((sum, count) => sum + count, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.discountedPrice, 0).toFixed(2);

  return (
    <CartPageContainer> 
      <CartContainer> 
        <h1>Shopping Cart</h1>
        
        {cart.length === 0 ? (
          <div>
            <p>Your cart is empty</p>
            <Link to="/">
              <button>Go to Products</button>
            </Link>
          </div>
        ) : (
          <>
            <CartList>
              {Object.keys(cartItemsCount).map((itemId, index) => {
                const item = cart.find((product) => product.id === itemId);
                return (
                  <CartItem key={index}>
                    <ProductInfo>
                      <ProductImage 
                        src={item.image?.url || "https://via.placeholder.com/60"} 
                        alt={item.title} 
                      />
                      <div>
                        <ProductTitle>{item.title}</ProductTitle>
                        <ProductPrice>{item.discountedPrice.toFixed(2)} NOK</ProductPrice>
                      </div>
                    </ProductInfo>

                    <QuantityControls>
                      <button onClick={() => removeFromCart(item.id)}>-</button>
                      <span>{cartItemsCount[itemId]}</span>
                      <button onClick={() => addToCart(item)}>+</button>
                    </QuantityControls>

                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                  </CartItem>
                );
              })}
            </CartList>

            <h3>Sum items in this order: {totalItems}</h3>
            <h2>Total: {totalPrice} NOK</h2>

            <CartActions>
              <Link to="/">Continue shopping</Link>
              <button onClick={clearCart}>Clear Cart</button>
              <Link to="/checkout">Proceed to Checkout</Link>
            </CartActions>
          </>
        )}
      </CartContainer>
    </CartPageContainer>
  );
};

export default CartPage;