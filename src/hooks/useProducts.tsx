
import { useState, useCallback, useEffect } from "react";
import { toast } from "@/components/ui/sonner";
import { Product } from "@/types/product";
import { productService } from "@/services/productService";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  
  const getProducts = useCallback(async () => {
    setLoading(true);
    
    try {
      const fetchedProducts = await productService.getAllProducts();
      setProducts(fetchedProducts);
      return fetchedProducts;
    } catch (error) {
      console.error("Error in getProducts:", error);
      toast.error("Failed to load products");
      return [];
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Load products on hook initialization
  useEffect(() => {
    getProducts();
  }, [getProducts]);
  
  const getProduct = useCallback(async (id: string) => {
    try {
      return await productService.getProductById(id);
    } catch (error) {
      console.error("Error in getProduct:", error);
      throw error;
    }
  }, []);
  
  const createProduct = useCallback(async (productData: Omit<Product, 'id'>) => {
    try {
      setLoading(true);
      
      const newProduct = await productService.createProduct(productData);
      
      toast.success(`Product "${newProduct.name}" created successfully!`);
      
      // Refresh the products list
      await getProducts();
      
      return newProduct;
    } catch (error) {
      console.error("Error in createProduct:", error);
      toast.error("Failed to create product");
      throw error;
    } finally {
      setLoading(false);
    }
  }, [getProducts]);
  
  const updateProduct = useCallback(async (id: string, productData: Partial<Product>) => {
    try {
      setLoading(true);
      
      const updatedProduct = await productService.updateProduct(id, productData);
      
      toast.success("Product updated successfully!");
      
      // Refresh the products list
      await getProducts();
      
      return updatedProduct;
    } catch (error) {
      console.error("Error in updateProduct:", error);
      toast.error("Failed to update product");
      throw error;
    } finally {
      setLoading(false);
    }
  }, [getProducts]);
  
  const deleteProduct = useCallback(async (id: string) => {
    try {
      setLoading(true);
      
      // Get product name for toast message
      const productToDelete = products.find(p => p.id === id);
      
      await productService.deleteProduct(id);
      
      if (productToDelete) {
        toast.success(`Product "${productToDelete.name}" deleted successfully!`);
      }
      
      // Refresh the products list
      await getProducts();
      
      return true;
    } catch (error) {
      console.error("Error in deleteProduct:", error);
      toast.error("Failed to delete product");
      throw error;
    } finally {
      setLoading(false);
    }
  }, [products, getProducts]);
  
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
