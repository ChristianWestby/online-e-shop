import styled from "styled-components";
import { Link } from "react-router-dom";

const BaseButton = styled.button`
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  border-radius: 6px;
  padding: 12px 24px;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease-in-out, transform 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 45px;
  min-width: 180px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  }
`;


export const AddToCartButton = styled(BaseButton)`
  background:rgb(110, 182, 197); /* Grønn */
  color: white;
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
  }
`;

export const ContinueShoppingButton = styled(BaseButton)`
  background: ${({ theme }) => theme.colors.text}; 
  color: white;
  &:hover {
    background: ${({ theme }) => theme.colors.primary}; 
  }
`;

export const GoToCheckOutButton = styled(Link)`
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${({ theme }) => theme.colors.text};
  color: white;
  text-align: center;
  text-decoration: none;
  display: flex; /* 
  justify-content: center;
  align-items: center;
  width: 180px; 
  height: 45px; 
  padding: 12px 24px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease-in-out, transform 0.2s ease-in-out;
  vertical-align: middle; 
  margin-top: 8px; 
  &:hover {
    background: ${({ theme }) => theme.colors.primary}; 
    transform: translateY(-2px);
  }
`;