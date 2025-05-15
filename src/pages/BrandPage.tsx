
import React from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { Separator } from "@/components/ui/separator";

// Mock data for brands
const brands = [
  { 
    id: "apple", 
    name: "Apple", 
    logo: "https://www.apple.com/ac/globalnav/7/en_US/images/be15095f-5a20-57d0-ad14-cf4c638e223a/globalnav_apple_image__b5er5ngrzxqq_large.svg",
    banner: "https://images.unsplash.com/photo-1588058365548-9ded0e2f5053?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Explore our collection of premium quality replacement parts for Apple devices. From iPhone to iPad and MacBook, we provide all the components you need to repair your Apple devices with confidence."
  },
  { 
    id: "samsung", 
    name: "Samsung", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/2560px-Samsung_Logo.svg.png",
    banner: "https://images.unsplash.com/photo-1662005723038-b54bcfdc7c05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Find high-quality replacement parts for all Samsung Galaxy models. Our extensive inventory includes displays, batteries, back panels, and more, ensuring your Samsung device gets the best care possible."
  },
];

// Mock product data
const products = [
  {
    id: "iphone14-backpanel",
    name: "Back Panel Cover for iPhone 14 Pro Max",
    price: 699,
    originalPrice: 1099,
    image: "https://images.unsplash.com/photo-1592286927505-1def25115f54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "Back Panels",
    slug: "back-panel-cover-for-iphone-14-pro-max",
    brand: "apple"
  },
  {
    id: "iphone14-combo",
    name: "Mobile Combo For iPhone 14 Pro Max",
    price: 8269,
    originalPrice: 9999,
    image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    category: "Combo Deals",
    slug: "mobile-combo-iphone-14-pro-max",
    brand: "apple"
  },
  {
    id: "note8-battery",
    name: "Mobile Battery for Samsung Note 8 Pro",
    price: 699,
    originalPrice: 999,
    image: "https://images.unsplash.com/photo-1583225214464-9296029427aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1548&q=80",
    category: "Battery",
    slug: "mobile-battery-samsung-note-8-pro",
    brand: "samsung"
  },
];

const BrandPage = () => {
  const { brandId } = useParams();
  
  const brand = brands.find((b) => b.id === brandId);
  
  if (!brand) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Brand Not Found</h1>
        <p className="mb-8">We couldn't find the brand you're looking for.</p>
        <Link 
          to="/" 
          className="inline-block bg-brand-orange hover:bg-brand-orange/90 text-white font-medium py-2 px-6 rounded"
        >
          Return to Home
        </Link>
      </div>
    );
  }
  
  const brandProducts = products.filter((product) => product.brand === brandId);
  
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumbs */}
      <nav className="text-sm mb-6">
        <ol className="flex items-center space-x-1">
          <li>
            <Link to="/" className="text-gray-500 hover:text-brand-orange">Home</Link>
          </li>
          <li><ChevronRight size={14} className="text-gray-400" /></li>
          <li>
            <Link to="/brands" className="text-gray-500 hover:text-brand-orange">
              Brands
            </Link>
          </li>
          <li><ChevronRight size={14} className="text-gray-400" /></li>
          <li className="text-gray-900 font-medium truncate">{brand.name}</li>
        </ol>
      </nav>
      
      {/* Brand banner */}
      <div 
        className="relative h-48 sm:h-64 md:h-80 mb-8 rounded-lg overflow-hidden bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${brand.banner})` 
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
          <img 
            src={brand.logo} 
            alt={brand.name}
            className="h-10 sm:h-12 md:h-16 mb-4 object-contain bg-white p-2 rounded"
          />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
            {brand.name} Parts & Accessories
          </h1>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <p className="text-gray-700">{brand.description}</p>
      </div>
      
      {/* Product models grid */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-xl font-bold mb-6">{brand.name.toUpperCase()} MODELS</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {brand.id === "apple" && (
            <>
              {["iPhone 14 Pro Max", "iPhone 14 Pro", "iPhone 14 Plus", "iPhone 14", "iPhone 13 Pro Max", "iPhone 13 Pro", "iPhone 13", "iPhone 13 Mini", "iPhone 12 Pro Max"].map((model) => (
                <Link
                  key={model}
                  to={`/products/iphone14-backpanel`} // This would normally be a dynamic link
                  className="p-4 border rounded-lg text-center hover:border-brand-orange transition-colors"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                    alt={model}
                    className="w-full h-auto aspect-square object-contain mb-3"
                  />
                  <h3 className="text-sm font-medium">{model}</h3>
                </Link>
              ))}
            </>
          )}
          
          {brand.id === "samsung" && (
            <>
              {["Galaxy S23 Ultra", "Galaxy S23+", "Galaxy S23", "Galaxy S22 Ultra", "Galaxy S22+", "Galaxy Note 20", "Galaxy A53", "Galaxy A23", "Galaxy M53"].map((model) => (
                <Link
                  key={model}
                  to={`/products/note8-battery`} // This would normally be a dynamic link
                  className="p-4 border rounded-lg text-center hover:border-brand-orange transition-colors"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1565849904461-04a58ad377e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2036&q=80" 
                    alt={model}
                    className="w-full h-auto aspect-square object-contain mb-3"
                  />
                  <h3 className="text-sm font-medium">{model}</h3>
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
      
      {/* Featured products */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold mb-6">FEATURED {brand.name.toUpperCase()} PRODUCTS</h2>
        
        {brandProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {brandProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <p className="text-center py-8 text-gray-500">
            No products available for this brand at the moment. Check back soon!
          </p>
        )}
      </div>
    </div>
  );
};

export default BrandPage;
