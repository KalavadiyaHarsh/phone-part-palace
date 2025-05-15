
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/contexts/CartContext";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow bg-gray-50"><Outlet /></main>
        <Footer />
      </div>
    </CartProvider>
  );
};

export default Layout;
