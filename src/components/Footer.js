import styled from "styled-components";

// 📌 Stil for Footer
const FooterContainer = styled.footer`
  background: black;   /* 🎨 Svart bakgrunn */
  color: white;        /* 🎨 Hvit tekst */
  height: 100px;        /* 🎯 Høyde på 70px */
  display: flex;       
  align-items: center; /* 📌 Sentrer vertikalt */
  justify-content: center; /* 📌 Sentrer horisontalt */
  font-size: 16px;     
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>© 2025 My Online Shop</p>
    </FooterContainer>
  );
};

export default Footer;