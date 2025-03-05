import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { cart } = useContext(CartContext);

  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/cart">🛒 Cart ({cart.length})</Link>  {/* 🔹 Link til handlekurven */}
      </nav>
    </header>
  );
};

export default Header;