import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);  // ✅ Legger til loading-state
  const [error, setError] = useState(null);  // ✅ Legger til feilhåndtering

  useEffect(() => {
    setLoading(true);
    fetch("https://v2.api.noroff.dev/online-shop")
      .then((res) => res.json())
      .then((data) => {
        console.log("API-respons:", data);
        setProducts(data.data || []);  // ✅ Sørger for at `products` alltid er en array
        setLoading(false);
      })
      .catch((error) => {
        console.error("API feil:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // ✅ Viser "Laster inn..." mens API-et henter data
  if (loading) return <p>Laster inn produkter...</p>;

  // ✅ Viser feilmelding hvis API-kallet feiler
  if (error) return <p>Feil: {error}</p>;

  return (
    <>
      <h1>Online Shop</h1>
      <div className="product-list">
        {Array.isArray(products) && products.map((product) => (
          <div key={product.id} className="product-card">
           <img  src={product.image?.url || "https://via.placeholder.com/150"} alt={product.title} 
           onError={(e) => e.target.src = "https://via.placeholder.com/150"} />

            <h3>{product.title}</h3>
            <p>{product.discountedPrice} NOK</p>
            <Link to={`/product/${product.id}`}>View Product</Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomePage;