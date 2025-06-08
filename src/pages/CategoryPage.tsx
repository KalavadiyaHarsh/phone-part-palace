
import React from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, SlidersHorizontal } from "lucide-react";
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
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";

// Price ranges for filtering
const priceRanges = [
  { id: "under-500", name: "Under ₹500", min: 0, max: 499 },
  { id: "500-1000", name: "₹500 - ₹999", min: 500, max: 999 },
  { id: "1000-2500", name: "₹1000 - ₹2499", min: 1000, max: 2499 },
  { id: "2500-5000", name: "₹2500 - ₹4999", min: 2500, max: 4999 },
  { id: "5000-plus", name: "₹5000 & Above", min: 5000, max: 1000000 },
];

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams();
  const { products, loading } = useProducts();
  const { categories, availableBrands } = useCategories();
  
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = React.useState<string | null>(null);
  const [sortBy, setSortBy] = React.useState<string>("featured");
  
  const category = categories.find((cat) => cat.id === categoryId);
  
  // Filter products by category and other filters
  const filteredProducts = React.useMemo(() => {
    let filtered = products;
    
    // Filter by category
    if (categoryId) {
      filtered = filtered.filter((product) => product.category === categoryId);
    }
    
    // Filter by brands
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) => 
        product.brand && selectedBrands.includes(product.brand.toLowerCase().replace(/\s+/g, '-'))
      );
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
          const discountA = a.original_price ? (a.original_price - a.price) / a.original_price : 0;
          const discountB = b.original_price ? (b.original_price - b.price) / b.original_price : 0;
          return discountB - discountA;
        });
      default:
        return filtered;
    }
  }, [products, categoryId, selectedBrands, selectedPriceRange, sortBy]);
  
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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-6 w-1/3"></div>
          <div className="h-32 bg-gray-200 rounded mb-6"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-gray-200 rounded-lg h-80"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

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
              
              {/* Brand filter - only show if there are brands available */}
              {availableBrands.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3">Brand</h4>
                  <div className="space-y-2">
                    {availableBrands.map((brand) => (
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
              )}
              
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
              {/* Brand filter - mobile */}
              {availableBrands.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3">Brand</h4>
                  <div className="space-y-2">
                    {availableBrands.map((brand) => (
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
              )}
              
              {/* Price range filter - mobile */}
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
