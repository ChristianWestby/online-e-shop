import { css } from "styled-components";

// 🎯 **Responsiv miksin** for ulike skjermstørrelser
export const media = {
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
};

// 🎯 **Flexbox miksin** for enklere sentrering
export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 🎯 **Box Shadow miksin** for enkle skyggeeffekter
export const boxShadow = css`
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

// 🎯 **Knapp-miksin** for konsistent styling på knapper
export const buttonStyle = css`
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  font-size: 14px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s ease-in-out, transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;