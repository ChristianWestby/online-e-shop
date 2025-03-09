import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.body}; /* 🔹 Bruker font fra theme */
    background-color: ${({ theme }) => theme.colors.background}; /* 🔹 Bruker farge fra theme */
    color: ${({ theme }) => theme.colors.text};
  }

  h1, h2, h3 {
    font-weight: bold;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .product-list {
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing.medium}; /* 🔹 Bruker spacing fra theme */
    padding: ${({ theme }) => theme.spacing.medium};
  }

  .product-card {
    background: ${({ theme }) => theme.colors.white}; /* 🔹 Hvitt kort */
    padding: ${({ theme }) => theme.spacing.medium};
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    width: 250px;
    text-align: center;
  }

  .product-card img {
    width: 100%;
    border-radius: 5px;
  }

  button {
    background: ${({ theme }) => theme.colors.primary}; /* 🔹 Bruker primary fra theme */
    color: ${({ theme }) => theme.colors.white};
    border: none;
    padding: ${({ theme }) => theme.spacing.small};
    margin-top: ${({ theme }) => theme.spacing.small};
    cursor: pointer;
  }

  button:hover {
    background: ${({ theme }) => theme.colors.secondary}; /* 🔹 Endrer til secondary */
  }
`;

export default GlobalStyles;