import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);  // Ny state for loading
  const [error, setError] = useState(null);  // Ny state for feilhåndtering

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://v2.api.noroff.dev/online-shop/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Produktet ble ikke funnet");
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);  // ✅ useEffect kjører hver gang `id` endres

  // ✅ Viser feilmelding hvis API-kallet feiler
  if (error) return <p>Error: {error}</p>;

  // ✅ Viser en "loading"-melding mens data hentes
  if (loading) return <p>Henter produktet... Vennligst vent.</p>;

  return (
    <>
      <h1>{product.title}</h1>
      <img src={product.imageUrl} alt={product.title} />
      <p>{product.description}</p>
      <p>{product.discountedPrice} NOK</p>
    </>
  );
};

export default ProductPage;