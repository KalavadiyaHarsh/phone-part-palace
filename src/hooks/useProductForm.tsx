
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import { useProducts } from "@/hooks/useProducts";

export const useProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
  
  const handleSubmit = async (e: React.FormEvent) => {
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
  
  const handleCancel = () => {
    navigate("/admin/products");
  };
  
  return {
    productData,
    isLoading,
    isNewProduct,
    handleChange,
    generateSlug,
    handleSubmit,
    handleCancel,
  };
};
