import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    color: #333;
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
    gap: 20px;
    padding: 20px;
  }

  .product-card {
    background: white;
    padding: 15px;
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
    background: #007bff;
    color: white;
    border: none;
    padding: 10px;
    margin-top: 10px;
    cursor: pointer;
  }

  button:hover {
    background: #0056b3;
  }
`;

export default GlobalStyles;