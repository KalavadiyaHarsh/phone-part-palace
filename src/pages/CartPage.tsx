
import React from "react";
import { Link } from "react-router-dom";
import { Trash2, ChevronRight, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();
  
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="text-5xl mb-4">🛒</div>
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Button asChild className="bg-brand-orange hover:bg-brand-orange/90">
            <Link to="/">Continue Shopping</Link>
          </Button>
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
          <li className="text-gray-900 font-medium">Shopping Cart</li>
        </ol>
      </nav>
      
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">Cart Items ({totalItems})</h2>
            </div>
            
            <div className="divide-y">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.variant}`} className="flex p-4 sm:p-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-contain object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <Link to={`/products/${item.id}`}>{item.name}</Link>
                        </h3>
                        <p className="ml-4">₹{item.price.toFixed(2)}</p>
                      </div>
                      {item.variant && (
                        <p className="mt-1 text-sm text-gray-500">{item.variant}</p>
                      )}
                    </div>
                    
                    <div className="flex flex-1 items-end justify-between mt-4">
                      <div className="flex items-center border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={14} />
                        </Button>
                        <span className="w-10 text-center">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus size={14} />
                        </Button>
                      </div>
                      
                      <div className="flex">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 size={18} className="mr-1" />
                          <span>Remove</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t p-6 flex justify-between items-center">
              <Button variant="outline" asChild>
                <Link to="/">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Order summary */}
        <div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>{totalPrice > 500 ? "Free" : "₹50.00"}</span>
              </div>
              
              <div className="border-t pt-4 flex justify-between font-medium">
                <span>Total</span>
                <span>₹{(totalPrice > 500 ? totalPrice : totalPrice + 50).toFixed(2)}</span>
              </div>
            </div>
            
            <Button className="w-full mt-6 bg-brand-orange hover:bg-brand-orange/90" asChild>
              <Link to="/checkout">Proceed to Checkout</Link>
            </Button>
            
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-3">Apply Coupon</h3>
              <div className="flex">
                <Input
                  placeholder="Enter coupon code"
                  className="rounded-r-none"
                />
                <Button variant="outline" className="rounded-l-none">
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
