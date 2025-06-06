
// Product type definitions
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

// Database row type
export type ProductRow = {
  id: string;
  name: string;
  price: number;
  original_price: number | null;
  image: string;
  category: string;
  slug: string;
  description: string | null;
  brand: string | null;
  stock: number | null;
  created_at: string;
  updated_at: string;
};
