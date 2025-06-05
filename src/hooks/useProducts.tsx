
import { useState, useCallback, useEffect } from "react";
import { toast } from "@/components/ui/sonner";

// Sample product data (in a real app, this would come from an API)
const SAMPLE_PRODUCTS = [
  {
    id: "iphone14-combo",
    name: "Mobile Combo For iPhone 14 Pro Max",
    price: 8269,
    originalPrice: 9999,
    image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    category: "Combo Deals",
    slug: "mobile-combo-iphone-14-pro-max",
    description: "Complete combo for iPhone 14 Pro Max including display, back panel, and tools.",
    brand: "Apple",
    stock: 25,
  },
  {
    id: "oca-remover",
    name: "Electric OCA Glue Remover Tool",
    price: 1049,
    originalPrice: 1299,
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "Tools",
    slug: "electric-oca-glue-remover-tool",
    description: "Professional tool for removing OCA glue from mobile phone screens.",
    brand: "Generic",
    stock: 40,
  },
  {
    id: "vivo-housing",
    name: "Mobile Housing for Vivo Y20",
    price: 599,
    originalPrice: 799,
    image: "https://images.unsplash.com/photo-1569183927949-0c8549a2e2d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "Housing",
    slug: "mobile-housing-vivo-y20",
    description: "Replacement housing for Vivo Y20 mobile phone.",
    brand: "Vivo",
    stock: 30,
  },
  {
    id: "lenovo-battery",
    name: "Mobile Battery for Lenovo K6 Power",
    price: 659,
    originalPrice: 899,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
    category: "Battery",
    slug: "mobile-battery-lenovo-k6-power",
    description: "Replacement battery for Lenovo K6 Power mobile phone.",
    brand: "Lenovo",
    stock: 35,
  },
  {
    id: "note8-battery",
    name: "Mobile Battery for Samsung Note 8 Pro",
    price: 699,
    originalPrice: 999,
    image: "https://images.unsplash.com/photo-1583225214464-9296029427aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1548&q=80",
    category: "Battery",
    slug: "mobile-battery-samsung-note-8-pro",
    description: "Replacement battery for Samsung Note 8 Pro mobile phone.",
    brand: "Samsung",
    stock: 28,
  },
  {
    id: "lcd-separator",
    name: "RD 009T LCD Separator Machine",
    price: 2799,
    originalPrice: 3499,
    image: "https://images.unsplash.com/photo-1602526429747-ac387a91d43b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "Tools",
    slug: "rd-009t-lcd-separator-machine",
    description: "Professional machine for separating LCD screens.",
    brand: "RD",
    stock: 15,
  },
  {
    id: "iphone14-backpanel",
    name: "Back Panel Cover for iPhone 14 Pro Max",
    price: 699,
    originalPrice: 1099,
    image: "https://images.unsplash.com/photo-1592286927505-1def25115f54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "Back Panels",
    slug: "back-panel-cover-for-iphone-14-pro-max",
    description: "Replacement back panel cover for iPhone 14 Pro Max.",
    brand: "Apple",
    stock: 50,
  },
  {
    id: "charging-cable",
    name: "Fast Charging USB Cable Type C",
    price: 249,
    originalPrice: 499,
    image: "https://images.unsplash.com/photo-1492107376256-4026437554b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1548&q=80",
    category: "Accessories",
    slug: "fast-charging-usb-cable-type-c",
    description: "High-speed USB Type C charging cable.",
    brand: "Generic",
    stock: 100,
  },
];

// Product type
export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  slug: string;
  description?: string;
  brand?: string;
  stock?: number;
};

// Global products state to share across components
let globalProducts: Product[] = [...SAMPLE_PRODUCTS];
const listeners: Set<() => void> = new Set();

const notifyListeners = () => {
  console.log("Notifying all listeners of product changes. Total listeners:", listeners.size);
  listeners.forEach(listener => {
    try {
      listener();
    } catch (error) {
      console.error("Error in product listener:", error);
    }
  });
};

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([...globalProducts]);
  const [loading, setLoading] = useState(false);
  
  // Create a stable listener function
  const updateLocalState = useCallback(() => {
    console.log("Product listener triggered, updating local state with", globalProducts.length, "products");
    setProducts([...globalProducts]);
  }, []);
  
  useEffect(() => {
    // Add listener
    listeners.add(updateLocalState);
    console.log("Added listener, total listeners:", listeners.size);
    
    // Initial sync
    setProducts([...globalProducts]);
    
    return () => {
      listeners.delete(updateLocalState);
      console.log("Removed listener, remaining listeners:", listeners.size);
    };
  }, [updateLocalState]);
  
  const getProducts = useCallback(async () => {
    console.log("getProducts called, returning:", globalProducts.length, "products");
    setLoading(true);
    
    // Simulate API delay for better UX
    await new Promise(resolve => setTimeout(resolve, 100));
    
    setLoading(false);
    // Return a fresh copy to ensure reactivity
    return [...globalProducts];
  }, []);
  
  const getProduct = useCallback(async (id: string) => {
    // In a real app, this would be an API call
    const product = globalProducts.find(p => p.id === id);
    
    if (!product) {
      throw new Error("Product not found");
    }
    
    return product;
  }, []);
  
  const createProduct = useCallback(async (productData: Omit<Product, 'id'>) => {
    // Generate a unique ID
    const id = `prod-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // In a real app, this would be an API call
    const newProduct = {
      id,
      ...productData,
    };
    
    console.log("Creating new product:", newProduct);
    globalProducts = [...globalProducts, newProduct];
    console.log("Total products after creation:", globalProducts.length);
    
    // Show success message
    toast.success(`Product "${newProduct.name}" created successfully!`);
    
    // Force update all components
    notifyListeners();
    
    return newProduct;
  }, []);
  
  const updateProduct = useCallback(async (id: string, productData: Partial<Product>) => {
    // In a real app, this would be an API call
    const index = globalProducts.findIndex(product => product.id === id);
    if (index !== -1) {
      globalProducts[index] = { ...globalProducts[index], ...productData };
      console.log("Updated product:", globalProducts[index]);
      
      // Update the global array reference
      globalProducts = [...globalProducts];
      
      toast.success("Product updated successfully!");
      notifyListeners();
    }
    
    return { id, ...productData };
  }, []);
  
  const deleteProduct = useCallback(async (id: string) => {
    // In a real app, this would be an API call
    const originalLength = globalProducts.length;
    const productToDelete = globalProducts.find(p => p.id === id);
    
    globalProducts = globalProducts.filter(product => product.id !== id);
    console.log("Deleted product, products count changed from", originalLength, "to", globalProducts.length);
    
    if (productToDelete) {
      toast.success(`Product "${productToDelete.name}" deleted successfully!`);
    }
    
    notifyListeners();
    return true;
  }, []);
  
  return {
    products,
    loading,
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};
