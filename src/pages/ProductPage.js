import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
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
      <img src={product.image.url} alt={product.title} />
      <p>{product.description}</p>
      <p>{product.discountedPrice} NOK</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </>
  );
};

export default ProductPage;