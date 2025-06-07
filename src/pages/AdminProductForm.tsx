
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useProductForm } from "@/hooks/useProductForm";
import ProductFormFields from "@/components/admin/ProductFormFields";
import ProductImagePreview from "@/components/admin/ProductImagePreview";
import ProductFormActions from "@/components/admin/ProductFormActions";

const AdminProductForm = () => {
  const { user } = useAuth();
  const {
    productData,
    isLoading,
    isNewProduct,
    handleChange,
    handleImageUpload,
    generateSlug,
    handleSubmit,
    handleCancel,
  } = useProductForm();
  
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
          <ProductFormFields
            productData={productData}
            handleChange={handleChange}
            generateSlug={generateSlug}
            onImageUploaded={handleImageUpload}
          />
          
          {productData.image && (
            <ProductImagePreview imageUrl={productData.image} />
          )}
          
          <ProductFormActions
            isLoading={isLoading}
            isNewProduct={isNewProduct}
            onCancel={handleCancel}
          />
        </form>
      </div>
    </div>
  );
};

export default AdminProductForm;
