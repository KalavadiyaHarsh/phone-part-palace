
import React from "react";
import { Button } from "@/components/ui/button";

interface ProductFormActionsProps {
  isLoading: boolean;
  isNewProduct: boolean;
  onCancel: () => void;
}

const ProductFormActions = ({ isLoading, isNewProduct, onCancel }: ProductFormActionsProps) => {
  return (
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
        onClick={onCancel}
      >
        Cancel
      </Button>
    </div>
  );
};

export default ProductFormActions;
