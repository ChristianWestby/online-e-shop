import styled from "styled-components";
import { Link } from "react-router-dom";
import { buttonStyle } from "../styles/mixins"; // 🔥 Importerer button mixin

export const Button = styled.button`
  ${buttonStyle} /* 🎨 Bruker miksin */
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const ButtonLink = styled(Link)`
  ${buttonStyle} /* 🎨 Bruker miksin */
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  text-decoration: none;

  &:hover {
    background-color: ${({ theme }) => theme.colors.danger};
  }
`;