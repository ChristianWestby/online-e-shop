import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Nav from "./Nav";

const Header = () => {
  const { cart } = useContext(CartContext);  // ✅ Henter handlekurv-data

  return (
    <header>
      <h1>eCom Shop 🛒 ({cart.length})</h1> {/* ✅ Viser antall varer i handlekurven */}
      <Nav />
    </header>
  );
};

export default Header;