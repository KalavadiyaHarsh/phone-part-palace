
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useProducts } from "@/hooks/useProducts";

const AdminProducts = () => {
  const { products, loading, deleteProduct } = useProducts();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleDeleteProduct = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        toast.success("Product deleted successfully");
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Failed to delete product");
      }
    }
  };
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  if (!user || user.role !== 'admin') {
    return <div>Access denied</div>;
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products Management</h1>
        <Button asChild className="bg-brand-orange hover:bg-brand-orange/90">
          <Link to="/admin/products/new">
            <Plus size={18} className="mr-1" /> Add New Product
          </Link>
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Image</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Price</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Category</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-4 text-center">Loading products...</td>
                </tr>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-4 py-3">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="h-10 w-10 object-contain"
                      />
                    </td>
                    <td className="px-4 py-3">{product.name}</td>
                    <td className="px-4 py-3">₹{product.price.toLocaleString()}</td>
                    <td className="px-4 py-3">{product.category}</td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <Button asChild variant="ghost" size="sm">
                          <Link to={`/admin/products/edit/${product.id}`}>
                            <Pencil size={16} />
                          </Link>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-4 text-center">No products found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
