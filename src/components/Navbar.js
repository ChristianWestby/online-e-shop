import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaBars, FaTimes } from "react-icons/fa";
import { CartContext } from "../context/CartContext"; // 🔥 Henter CartContext

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: rgb(159, 177, 213);
  color: white;
  position: relative;
  z-index: 1000;
`;

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: black;
  color: white;
  font-size: 18px;
  font-weight: bold;
  width: 80px;
  height: 80px;
  text-align: center;
  border-radius: 5px;
  padding: 5px;
  line-height: 1.2;
`;

const CartLink = styled.div`
  margin-left: auto;
  font-size: 18px;
  position: relative;

  a {
    text-decoration: none;
    color: white;
    font-weight: bold;
  }
`;

const CartCount = styled.span`
  background: red;
  color: white;
  font-size: 12px;
  font-weight: bold;
  border-radius: 50%;
  padding: 3px 8px;
  position: absolute;
  top: -10px;
  right: -10px;
`;

// 📌 **Burger-meny (for mobilvisning)**
const Burger = styled.div`
  display: none;
  cursor: pointer;
  z-index: 1100;

  @media only screen and (max-width: 768px) {
    display: block;
  }
`;

function NavbarComponents() {
  const [open, setOpen] = useState(false);
  const { cart } = useContext(CartContext); // 🔥 Henter cart fra CartContext

  return (
    <>
      <Navbar>
        <Logo>
          eCom <br /> Shop
        </Logo>

        <CartLink>
          <Link to="/cart">
            Cart 🛒 {cart.length > 0 && <CartCount>{cart.length}</CartCount>}
          </Link>
        </CartLink>

        <Burger onClick={() => setOpen(!open)}>
          {open ? <FaTimes size={30} /> : <FaBars size={30} />}
        </Burger>
      </Navbar>
    </>
  );
}

export default NavbarComponents;