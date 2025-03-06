import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

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
  if (loading) return <p>Henter produktet... Vennligst vent.</p>;

  return (
    <>
      <h1>{product.title}</h1>
      <img 
        src={product.image?.url || "https://via.placeholder.com/150"} 
        alt={product.title} 
        onError={(e) => e.target.src = "https://via.placeholder.com/150"} 
      />
      <p>{product.description}</p>

      {/* 🔹 Anmeldelser (Reviews) */}
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

      {/* 🔹 Pris-delen */}
      {product.price > product.discountedPrice ? (
        <>
          <p>Original Price: <s>{product.price} NOK</s></p>
          <p>
            Discount: {((1 - product.discountedPrice / product.price) * 100).toFixed(0)}% 
            ({(product.price - product.discountedPrice).toFixed(2)} NOK)
          </p>
          <p>Discounted Price: {product.discountedPrice} NOK</p>
        </>
      ) : (
        <p>Price: {product.price} NOK</p>
      )}

      {/* 🔹 Knapper */}
      <button onClick={() => addToCart(product)}>Add to Cart</button>
      <Link to="/cart">
        <button>Go to Checkout</button>
      </Link>
      <Link to="/">
        <button>Continue Shopping</button>
      </Link>
    </>
  );
};

export default ProductPage;