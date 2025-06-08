
import { useMemo } from "react";
import { useProducts } from "@/hooks/useProducts";

// Define the available categories
export const CATEGORIES = [
  {
    id: "mobile-display",
    name: "MOBILE DISPLAY",
    image: "https://images.unsplash.com/photo-1592286927505-1def25115f54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description: "High-quality replacement displays for all major phone brands",
  },
  {
    id: "mobile-spare-parts",
    name: "MOBILE SPARE PARTS", 
    image: "https://images.unsplash.com/photo-1602526429747-ac387a91d43b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description: "Genuine replacement parts for all mobile phone models",
  },
  {
    id: "laptop-spares",
    name: "LAPTOP SPARES",
    image: "https://images.unsplash.com/photo-1588702547919-26089e690ecc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Quality laptop spare parts for all major brands",
  },
  {
    id: "tools",
    name: "TOOLS",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    description: "Professional repair tools for mobile and laptop repairs",
  },
  {
    id: "accessories",
    name: "ACCESSORIES", 
    image: "https://images.unsplash.com/photo-1492107376256-4026437554b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1548&q=80",
    description: "Premium quality accessories for all your devices",
  },
];

export const useCategories = () => {
  const { products } = useProducts();

  // Get available brands from actual products
  const availableBrands = useMemo(() => {
    const brands = products
      .map(product => product.brand)
      .filter((brand): brand is string => Boolean(brand))
      .filter((brand, index, self) => self.indexOf(brand) === index)
      .map(brand => ({
        id: brand.toLowerCase().replace(/\s+/g, '-'),
        name: brand.charAt(0).toUpperCase() + brand.slice(1)
      }));
    
    return brands;
  }, [products]);

  return {
    categories: CATEGORIES,
    availableBrands
  };
};
