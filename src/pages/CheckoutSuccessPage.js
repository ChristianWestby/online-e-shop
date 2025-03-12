import { Link } from "react-router-dom";
import styled from "styled-components";
import { boxShadow } from "../styles/mixins";

const SuccessPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1400px;
  margin: 40px auto;
  padding: 20px;
  ${boxShadow}
  border-radius: 10px;
`;

const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 700px;
  background: white;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
`;

const SuccessTitle = styled.h1`
  color: rgb(50, 150, 100);
  font-size: 28px;
  margin-bottom: 10px;
`;

const SuccessMessage = styled.p`
  font-size: 18px;
  color: #333;
  margin-bottom: 20px;
`;

const Button = styled(Link)`
  text-decoration: none;
  background: rgb(110, 182, 197);
  color: white;
  padding: 12px 20px;
  border-radius: 5px;
  font-size: 16px;
  transition: background 0.3s ease-in-out;
  margin-top: 10px;

  &:hover {
    background: #0056b3;
  }
`;

const CheckoutSuccessPage = () => {
  return (
    <SuccessPageContainer>
      <SuccessContainer>
        <SuccessTitle>🎉 Thank You for Your Purchase! 🎉</SuccessTitle>
        <SuccessMessage>
          Your order has been placed successfully. A confirmation email has been
          sent to your inbox.
        </SuccessMessage>

        <Button to="/">Continue Shopping</Button>
      </SuccessContainer>
    </SuccessPageContainer>
  );
};

export default CheckoutSuccessPage;
