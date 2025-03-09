import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa"; // 🔍 Importerer søkeikon

// 📌 Grid-container for produkter
const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); 
  gap: 20px;
  padding: 20px;
  justify-items: center;
`;

// 📌 Stil for hvert produktkort
const ProductCard = styled.div`
  width: 250px;
  height: 460px; /* 🔥 Justert høyde for å få plass til rabatten */
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: #fff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

// 📌 Ensartet bildestørrelse
const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
`;

// 📌 Stil for tittel og tekst
const ProductTitle = styled.h3`
  font-size: 16px;
  margin: 10px 0;
`;

const ProductDescription = styled.p`
  font-size: 14px;
  color: #666;
  flex-grow: 1;
`;

// 📌 Pris-styling
const PriceContainer = styled.div`
  margin: 10px 0;
`;

const OriginalPrice = styled.p`
  font-size: 14px;
  color: #888;
  text-decoration: line-through;
`;

const DiscountedPrice = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #d32f2f;
`;

const DiscountInfo = styled.p`
  font-size: 14px;
  color: #d32f2f;
  font-weight: bold;
`;

// 📌 Knapper
const Button = styled(Link)`
  text-decoration: none;
  background:rgb(110, 182, 197);
  color: white;
  padding: 8px 12px;
  border-radius: 5px;
  font-size: 14px;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: #0056b3;
  }
`;

// 📌 Søke-container for sentrert søkefelt med ikon
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  width: 300px; /* 🔥 Gjør søkefeltet smalere */
  background: white;
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  padding: 5px 10px;
`;

const SearchIcon = styled(FaSearch)`
  color: #666;
  font-size: 16px;
  margin-right: 8px;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  font-size: 14px;
  flex: 1;
  padding: 5px;
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
        console.log("API-respons:", data);
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

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) 
  );

  return (
    <>
    

      {/* 🔍 Søkefelt med ikon */}
      <SearchContainer>
        <SearchIcon />
        <SearchInput
          type="text"
          placeholder="Search for a product..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchContainer>

      <ProductList>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id}>
              <ProductImage
                src={product.image?.url || "https://via.placeholder.com/200"}
                alt={product.title}
                onError={(e) => (e.target.src = "https://via.placeholder.com/200")}
              />

              <ProductTitle>{product.title}</ProductTitle>
              <ProductDescription>{product.description}</ProductDescription>

              {/* 🔥 Prisvisning - med eller uten rabatt */}
              <PriceContainer>
                {product.price > product.discountedPrice ? (
                  <>
                    <OriginalPrice>{product.price} NOK</OriginalPrice>
                    <DiscountInfo>
                      Rabatt:{" "}
                      {((1 - product.discountedPrice / product.price) * 100).toFixed(0)}%  
                      ({(product.price - product.discountedPrice).toFixed(2)} NOK)
                    </DiscountInfo>
                    <DiscountedPrice>{product.discountedPrice} NOK</DiscountedPrice>
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
      </ProductList>
    </>
  );
};

export default HomePage;