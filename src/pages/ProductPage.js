import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import styled from "styled-components";
import { media, boxShadow } from "../styles/mixins";  
import { Button, ButtonLink } from "../components/Button";// 🚀 Importer mixins

// 📌 Hovedcontainer for produktet
const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.large};
  ${boxShadow} /* 🎨 Bruker boxShadow mixin */

  ${media.medium`
    padding: ${({ theme }) => theme.spacing.medium};
  `}
`;

// 📌 Flex-container for bilde og info
const ProductContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  max-width: 800px;
  text-align: left;

  ${media.medium`
    flex-direction: column;
    align-items: center;
    text-align: center;
  `}
`;

// 📌 Stil for bildet
const ProductImage = styled.img`
  width: 40%;
  max-width: 250px;
  height: auto;
  border-radius: 10px;
  ${boxShadow} /* 🎨 Bruker boxShadow mixin */

  ${media.medium`
    width: 60%;
  `}
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
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.3;
  max-width: 90%;
`;

// 📌 Stil for anmeldelser
const ReviewsContainer = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};

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

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
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
        <ProductImage
          src={product.image?.url || "https://via.placeholder.com/150"}
          alt={product.title}
          onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
        />
        <div>
          <ProductTitle>{product.title}</ProductTitle>
          <ProductDescription>{product.description}</ProductDescription>
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
  
          {/* 📌 Legg tilbake knappene her */}
          <Button onClick={() => addToCart(product)}>Add to Cart</Button>
          <ButtonLink to="/cart">Go to Checkout</ButtonLink>
          <ButtonLink to="/">Continue Shopping</ButtonLink>
        </div>
      </ProductContent>
    </ProductContainer>
  );
};

export default ProductPage;