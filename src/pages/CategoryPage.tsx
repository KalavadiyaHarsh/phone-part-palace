
import React from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, SlidersHorizontal, X } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ProductCard from "@/components/ProductCard";
import { Separator } from "@/components/ui/separator";

// Mock categories
const categories = [
  {
    id: "mobile-display",
    name: "MOBILE DISPLAY",
    image: "https://images.unsplash.com/photo-1592286927505-1def25115f54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description: "High-quality replacement displays for all major phone brands",
  },
  {
    id: "mobile-spare-parts",
    name: "MOBILE SPARE PARTS",
    image: "https://images.unsplash.com/photo-1602526429747-ac387a91d43b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description: "Genuine replacement parts for all mobile phone models",
  },
  {
    id: "laptop-spares",
    name: "LAPTOP SPARES",
    image: "https://images.unsplash.com/photo-1588702547919-26089e690ecc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Quality laptop spare parts for all major brands",
  },
  {
    id: "tools",
    name: "TOOLS",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    description: "Professional repair tools for mobile and laptop repairs",
  },
  {
    id: "accessories",
    name: "ACCESSORIES",
    image: "https://images.unsplash.com/photo-1492107376256-4026437554b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1548&q=80",
    description: "Premium quality accessories for all your devices",
  },
];

// Mock products for all categories
const allProducts = [
  {
    id: "iphone14-combo",
    name: "Mobile Combo For iPhone 14 Pro Max",
    price: 8269,
    originalPrice: 9999,
    image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    category: "mobile-spare-parts",
    slug: "mobile-combo-iphone-14-pro-max",
    brand: "apple",
  },
  {
    id: "oca-remover",
    name: "Electric OCA Glue Remover Tool",
    price: 1049,
    originalPrice: 1299,
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "tools",
    slug: "electric-oca-glue-remover-tool",
    brand: "generic",
  },
  {
    id: "vivo-housing",
    name: "Mobile Housing for Vivo Y20",
    price: 599,
    originalPrice: 799,
    image: "https://images.unsplash.com/photo-1569183927949-0c8549a2e2d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "mobile-spare-parts",
    slug: "mobile-housing-vivo-y20",
    brand: "vivo",
  },
  {
    id: "lenovo-battery",
    name: "Mobile Battery for Lenovo K6 Power",
    price: 659,
    originalPrice: 899,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
    category: "mobile-spare-parts",
    slug: "mobile-battery-lenovo-k6-power",
    brand: "lenovo",
  },
  {
    id: "note8-battery",
    name: "Mobile Battery for Samsung Note 8 Pro",
    price: 699,
    originalPrice: 999,
    image: "https://images.unsplash.com/photo-1583225214464-9296029427aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1548&q=80",
    category: "mobile-spare-parts",
    slug: "mobile-battery-samsung-note-8-pro",
    brand: "samsung",
  },
  {
    id: "lcd-separator",
    name: "RD 009T LCD Separator Machine",
    price: 2799,
    originalPrice: 3499,
    image: "https://images.unsplash.com/photo-1602526429747-ac387a91d43b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "tools",
    slug: "rd-009t-lcd-separator-machine",
    brand: "rd-tools",
  },
  {
    id: "iphone14-backpanel",
    name: "Back Panel Cover for iPhone 14 Pro Max",
    price: 699,
    originalPrice: 1099,
    image: "https://images.unsplash.com/photo-1592286927505-1def25115f54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "mobile-spare-parts",
    slug: "back-panel-cover-for-iphone-14-pro-max",
    brand: "apple",
  },
  {
    id: "charging-cable",
    name: "Fast Charging USB Cable Type C",
    price: 249,
    originalPrice: 499,
    image: "https://images.unsplash.com/photo-1492107376256-4026437554b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1548&q=80",
    category: "accessories",
    slug: "fast-charging-usb-cable-type-c",
    brand: "generic",
  },
];

// Filter options
const brands = [
  { id: "apple", name: "Apple" },
  { id: "samsung", name: "Samsung" },
  { id: "vivo", name: "Vivo" },
  { id: "oneplus", name: "OnePlus" },
  { id: "lenovo", name: "Lenovo" },
  { id: "generic", name: "Generic" },
];

const priceRanges = [
  { id: "under-500", name: "Under ₹500", min: 0, max: 499 },
  { id: "500-1000", name: "₹500 - ₹999", min: 500, max: 999 },
  { id: "1000-2500", name: "₹1000 - ₹2499", min: 1000, max: 2499 },
  { id: "2500-5000", name: "₹2500 - ₹4999", min: 2500, max: 4999 },
  { id: "5000-plus", name: "₹5000 & Above", min: 5000, max: 1000000 },
];

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams();
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = React.useState<string | null>(null);
  const [sortBy, setSortBy] = React.useState<string>("featured");
  
  const category = categories.find((cat) => cat.id === categoryId);
  
  // Filter products by category
  const filteredProducts = React.useMemo(() => {
    let filtered = allProducts;
    
    // Filter by category
    if (categoryId) {
      filtered = filtered.filter((product) => product.category === categoryId);
    }
    
    // Filter by brands
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) => selectedBrands.includes(product.brand));
    }
    
    // Filter by price range
    if (selectedPriceRange) {
      const range = priceRanges.find((range) => range.id === selectedPriceRange);
      if (range) {
        filtered = filtered.filter(
          (product) => product.price >= range.min && product.price <= range.max
        );
      }
    }
    
    // Sort products
    switch (sortBy) {
      case "price-low-high":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "price-high-low":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "newest":
        return [...filtered].sort((a, b) => a.id.localeCompare(b.id));
      case "discount":
        return [...filtered].sort((a, b) => {
          const discountA = a.originalPrice ? (a.originalPrice - a.price) / a.originalPrice : 0;
          const discountB = b.originalPrice ? (b.originalPrice - b.price) / b.originalPrice : 0;
          return discountB - discountA;
        });
      default:
        return filtered;
    }
  }, [categoryId, selectedBrands, selectedPriceRange, sortBy]);
  
  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  const handlePriceRangeChange = (value: string) => {
    setSelectedPriceRange(value === selectedPriceRange ? null : value);
  };
  
  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedPriceRange(null);
  };
  
  if (!category && categoryId) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
        <p className="mb-8">We couldn't find the category you're looking for.</p>
        <Button asChild className="bg-brand-orange hover:bg-brand-orange/90">
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    );
  }
  
  // If no specific category is provided, show all products
  const categoryName = category ? category.name : "All Products";
  const categoryDescription = category ? category.description : "Browse our complete collection of products";

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumbs */}
      <nav className="text-sm mb-6">
        <ol className="flex items-center space-x-1">
          <li>
            <Link to="/" className="text-gray-500 hover:text-brand-orange">Home</Link>
          </li>
          <li><ChevronRight size={14} className="text-gray-400" /></li>
          <li className="text-gray-900 font-medium truncate">{categoryName}</li>
        </ol>
      </nav>
      
      {/* Category header */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">{categoryName}</h1>
          <p className="text-gray-600">{categoryDescription}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar filters - Desktop */}
        <div className="hidden lg:block">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Filters</h3>
                {(selectedBrands.length > 0 || selectedPriceRange) && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-sm text-brand-orange hover:text-brand-orange/90"
                    onClick={clearFilters}
                  >
                    Clear All
                  </Button>
                )}
              </div>
              <Separator className="mb-4" />
              
              {/* Brand filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-3">Brand</h4>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <div key={brand.id} className="flex items-center">
                      <Checkbox
                        id={`brand-${brand.id}`}
                        checked={selectedBrands.includes(brand.id)}
                        onCheckedChange={() => handleBrandChange(brand.id)}
                        className="data-[state=checked]:bg-brand-orange data-[state=checked]:border-brand-orange"
                      />
                      <Label
                        htmlFor={`brand-${brand.id}`}
                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {brand.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price range filter */}
              <div>
                <h4 className="text-sm font-medium mb-3">Price Range</h4>
                <RadioGroup value={selectedPriceRange || ""} onValueChange={handlePriceRangeChange}>
                  {priceRanges.map((range) => (
                    <div key={range.id} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={range.id}
                        id={`price-${range.id}`}
                        className="border-gray-400 text-brand-orange"
                      />
                      <Label htmlFor={`price-${range.id}`}>{range.name}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile filters */}
        <Sheet>
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500">
                  {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
                </p>
                
                {/* Show active filters on mobile */}
                <div className="flex lg:hidden">
                  {selectedBrands.length > 0 && (
                    <span className="bg-gray-100 text-xs px-2 py-1 rounded-full mr-1">
                      {selectedBrands.length} {selectedBrands.length === 1 ? "brand" : "brands"}
                    </span>
                  )}
                  
                  {selectedPriceRange && (
                    <span className="bg-gray-100 text-xs px-2 py-1 rounded-full">
                      Price filter
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Sort dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border-gray-300 rounded-md px-2 py-1.5"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="discount">Discount</option>
                  <option value="newest">Newest</option>
                </select>
                
                {/* Mobile filter button */}
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    <SlidersHorizontal size={16} className="mr-2" />
                    Filter
                  </Button>
                </SheetTrigger>
              </div>
            </div>
            
            {/* Products grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <h2 className="text-xl font-semibold mb-2">No Products Found</h2>
                <p className="text-gray-500 mb-6">
                  Try adjusting your filters or browse our other categories.
                </p>
                <Button onClick={clearFilters} className="bg-brand-orange hover:bg-brand-orange/90">
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
          
          {/* Mobile filter sheet */}
          <SheetContent side="left" className="w-full sm:w-[300px]">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              {/* Brand filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-3">Brand</h4>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <div key={brand.id} className="flex items-center">
                      <Checkbox
                        id={`mobile-brand-${brand.id}`}
                        checked={selectedBrands.includes(brand.id)}
                        onCheckedChange={() => handleBrandChange(brand.id)}
                        className="data-[state=checked]:bg-brand-orange data-[state=checked]:border-brand-orange"
                      />
                      <Label
                        htmlFor={`mobile-brand-${brand.id}`}
                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {brand.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price range filter */}
              <div>
                <h4 className="text-sm font-medium mb-3">Price Range</h4>
                <RadioGroup value={selectedPriceRange || ""} onValueChange={handlePriceRangeChange}>
                  {priceRanges.map((range) => (
                    <div key={range.id} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={range.id}
                        id={`mobile-price-${range.id}`}
                        className="border-gray-400 text-brand-orange"
                      />
                      <Label htmlFor={`mobile-price-${range.id}`}>{range.name}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              
              <div className="mt-6 space-y-3">
                <Button 
                  className="w-full bg-brand-orange hover:bg-brand-orange/90"
                  onClick={clearFilters}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default CategoryPage;
