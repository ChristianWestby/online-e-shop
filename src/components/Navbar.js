import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaBars, FaTimes } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import { media, flexCenter, boxShadow } from "../styles/mixins"; // 🚀 Importer mixins

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.medium} ${({ theme }) => theme.spacing.large}; /* 🔹 Mer padding på sidene */
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.white};
  position: relative;
  z-index: 1000;
  ${boxShadow}

  ${media.medium`
    flex-direction: column;
    text-align: center;
  `}
`;

// 📌 **Logo - Flyttet litt lenger inn**
const Logo = styled.div`
  ${flexCenter}
  flex-direction: column;
  background: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.white};
  font-size: 18px;
  font-weight: bold;
  width: 80px;
  height: 80px;
  text-align: center;
  border-radius: 5px;
  padding: 5px;
  line-height: 1.2;
  margin-left: ${({ theme }) => theme.spacing.large}; /* 🔹 Justert venstre marg */
`;

const CartLink = styled.div`
  font-size: 18px;
  position: relative;
  margin-right: ${({ theme }) => theme.spacing.large}; /* 🔹 Justert høyre marg */

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

// 📌 **Burger-meny (Kun synlig på mobil)**
const Burger = styled.div`
  display: none;
  cursor: pointer;
  z-index: 1100;
  margin-right: ${({ theme }) => theme.spacing.medium}; /* 🔹 Justerer plassering */

  ${media.medium`
    display: block;
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