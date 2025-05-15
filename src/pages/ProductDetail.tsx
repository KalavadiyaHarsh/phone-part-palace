
import React from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, Check, ShieldCheck, Truck, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import ProductGallery from "@/components/ProductGallery";
import FeaturedProducts from "@/components/FeaturedProducts";

// Mock product data - in a real app, this would come from an API
const products = [
  {
    id: "iphone14-backpanel",
    name: "Back Panel Cover for iPhone 14 Pro Max",
    price: 699,
    originalPrice: 1099,
    slug: "back-panel-cover-for-iphone-14-pro-max",
    description: "Brand new replacement of Iphone 14 Pro Max back panel",
    features: [
      "Made from durable materials, it offers reliable protection against scratches and minor impacts.",
      "Easily replace your Iphone 14 Pro Max back panel with this high-quality option, available in a range of colors to suit your mobile color.",
      "Specially manufactured for your compatible Iphone 14 Pro Max",
      "Manufactured using high quality and excellent durable materials.",
      "Perfect replacement for the original cover and make the phone look like a new one."
    ],
    colors: [
      { id: "purple", name: "Purple", hex: "#800080" },
      { id: "silver", name: "Silver", hex: "#C0C0C0" },
      { id: "gold", name: "Gold", hex: "#FFD700" },
      { id: "black", name: "Black", hex: "#000000" }
    ],
    category: "Back Panels",
    brand: "iPhone",
    stock: true,
    productType: "MOBILE BACK PANEL",
    images: [
      "https://images.unsplash.com/photo-1592286927505-1def25115f54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1678911820864-e2c567c655d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
    ],
    related: ["charging-cable", "lcd-separator", "iphone14-combo"]
  },
  {
    id: "charging-cable",
    name: "Fast Charging USB Cable Type C",
    price: 249,
    originalPrice: 499,
    slug: "fast-charging-usb-cable-type-c",
    description: "High-quality fast charging USB Type-C cable",
    features: [
      "Fast charging capability up to 65W",
      "Durable braided nylon cable",
      "Reinforced connectors for longer life",
      "Compatible with all Type-C devices",
      "1.5 meter length for convenience"
    ],
    category: "Accessories",
    brand: "Generic",
    stock: true,
    productType: "CABLE",
    images: [
      "https://images.unsplash.com/photo-1492107376256-4026437554b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1548&q=80"
    ],
    related: ["iphone14-backpanel", "iphone14-combo", "note8-battery"]
  },
  {
    id: "lcd-separator",
    name: "RD 009T LCD Separator Machine",
    price: 2799,
    originalPrice: 3499,
    slug: "rd-009t-lcd-separator-machine",
    description: "Professional LCD separator machine for phone repair",
    features: [
      "High-quality build for professional repair shops",
      "Precise temperature control",
      "Built-in vacuum pump",
      "Suitable for all phone models",
      "Easy to operate with digital display"
    ],
    category: "Tools",
    brand: "RD Tools",
    stock: true,
    productType: "REPAIR TOOL",
    images: [
      "https://images.unsplash.com/photo-1602526429747-ac387a91d43b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    ],
    related: ["oca-remover", "iphone14-backpanel", "vivo-housing"]
  },
  {
    id: "iphone14-combo",
    name: "Mobile Combo For iPhone 14 Pro Max",
    price: 8269,
    originalPrice: 9999,
    slug: "mobile-combo-iphone-14-pro-max",
    description: "Complete combo kit for iPhone 14 Pro Max repairs",
    features: [
      "Includes display assembly, battery, and back cover",
      "All parts are tested and quality assured",
      "Perfect fit for iPhone 14 Pro Max",
      "Installation tools included",
      "30-day warranty on all parts"
    ],
    category: "Combo Deals",
    brand: "iPhone",
    stock: true,
    productType: "COMBO PACK",
    images: [
      "https://images.unsplash.com/photo-1605236453806-6ff36851218e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
    ],
    related: ["iphone14-backpanel", "charging-cable", "lcd-separator"]
  },
];

const ProductDetail = () => {
  const { slug } = useParams();
  const [quantity, setQuantity] = React.useState(1);
  const [selectedColor, setSelectedColor] = React.useState<string | undefined>(undefined);
  const { addToCart } = useCart();
  
  const product = products.find((p) => p.slug === slug);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-8">We couldn't find the product you're looking for.</p>
        <Button asChild>
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    );
  }
  
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );
  
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity,
      variant: selectedColor 
        ? product.colors?.find(c => c.id === selectedColor)?.name 
        : undefined
    });
  };

  const handleQuantityChange = (value: number) => {
    if (value < 1) return;
    setQuantity(value);
  };

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
            <Link to={`/category/${product.category.toLowerCase().replace(/\s+/g, "-")}`} className="text-gray-500 hover:text-brand-orange">
              {product.category}
            </Link>
          </li>
          <li><ChevronRight size={14} className="text-gray-400" /></li>
          <li className="text-gray-900 font-medium truncate">{product.name}</li>
        </ol>
      </nav>

      {/* Product display */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Product Images */}
          <div>
            <ProductGallery images={product.images} alt={product.name} />
          </div>
          
          {/* Product Details */}
          <div>
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            
            {/* Sale badge */}
            {discount > 0 && (
              <div className="inline-block bg-red-500 text-white px-2 py-1 text-xs rounded-md mb-3">
                {discount}% OFF
              </div>
            )}
            
            <p className="text-sm text-gray-500 mb-4">
              <span className="mr-3">Vendor: {product.brand}</span>
              <span className="mr-3">Availability: {product.stock ? "In Stock" : "Out of Stock"}</span>
              <span>Product Type: {product.productType}</span>
            </p>
            
            <div className="mb-6">
              <div className="flex items-center mb-1">
                <span className="text-3xl font-bold">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="ml-3 text-lg text-gray-500 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              
              {/* Hot selling indicator */}
              <div className="flex items-center text-brand-orange">
                <span className="inline-block w-2 h-2 rounded-full bg-brand-orange mr-2"></span>
                <span className="text-sm">8 sold in last 24 hours</span>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700 mb-2">{product.description}</p>
            </div>
            
            {/* Color selection */}
            {product.colors && (
              <div className="mb-6">
                <span className="block text-sm font-medium mb-2">Color: {selectedColor ? product.colors.find(c => c.id === selectedColor)?.name : "Select a color"}</span>
                <div className="flex space-x-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.id}
                      type="button"
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        selectedColor === color.id ? "ring-2 ring-brand-orange ring-offset-2" : ""
                      }`}
                      style={{ backgroundColor: color.hex }}
                      onClick={() => setSelectedColor(color.id)}
                      aria-label={`Select ${color.name}`}
                    >
                      {selectedColor === color.id && (
                        <Check size={14} className={`${color.hex === "#000000" ? "text-white" : "text-black"}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity selector */}
            <div className="mb-6">
              <span className="block text-sm font-medium mb-2">Quantity</span>
              <div className="flex items-center border rounded-md w-max">
                <button
                  className="px-3 py-2 hover:bg-gray-50"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-3 py-2 border-x">{quantity}</span>
                <button
                  className="px-3 py-2 hover:bg-gray-50"
                  onClick={() => handleQuantityChange(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Add to cart button */}
            <div className="mb-6">
              <Button
                onClick={handleAddToCart}
                className="w-full md:w-auto bg-brand-orange hover:bg-brand-orange/90 text-white font-medium py-3 px-8"
                disabled={!product.stock}
              >
                {product.stock ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>
            
            {/* Product Features */}
            <div className="border-t pt-6 space-y-2">
              <div className="flex items-center">
                <ShieldCheck size={18} className="text-brand-orange mr-2" />
                <span className="text-sm">Quality Guaranteed</span>
              </div>
              <div className="flex items-center">
                <Truck size={18} className="text-brand-orange mr-2" />
                <span className="text-sm">Free shipping on orders over ₹500</span>
              </div>
              <div className="flex items-center">
                <RefreshCcw size={18} className="text-brand-orange mr-2" />
                <span className="text-sm">Easy returns within 7 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product tabs */}
      <div className="mt-10 bg-white rounded-lg shadow-sm">
        <Tabs defaultValue="description">
          <TabsList className="border-b w-full justify-start rounded-none">
            <TabsTrigger value="description" className="rounded-none border-b-2 border-transparent data-[state=active]:border-brand-orange">
              Description
            </TabsTrigger>
            <TabsTrigger value="shipping" className="rounded-none border-b-2 border-transparent data-[state=active]:border-brand-orange">
              Shipping & Return
            </TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent data-[state=active]:border-brand-orange">
              Reviews
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="p-6">
            <h3 className="font-semibold text-lg mb-4">
              {product.name}
            </h3>
            
            <h4 className="font-semibold mb-3">Features:</h4>
            <ul className="list-disc pl-5 space-y-2">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            
            <div className="mt-8">
              <h3 className="font-semibold text-lg mb-4">
                REFUND & REPLACEMENT
              </h3>
              <p>
                We offer a hassle-free refund and replacement policy. If you're not satisfied with your purchase, please contact our customer support team within 7 days of receiving your order.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="shipping" className="p-6">
            <h3 className="font-semibold text-lg mb-4">Shipping Information</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Free shipping on orders above ₹500</li>
              <li>Standard delivery: 3-5 business days</li>
              <li>Express delivery: 1-2 business days (additional charges apply)</li>
              <li>We ship to all major cities across India</li>
            </ul>
            
            <h3 className="font-semibold text-lg mt-6 mb-4">Return Policy</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Returns accepted within 7 days of delivery</li>
              <li>Item must be unused and in original packaging</li>
              <li>Refunds are processed within 5-7 business days after inspection</li>
              <li>Shipping charges are non-refundable unless the return is due to our error</li>
            </ul>
          </TabsContent>
          
          <TabsContent value="reviews" className="p-6">
            <div className="text-center py-8">
              <h3 className="font-semibold text-lg mb-2">No Reviews Yet</h3>
              <p className="text-gray-500 mb-4">Be the first to review this product</p>
              <Button variant="outline">Write a Review</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Related products */}
      <div className="mt-10">
        <FeaturedProducts 
          title="YOU MAY ALSO LIKE" 
          productIds={product.related} 
        />
      </div>
    </div>
  );
};

export default ProductDetail;
