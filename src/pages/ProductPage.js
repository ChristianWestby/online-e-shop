import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

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
          throw new Error("Produktet ble ikke funnet");
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
  if (loading) return <p>Getting your items... Please wait!</p>;

  return (
    <>
      <h1>{product.title}</h1>
      <img 
        src={product.image?.url || "https://via.placeholder.com/150"} 
        alt={product.title} 
        onError={(e) => e.target.src = "https://via.placeholder.com/150"} 
      />
      <p>{product.description}</p>
      <p>{product.discountedPrice} NOK</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
      <Link to="/"><button>Continue to shop</button></Link>
      <Link to="/checkout"><button>Proceed to Checkout</button></Link>
    </>
  );
};

export default ProductPage;