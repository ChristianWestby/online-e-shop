import { css } from "styled-components";


export const media = {
  xsmall: (...args) => css`
    @media (max-width: 480px) {
      ${css(...args)}
    }
  `,
  small: (...args) => css`
    @media (max-width: 600px) {
      ${css(...args)}
    }
  `,
  medium: (...args) => css`
    @media (max-width: 768px) {
      ${css(...args)}
    }
  `,
  large: (...args) => css`
    @media (max-width: 992px) {
      ${css(...args)}
    }
  `,
  xlarge: (...args) => css`
    @media (max-width: 1200px) {
      ${css(...args)}
    }
  `,
};


export const boxShadow = css`
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.15);
`;

export const cardImage = css`
  width: 100% !important; 
  height: 180px !important; 
  min-height: 180px !important;
  object-fit: cover;
  border-radius: 5px;
  display: block;
`;

export const cardText = css`
  font-size: 14px;
  text-align: center;
  margin-top: 5px;
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis; 
  max-width: 100%;
  display: block;
`;

export const priceText = css`
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-top: auto; 
  padding-bottom: 8px;
  display: block;
`;

export const cardContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 180px;
  height: 280px; 
  padding: 10px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease-in-out;
  text-decoration: none;
  color: inherit;
  overflow: hidden;
  &:hover {
    transform: scale(1.05);
  }
`;