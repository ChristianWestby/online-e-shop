import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaBars, FaTimes } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import { media, boxShadow } from "../styles/mixins";

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.medium}
    ${({ theme }) => theme.spacing.large};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.white};
  position: relative;
  z-index: 1000;
  ${boxShadow}
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.white};
  font-size: 18px;
  font-weight: bold;
  width: 80px;
  height: 80px;
  text-align: center;
  border-radius: 5px;
  padding: 5px;
  margin-left: 48px; /* 🚀 Justerer for å stå på linje med kortene */
`;

const NavLinks = styled.div`
  display: flex;
  gap: 30px; /* 🔹 Justerer avstand mellom linkene */
  margin-left: -830px; /* 🚀 Flytter linkene nærmere logo */

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.white};
    font-weight: bold;
    font-size: 16px;
    transition: 0.3s;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const CartLink = styled.div`
  font-size: 18px;
  position: relative;
  margin-right: 60px; /* 🚀 Matcher venstre marg på logo */

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.white};
    font-weight: bold;
  }
`;

const CartCount = styled.span`
  background: ${({ theme }) => theme.colors.danger};
  color: ${({ theme }) => theme.colors.white};
  font-size: 12px;
  font-weight: bold;
  border-radius: 50%;
  padding: 3px 8px;
  position: absolute;
  top: -10px;
  right: -10px;
`;

const Burger = styled.div`
  display: none;
  cursor: pointer;
  z-index: 1100;
  ${media.medium`display: block;
  `}
`;

function NavbarComponent() {
  const [open, setOpen] = useState(false);
  const { cart } = useContext(CartContext);

  return (
    <>
      <Navbar>
        <Logo>
          eCom <br /> Shop
        </Logo>

        <NavLinks>
          <Link to="/">Home</Link>
          <Link to="/contact">Contact</Link>
        </NavLinks>

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

export default NavbarComponent;
