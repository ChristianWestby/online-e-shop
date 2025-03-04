import { Link } from "react-router-dom";
import CartIcon from "./CartIcon";

const Header = () => {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>
        <CartIcon />
      </nav>
    </header>
  );
};

export default Header;