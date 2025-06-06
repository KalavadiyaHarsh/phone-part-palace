
import { useState, useCallback, useEffect } from "react";
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";

// Product type
export type Product = {
  id: string;
  name: string;
  price: number;
  original_price?: number;
  image: string;
  category: string;
  slug: string;
  description?: string;
  brand?: string;
  stock?: number;
};

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  
  const getProducts = useCallback(async () => {
    console.log("Fetching products from Supabase...");
    setLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
      
      console.log("Products fetched successfully:", data?.length || 0);
      const formattedProducts = data?.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        original_price: product.original_price,
        image: product.image,
        category: product.category,
        slug: product.slug,
        description: product.description,
        brand: product.brand,
        stock: product.stock
      })) || [];
      
      setProducts(formattedProducts);
      return formattedProducts;
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
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error("Error fetching product:", error);
        throw new Error("Product not found");
      }
      
      return {
        id: data.id,
        name: data.name,
        price: data.price,
        original_price: data.original_price,
        image: data.image,
        category: data.category,
        slug: data.slug,
        description: data.description,
        brand: data.brand,
        stock: data.stock
      };
    } catch (error) {
      console.error("Error in getProduct:", error);
      throw error;
    }
  }, []);
  
  const createProduct = useCallback(async (productData: Omit<Product, 'id'>) => {
    try {
      console.log("Creating new product:", productData);
      setLoading(true);
      
      const { data, error } = await supabase
        .from('products')
        .insert([{
          name: productData.name,
          price: productData.price,
          original_price: productData.original_price,
          image: productData.image,
          category: productData.category,
          slug: productData.slug,
          description: productData.description,
          brand: productData.brand,
          stock: productData.stock
        }])
        .select()
        .single();
      
      if (error) {
        console.error("Error creating product:", error);
        throw error;
      }
      
      const newProduct = {
        id: data.id,
        name: data.name,
        price: data.price,
        original_price: data.original_price,
        image: data.image,
        category: data.category,
        slug: data.slug,
        description: data.description,
        brand: data.brand,
        stock: data.stock
      };
      
      console.log("Product created successfully:", newProduct);
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
      console.log("Updating product:", id, productData);
      setLoading(true);
      
      const { data, error } = await supabase
        .from('products')
        .update({
          name: productData.name,
          price: productData.price,
          original_price: productData.original_price,
          image: productData.image,
          category: productData.category,
          slug: productData.slug,
          description: productData.description,
          brand: productData.brand,
          stock: productData.stock
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error("Error updating product:", error);
        throw error;
      }
      
      console.log("Product updated successfully:", data);
      toast.success("Product updated successfully!");
      
      // Refresh the products list
      await getProducts();
      
      return data;
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
      console.log("Deleting product:", id);
      setLoading(true);
      
      // Get product name for toast message
      const productToDelete = products.find(p => p.id === id);
      
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error("Error deleting product:", error);
        throw error;
      }
      
      console.log("Product deleted successfully");
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
