
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ProductFormFieldsProps {
  productData: {
    name: string;
    price: string;
    originalPrice: string;
    category: string;
    description: string;
    brand: string;
    stock: string;
    image: string;
    slug: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  generateSlug: () => void;
}

const ProductFormFields = ({ productData, handleChange, generateSlug }: ProductFormFieldsProps) => {
  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default ProductFormFields;
