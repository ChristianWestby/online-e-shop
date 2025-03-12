import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { boxShadow } from "../styles/mixins";

const HeaderSection = styled.div`
  width: 100%;
  max-width: 1400px;
  height: 250px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2)),
    url("https://source.unsplash.com/1400x400/?shopping,store") center/cover
      no-repeat;
  color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${boxShadow};

  h1 {
    font-size: 32px;
    margin-bottom: 10px;
  }

  p {
    font-size: 18px;
    max-width: 800px;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  width: 100%;
  max-width: 1400px;
  margin: 40px auto;
  padding: 20px;
  ${boxShadow}
  border-radius: 10px;
  background: #f8f8f8;
`;

const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  ${boxShadow}
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 8px;
`;

const ProductTitle = styled.h3`
  font-size: 18px;
  margin: 12px 0;
`;

const ProductDescription = styled.p`
  font-size: 14px;
  color: #666;
  flex-grow: 1;
`;

const PriceContainer = styled.div`
  margin: 12px 0;
  font-size: 16px;
  font-weight: bold;
`;

const OriginalPrice = styled.p`
  font-size: 14px;
  color: #888;
  text-decoration: line-through;
`;

const DiscountedPrice = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #d32f2f;
`;

const Button = styled(Link)`
  text-decoration: none;
  background: rgb(110, 182, 197);
  color: white;
  padding: 10px 15px;
  border-radius: 6px;
  font-size: 16px;
  transition: background 0.3s ease-in-out;
  &:hover {
    background: #f0a500;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px auto;
  width: 350px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.15);
  padding: 8px 12px;
`;

const SearchIcon = styled(FaSearch)`
  color: #666;
  font-size: 18px;
  margin-right: 10px;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  font-size: 16px;
  flex: 1;
  padding: 6px;
`;

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("https://v2.api.noroff.dev/online-shop")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("API feil:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <>
      <HeaderSection>
        <h1>Welcome to eCom Shop</h1>
        <p>Find the best deals on all your favorite products!</p>
      </HeaderSection>
      <SearchContainer>
        <SearchIcon />
        <SearchInput
          type="text"
          placeholder="Search for a product..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchContainer>

      <ProductGrid>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id}>
              <ProductImage
                src={product.image?.url || "https://via.placeholder.com/220"}
                alt={product.title}
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/220")
                }
              />

              <ProductTitle>{product.title}</ProductTitle>
              <ProductDescription>{product.description}</ProductDescription>

              <PriceContainer>
                {product.price > product.discountedPrice ? (
                  <>
                    <OriginalPrice>{product.price} NOK</OriginalPrice>
                    <DiscountedPrice>
                      {product.discountedPrice} NOK
                    </DiscountedPrice>
                  </>
                ) : (
                  <DiscountedPrice>{product.price} NOK</DiscountedPrice>
                )}
              </PriceContainer>

              <Button to={`/product/${product.id}`}>View Product</Button>
            </ProductCard>
          ))
        ) : (
          <p>No products match your search.</p>
        )}
      </ProductGrid>
    </>
  );
};

export default HomePage;
