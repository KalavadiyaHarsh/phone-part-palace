
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useProducts } from "@/hooks/useProducts";
import { Label } from "@/components/ui/label";

const AdminProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getProduct, createProduct, updateProduct } = useProducts();
  
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    originalPrice: "",
    category: "",
    description: "",
    brand: "",
    stock: "10",
    image: "",
    slug: "",
  });
  
  const isNewProduct = !id;
  
  useEffect(() => {
    const fetchProduct = async () => {
      if (!isNewProduct) {
        try {
          setIsLoading(true);
          const product = await getProduct(id);
          setProductData({
            name: product.name || "",
            price: product.price?.toString() || "",
            originalPrice: product.original_price?.toString() || "",
            category: product.category || "",
            description: product.description || "",
            brand: product.brand || "",
            stock: product.stock?.toString() || "10",
            image: product.image || "",
            slug: product.slug || "",
          });
        } catch (error) {
          console.error("Error fetching product:", error);
          toast.error("Failed to load product details");
          navigate("/admin/products");
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    fetchProduct();
  }, [id, isNewProduct, getProduct, navigate]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const generateSlug = () => {
    if (productData.name) {
      const slug = productData.name
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
      
      setProductData((prev) => ({
        ...prev,
        slug,
      }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!productData.name || !productData.price || !productData.category || !productData.image) {
      toast.error("Please fill all required fields");
      return;
    }
    
    const formattedData = {
      name: productData.name,
      price: parseFloat(productData.price),
      original_price: productData.originalPrice ? parseFloat(productData.originalPrice) : undefined,
      category: productData.category,
      description: productData.description,
      brand: productData.brand,
      stock: parseInt(productData.stock, 10),
      image: productData.image,
      slug: productData.slug,
    };
    
    try {
      setIsLoading(true);
      if (isNewProduct) {
        await createProduct(formattedData);
        toast.success("Product created successfully");
      } else {
        await updateProduct(id, formattedData);
        toast.success("Product updated successfully");
      }
      
      navigate("/admin/products");
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product");
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!user || user.role !== 'admin') {
    return <div>Access denied</div>;
  }
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        {isNewProduct ? "Add New Product" : "Edit Product"}
      </h1>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name*</Label>
              <Input
                id="name"
                name="name"
                value={productData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="slug">Product URL Slug*</Label>
              <div className="flex gap-2">
                <Input
                  id="slug"
                  name="slug"
                  value={productData.slug}
                  onChange={handleChange}
                  placeholder="product-url-slug"
                  required
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={generateSlug}>
                  Generate
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Price (₹)*</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={productData.price}
                onChange={handleChange}
                placeholder="Enter price"
                min="0"
                step="0.01"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="originalPrice">Original Price (₹)</Label>
              <Input
                id="originalPrice"
                name="originalPrice"
                type="number"
                value={productData.originalPrice}
                onChange={handleChange}
                placeholder="Enter original price (if discounted)"
                min="0"
                step="0.01"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category*</Label>
              <select
                id="category"
                name="category"
                value={productData.category}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                required
              >
                <option value="">Select Category</option>
                <option value="mobile-display">Mobile Display</option>
                <option value="mobile-spare-parts">Mobile Spare Parts</option>
                <option value="laptop-spares">Laptop Spares</option>
                <option value="tools">Tools</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                name="brand"
                value={productData.brand}
                onChange={handleChange}
                placeholder="Enter brand name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="stock">Stock Quantity</Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                value={productData.stock}
                onChange={handleChange}
                placeholder="Enter stock quantity"
                min="0"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">Image URL*</Label>
              <Input
                id="image"
                name="image"
                value={productData.image}
                onChange={handleChange}
                placeholder="Enter image URL"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={productData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows={5}
            />
          </div>
          
          {productData.image && (
            <div className="border p-4 rounded-md">
              <Label className="block mb-2">Image Preview</Label>
              <img 
                src={productData.image} 
                alt="Product Preview" 
                className="h-40 object-contain"
              />
            </div>
          )}
          
          <div className="flex gap-4 pt-4">
            <Button 
              type="submit" 
              className="bg-brand-blue hover:bg-brand-blue/90"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : isNewProduct ? "Create Product" : "Update Product"}
            </Button>
            
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate("/admin/products")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProductForm;
