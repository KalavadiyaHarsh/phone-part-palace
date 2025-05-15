
import React from "react";
import ProductCard from "@/components/ProductCard";

const products = [
  {
    id: "iphone14-combo",
    name: "Mobile Combo For iPhone 14 Pro Max",
    price: 8269,
    originalPrice: 9999,
    image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    category: "Combo Deals",
    slug: "mobile-combo-iphone-14-pro-max",
  },
  {
    id: "oca-remover",
    name: "Electric OCA Glue Remover Tool",
    price: 1049,
    originalPrice: 1299,
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "Tools",
    slug: "electric-oca-glue-remover-tool",
  },
  {
    id: "vivo-housing",
    name: "Mobile Housing for Vivo Y20",
    price: 599,
    originalPrice: 799,
    image: "https://images.unsplash.com/photo-1569183927949-0c8549a2e2d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "Housing",
    slug: "mobile-housing-vivo-y20",
  },
  {
    id: "lenovo-battery",
    name: "Mobile Battery for Lenovo K6 Power",
    price: 659,
    originalPrice: 899,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
    category: "Battery",
    slug: "mobile-battery-lenovo-k6-power",
  },
  {
    id: "note8-battery",
    name: "Mobile Battery for Samsung Note 8 Pro",
    price: 699,
    originalPrice: 999,
    image: "https://images.unsplash.com/photo-1583225214464-9296029427aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1548&q=80",
    category: "Battery",
    slug: "mobile-battery-samsung-note-8-pro",
  },
  {
    id: "lcd-separator",
    name: "RD 009T LCD Separator Machine",
    price: 2799,
    originalPrice: 3499,
    image: "https://images.unsplash.com/photo-1602526429747-ac387a91d43b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "Tools",
    slug: "rd-009t-lcd-separator-machine",
  },
  {
    id: "iphone14-backpanel",
    name: "Back Panel Cover for iPhone 14 Pro Max",
    price: 699,
    originalPrice: 1099,
    image: "https://images.unsplash.com/photo-1592286927505-1def25115f54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "Back Panels",
    slug: "back-panel-cover-for-iphone-14-pro-max",
  },
  {
    id: "charging-cable",
    name: "Fast Charging USB Cable Type C",
    price: 249,
    originalPrice: 499,
    image: "https://images.unsplash.com/photo-1492107376256-4026437554b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1548&q=80",
    category: "Accessories",
    slug: "fast-charging-usb-cable-type-c",
  },
];

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
  // Filter products based on provided IDs, category, or take all up to the limit
  const filteredProducts = React.useMemo(() => {
    if (productIds) {
      return products
        .filter((product) => productIds.includes(product.id))
        .slice(0, limit);
    } else if (category) {
      return products
        .filter((product) => product.category === category)
        .slice(0, limit);
    }
    return products.slice(0, limit);
  }, [productIds, category, limit]);

  return (
    <section className="py-10">
      <div className="container px-4">
        <h2 className="text-2xl font-bold text-center mb-8 relative">
          <span className="px-4 bg-white relative z-10">{title}</span>
          <span className="absolute left-0 right-0 top-1/2 h-px bg-gray-200 -z-0"></span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
