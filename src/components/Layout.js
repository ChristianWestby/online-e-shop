import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";

// 📌 **Wrapper som dekker hele skjermen**
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Sørger for at siden alltid er minst 100% av skjermen */
`;

// 📌 **Main tar opp all tilgjengelig plass**
const MainContent = styled.main`
  flex: 1; /* Skyver footeren til bunnen */
  padding: ${({ theme }) => theme.spacing.large};
`;

const Layout = () => {
  return (
    <PageWrapper>
      <Header />
      <MainContent>
        <Outlet />
      </MainContent>
      <Footer />
    </PageWrapper>
  );
};

export default Layout;