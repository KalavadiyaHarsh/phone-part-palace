
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/contexts/CartContext";
import { SearchProvider } from "@/contexts/SearchContext";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <SearchProvider>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow bg-gray-50"><Outlet /></main>
          <Footer />
        </div>
      </CartProvider>
    </SearchProvider>
  );
};

export default Layout;
