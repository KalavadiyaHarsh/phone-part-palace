
import { supabase } from "@/integrations/supabase/client";
import { Product, ProductRow } from "@/types/product";

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    console.log("Fetching products from Supabase...");
    
    const { data, error } = await (supabase as any)
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
    
    console.log("Products fetched successfully:", data?.length || 0);
    return data?.map((product: ProductRow) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      original_price: product.original_price || undefined,
      image: product.image,
      category: product.category,
      slug: product.slug,
      description: product.description || undefined,
      brand: product.brand || undefined,
      stock: product.stock || undefined
    })) || [];
  },

  async getProductById(id: string): Promise<Product> {
    const { data, error } = await (supabase as any)
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error("Error fetching product:", error);
      throw new Error("Product not found");
    }
    
    if (!data) {
      throw new Error("Product not found");
    }
    
    return {
      id: data.id,
      name: data.name,
      price: data.price,
      original_price: data.original_price || undefined,
      image: data.image,
      category: data.category,
      slug: data.slug,
      description: data.description || undefined,
      brand: data.brand || undefined,
      stock: data.stock || undefined
    };
  },

  async createProduct(productData: Omit<Product, 'id'>): Promise<Product> {
    console.log("Creating new product:", productData);
    
    const { data, error } = await (supabase as any)
      .from('products')
      .insert([{
        name: productData.name,
        price: productData.price,
        original_price: productData.original_price || null,
        image: productData.image,
        category: productData.category,
        slug: productData.slug,
        description: productData.description || null,
        brand: productData.brand || null,
        stock: productData.stock || 0
      }])
      .select()
      .single();
    
    if (error) {
      console.error("Error creating product:", error);
      throw error;
    }
    
    if (!data) {
      throw new Error("Failed to create product");
    }
    
    console.log("Product created successfully:", data);
    return {
      id: data.id,
      name: data.name,
      price: data.price,
      original_price: data.original_price || undefined,
      image: data.image,
      category: data.category,
      slug: data.slug,
      description: data.description || undefined,
      brand: data.brand || undefined,
      stock: data.stock || undefined
    };
  },

  async updateProduct(id: string, productData: Partial<Product>): Promise<ProductRow> {
    console.log("Updating product:", id, productData);
    
    const { data, error } = await (supabase as any)
      .from('products')
      .update({
        name: productData.name,
        price: productData.price,
        original_price: productData.original_price || null,
        image: productData.image,
        category: productData.category,
        slug: productData.slug,
        description: productData.description || null,
        brand: productData.brand || null,
        stock: productData.stock || 0
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error("Error updating product:", error);
      throw error;
    }
    
    console.log("Product updated successfully:", data);
    return data;
  },

  async deleteProduct(id: string): Promise<void> {
    console.log("Deleting product:", id);
    
    const { error } = await (supabase as any)
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
    
    console.log("Product deleted successfully");
  }
};
