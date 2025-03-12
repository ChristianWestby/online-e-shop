import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import styled from "styled-components";
import { media, boxShadow } from "../styles/mixins";
import {
  AddToCartButton,
  GoToCheckOutButton,
  ContinueShoppingButton,
} from "../components/Button";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.large};
  ${boxShadow}

  ${media.medium`
    padding: ${({ theme }) => theme.spacing.medium};
  `}
`;

const ProductContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  max-width: 1000px;
  text-align: left;
  width: 100%;

  ${media.medium`
    flex-direction: column;
    align-items: center;
    text-align: center;
  `}
`;

const ProductImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
  max-width: 400px;
  margin-left: ${({ theme }) => theme.spacing.large};

  ${media.medium`
    width: 100%;
    align-items: center;
    margin-left: 0;
  `}
`;

const ProductImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 10px;
  ${boxShadow}

  ${media.medium`
    max-width: 300px;
  `}
`;

const ProductInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 60%;

  ${media.medium`
    align-items: center;
    text-align: center;
    max-width: 100%;
  `}
`;

const ProductTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 5px;
`;

const ProductDescription = styled.p`
  font-size: 14px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.3;
  max-width: 90%;
`;

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

const PriceContainer = styled.div`
  margin-top: 20px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};

  s {
    color: black;
    font-size: 14px;
  }

  .discount {
    color: ${({ theme }) => theme.colors.danger};
    font-size: 16px;
    font-weight: bold;
  }

  .current-price {
    font-size: 18px;
    font-weight: bold;
    color: black;
    margin-top: 5px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 20px;

  ${media.medium`
    flex-direction: column;
    align-items: center;
  `}

  button, a {
    min-width: 180px;
    min-height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    border-radius: 6px;
    padding: 12px 24px;
    border: none;
    cursor: pointer;
    transition: background 0.3s ease-in-out, transform 0.2s ease-in-out;
  }

  a {
    background: ${({ theme }) => theme.colors.text};
    color: white;
  }

  a:hover,
  button:hover {
    background: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  }
`;

const CarouselWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  margin-top: 40px;
  padding: ${({ theme }) => theme.spacing.medium};
  text-align: center;
`;

const ProductCarouselContainer = styled.div`
  .slick-slide img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
`;

const ProductCard = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 180px;
  height: 260px;
  padding: 15px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease-in-out;
  margin: 10px;

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 100%;
    height: 120px;
    object-fit: cover;
    border-radius: 5px;
  }

  h3 {
    font-size: 14px;
    text-align: center;
    margin-top: 5px;
  }

  p {
    font-size: 12px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    setLoading(true);

    fetch(`https://v2.api.noroff.dev/online-shop/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });

    fetch("https://v2.api.noroff.dev/online-shop")
      .then((res) => res.json())
      .then((data) => {
        setRelatedProducts(data.data.slice(0, 10));
      })
      .catch((err) => console.error("Error fetching related products:", err));
  }, [id]);

  if (error) return <p>Error: {error}</p>;
  if (loading) return <p>Getting your products... Please wait!</p>;

  return (
    <ProductContainer>
      <ProductContent>
        <ProductImageContainer>
          <ProductImage
            src={product.image?.url || "https://via.placeholder.com/150"}
            alt={product.title}
          />
        </ProductImageContainer>

        <ProductInfo>
          <ProductTitle>{product.title}</ProductTitle>
          <ProductDescription>{product.description}</ProductDescription>

          <ReviewsContainer>
            <h2>Reviews:</h2>
            {product.reviews && product.reviews.length > 0 ? (
              <ul>
                {product.reviews.map((review, index) => (
                  <li key={index}>
                    <strong>{review.username}:</strong> {review.description} (
                    {review.rating}/5)
                  </li>
                ))}
              </ul>
            ) : (
              <p>No reviews available for this product.</p>
            )}
          </ReviewsContainer>

          <PriceContainer>
            {product.discountedPrice < product.price ? (
              <>
                <p>
                  Original Price: <s>{product.price} NOK</s>
                </p>
                <p className="discount">
                  Discounted Price: {product.discountedPrice} NOK
                </p>
              </>
            ) : (
              <p className="current-price">Price: {product.price} NOK</p>
            )}
          </PriceContainer>

          <ButtonContainer>
            <AddToCartButton onClick={() => addToCart(product)}>
              Add to Cart
            </AddToCartButton>
            <GoToCheckOutButton to="/cart">Go to Checkout</GoToCheckOutButton>
            <ContinueShoppingButton onClick={() => navigate("/")}>
              Continue Shopping
            </ContinueShoppingButton>
          </ButtonContainer>
        </ProductInfo>
      </ProductContent>

      <CarouselWrapper>
        <h2>Recommended Products</h2>
        <ProductCarouselContainer>
          <Slider dots arrows slidesToShow={5}>
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} to={`/product/${item.id}`}>
                <img
                  src={item.image?.url || "https://via.placeholder.com/100"}
                  alt={item.title}
                />
                <h3>{item.title}</h3>
                <p>{item.price} NOK</p>
              </ProductCard>
            ))}
          </Slider>
        </ProductCarouselContainer>
      </CarouselWrapper>
    </ProductContainer>
  );
};

export default ProductPage;
