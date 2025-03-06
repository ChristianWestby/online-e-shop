import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";

const Nav = () => {
    const { cart } = useContext(CartContext);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
        <Link to="/cart">🛒 Cart ({cart?.length || 0})</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;