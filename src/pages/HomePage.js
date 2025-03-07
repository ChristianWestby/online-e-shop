import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
      <h1>eCom Shop Products</h1>

      <input
        type="text"
        placeholder="Search for a product..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          fontSize: "16px"
        }}
      />

      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.image?.url || "https://via.placeholder.com/150"}
                alt={product.title}
                onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
              />

              <h3>{product.title}</h3>
              <p>{product.description}</p>

              {product.price > product.discountedPrice ? (
                <>
                  <p>Original Price: <s>{product.price} NOK</s></p>
                  <p>
                    Discount:{" "}
                    {((1 - product.discountedPrice / product.price) * 100).toFixed(0)}%
                    ({(product.price - product.discountedPrice).toFixed(2)} NOK)
                  </p>
                  <p>Discounted Price: {product.discountedPrice} NOK</p>
                </>
              ) : (
                <p>Price: {product.price} NOK</p>
              )}

              <Link to={`/product/${product.id}`}>View Product</Link>
            </div>
          ))
        ) : (
          <p>No products match your search.</p>
        )}
      </div>
    </>
  );
};

export default HomePage;