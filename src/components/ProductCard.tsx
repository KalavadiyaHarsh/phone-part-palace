
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  slug: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
  slug,
}) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price,
      image,
      quantity: 1,
    });
  };

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div className="product-card bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300">
      <Link to={`/products/${slug}`} className="block">
        <div className="relative pt-[100%]">
          <img
            src={image}
            alt={name}
            className="absolute inset-0 w-full h-full object-contain p-4"
          />
          {discount > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium">
              {discount}% OFF
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/category/${category}`} className="text-xs text-gray-500 hover:underline mb-1 block">
          {category}
        </Link>
        <Link to={`/products/${slug}`} className="block">
          <h3 className="font-medium text-gray-800 mb-2 line-clamp-2 hover:text-brand-orange transition-colors">
            {name}
          </h3>
        </Link>
        
        <div className="flex items-center mb-3">
          <span className="font-bold text-gray-900">₹{price.toLocaleString()}</span>
          {originalPrice && (
            <span className="ml-2 text-sm text-gray-500 line-through">
              ₹{originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant="default" 
            size="sm" 
            className="flex-grow bg-brand-orange hover:bg-brand-orange/90 text-white"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            asChild
          >
            <Link to={`/products/${slug}`}>Details</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
