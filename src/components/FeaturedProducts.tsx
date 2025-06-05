
import React from "react";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";

interface FeaturedProductsProps {
  title?: string;
  productIds?: string[];
  category?: string;
  limit?: number;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  title = "HOT-SELLING CATEGORY",
  productIds,
  category,
  limit = 8,
}) => {
  const { products, loading } = useProducts();

  console.log("FeaturedProducts render - Total products:", products.length);

  // Filter products based on provided IDs, category, or take all up to the limit
  const filteredProducts = React.useMemo(() => {
    console.log("Filtering products:", { productsCount: products.length, productIds, category, limit });
    
    if (productIds && productIds.length > 0) {
      return products
        .filter((product) => productIds.includes(product.id))
        .slice(0, limit);
    } else if (category) {
      return products
        .filter((product) => product.category === category)
        .slice(0, limit);
    }
    return products.slice(0, limit);
  }, [products, productIds, category, limit]);

  console.log("Filtered products to display:", filteredProducts.length);

  if (loading) {
    return (
      <section className="py-10">
        <div className="container px-4">
          <h2 className="text-2xl font-bold text-center mb-8 relative">
            <span className="px-4 bg-white relative z-10">{title}</span>
            <span className="absolute left-0 right-0 top-1/2 h-px bg-gray-200 -z-0"></span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-gray-200 rounded-lg h-80 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10">
      <div className="container px-4">
        <h2 className="text-2xl font-bold text-center mb-8 relative">
          <span className="px-4 bg-white relative z-10">{title}</span>
          <span className="absolute left-0 right-0 top-1/2 h-px bg-gray-200 -z-0"></span>
        </h2>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No products found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
