import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  padding: 20px;
  height: 70px; /* 🔹 Sørger for at footeren har en fast høyde */
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>© 2025 My Online Shop</p>
    </FooterContainer>
  );
};

export default Footer;