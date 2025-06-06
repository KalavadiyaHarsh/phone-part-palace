
import React from "react";
import { Label } from "@/components/ui/label";

interface ProductImagePreviewProps {
  imageUrl: string;
}

const ProductImagePreview = ({ imageUrl }: ProductImagePreviewProps) => {
  if (!imageUrl) return null;

  return (
    <div className="border p-4 rounded-md">
      <Label className="block mb-2">Image Preview</Label>
      <img 
        src={imageUrl} 
        alt="Product Preview" 
        className="h-40 object-contain"
      />
    </div>
  );
};

export default ProductImagePreview;
