import styled from "styled-components";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"; // 📌 Ikoner for sosiale medier

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.white};
  padding: 40px 20px; /* 📌 Økt padding for bedre utseende */
  text-align: center;
  width: 100%;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  h3 {
    margin-bottom: 10px;
    font-size: 18px;
  }

  p {
    font-size: 14px;
    color: #ccc;
    margin: 5px 0;
  }

  a {
    color: #ccc;
    text-decoration: none;
    font-size: 14px;
    transition: color 0.3s;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 10px;

  a {
    color: white;
    font-size: 20px;
    transition: color 0.3s;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const NewsletterInput = styled.input`
  width: 100%;
  max-width: 250px;
  padding: 8px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterGrid>
        <FooterSection>
          <h3>Contact Us</h3>
          <p>Email: support@ecomshop.com</p>
          <p>Phone: +47 123 456 789</p>
        </FooterSection>

        <FooterSection>
          <h3>Quick Links</h3>
          <a href="/about">About Us</a>
          <a href="/contact">Contact</a>
          <a href="/terms">Terms & Conditions</a>
          <a href="/returns">Return Policy</a>
        </FooterSection>

        <FooterSection>
          <h3>Follow Us</h3>
          <SocialIcons>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
          </SocialIcons>
        </FooterSection>

        <FooterSection>
          <h3>Newsletter</h3>
          <p>Subscribe to get the latest updates.</p>
          <NewsletterInput type="email" placeholder="Your email..." />
        </FooterSection>
      </FooterGrid>

      <p>© 2025 eCom Shop - All Rights Reserved</p>
    </FooterContainer>
  );
};

export default Footer;
