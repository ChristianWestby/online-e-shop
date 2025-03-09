import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import styled from "styled-components";

// 📌 Hovedcontainer for produktet
const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

// 📌 Flex-container for bilde og info
const ProductContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  max-width: 800px;
  text-align: left;
`;

// 📌 Stil for bildet og priser
const ProductImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  max-width: 250px;
`;

// 📌 Stil for bildet
const ProductImage = styled.img`
  width: 100%;
  max-width: 250px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

// 📌 Pris-container (Plassert under bildet)
const PriceContainer = styled.div`
  margin-top: 10px;
  text-align: center;
  font-size: 14px;

  s {
    color: #888;
  }

  strong {
    font-size: 16px;
    color: #d9534f;
  }
`;

// 📌 Container for produktinfo
const ProductInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

// 📌 Tittel-stil (Plassert til høyre for bildet)
const ProductTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 5px;
`;

// 📌 Stil for beskrivelse (Tettere samling)
const ProductDescription = styled.p`
  font-size: 14px;
  margin-bottom: 8px;
  color: #555;
  line-height: 1.3;
  max-width: 90%;
`;

// 📌 Stil for anmeldelser (Mindre skrift, nærmere "Reviews")
const ReviewsContainer = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: #666;

  h2 {
    font-size: 18px;
    margin-bottom: 5px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 5px;
    line-height: 1.4;
  }
`;

// 📌 Flex-container for "Add to Cart" og "Discounted Price" på samme linje
const CartPriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin-top: 10px;
`;

// 📌 Felles stil for knapper
const Button = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  border: none;
  background-color: #f0a500;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s ease-in-out, transform 0.2s ease-in-out;
  margin: 10px;

  &:hover {
    background-color: #ffcc00;
    transform: scale(1.05);
  }
`;

// 📌 Knapp-lenker (Plassert under Discounted Price)
const CheckoutButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 10px;
`;

const ButtonLink = styled(Link)`
  display: inline-block;
  text-decoration: none;
  padding: 8px 16px;
  font-size: 14px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  transition: background 0.3s ease-in-out, transform 0.2s ease-in-out;
  margin: 10px;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }
`;

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart, cart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://v2.api.noroff.dev/online-shop/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Product is not found");
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (error) return <p>Error: {error}</p>;
  if (loading) return <p>Getting your products... Please wait!</p>;

  return (
    <ProductContainer>
      <ProductContent>
        {/* 📌 Bildet og prisene til venstre */}
        <ProductImageContainer>
          <ProductImage
            src={product.image?.url || "https://via.placeholder.com/150"}
            alt={product.title}
            onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
          />

          {/* 📌 Prisene rett under bildet */}
          <PriceContainer>
            {product.price > product.discountedPrice ? (
              <>
                <p>Original Price: <s>{product.price} NOK</s></p>
                <p>
                  Discount: {((1 - product.discountedPrice / product.price) * 100).toFixed(0)}% 
                  ({(product.price - product.discountedPrice).toFixed(2)} NOK)
                </p>
                <CartPriceContainer>
                  <p><strong>Discounted Price: {product.discountedPrice} NOK</strong></p>
                  <Button onClick={() => addToCart(product)}>Add to Cart</Button>
                </CartPriceContainer>
              </>
            ) : (
              <>
                <p><strong>Price: {product.price} NOK</strong></p>
                <CartPriceContainer>
                  <Button onClick={() => addToCart(product)}>Add to Cart</Button>
                </CartPriceContainer>
              </>
            )}
          </PriceContainer>
        </ProductImageContainer>

        {/* 📌 Produktinfo til høyre */}
        <ProductInfo>
          <ProductTitle>{product.title}</ProductTitle>
          <ProductDescription>{product.description}</ProductDescription>

          {/* 📌 Reviews (Mindre skrift, nærmere overskriften) */}
          <ReviewsContainer>
            <h2>Reviews:</h2>
            {product.reviews && product.reviews.length > 0 ? (
              <ul>
                {product.reviews.map((review) => (
                  <li key={review.id}>
                    <strong>{review.username}:</strong> {review.description} ({review.rating}/5)
                  </li>
                ))}
              </ul>
            ) : (
              <p>No reviews available for this product.</p>
            )}
          </ReviewsContainer>
        </ProductInfo>
      </ProductContent>

      {/* 📌 Checkout-knappene under Discounted Price */}
      <CheckoutButtons>
        <ButtonLink to="/cart">Go to Checkout</ButtonLink>
        <ButtonLink to="/">Continue Shopping</ButtonLink>
      </CheckoutButtons>
    </ProductContainer>
  );
};

export default ProductPage;