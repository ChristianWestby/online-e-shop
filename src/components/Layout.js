import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { CartProvider } from "../context/CartContext"; // 🔥 Importer CartProvider

const Layout = () => {
  return (
    <CartProvider> {/* 🔥 Nå får hele applikasjonen tilgang til cart-tilstanden */}
      <Header />
      <main> 
        <Outlet />
      </main>
      <Footer />
    </CartProvider>
  );
};

export default Layout;