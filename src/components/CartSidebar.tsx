
import React from "react";
import { Link } from "react-router-dom";
import { Plus, Minus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";

const CartSidebar = () => {
  const { cartItems, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();

  if (totalItems === 0) {
    return (
      <div className="flex flex-col h-full">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Your Cart</h2>
          <p className="text-sm text-muted-foreground">Your cart is empty</p>
        </div>
        <div className="flex-grow flex flex-col items-center justify-center p-6">
          <div className="text-5xl mb-4">🛒</div>
          <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
          <p className="text-sm text-muted-foreground text-center mb-6">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Button asChild className="w-full bg-brand-orange hover:bg-brand-orange/90">
            <Link to="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold">Your Cart ({totalItems})</h2>
      </div>

      <ScrollArea className="flex-grow">
        <div className="p-6 space-y-4">
          {cartItems.map((item) => (
            <div key={`${item.id}-${item.variant}`} className="flex gap-4 py-2">
              <div className="h-20 w-20 rounded-md border bg-muted flex-shrink-0 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="flex flex-col flex-grow">
                <div className="flex justify-between">
                  <h3 className="font-medium">{item.name}</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <X size={16} />
                  </Button>
                </div>
                {item.variant && (
                  <p className="text-sm text-muted-foreground">{item.variant}</p>
                )}
                <div className="mt-auto flex items-center justify-between">
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
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-none"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus size={14} />
                    </Button>
                  </div>
                  <div className="font-medium">₹{item.price.toFixed(2)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-6 border-t space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>₹{totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span>Calculated at checkout</span>
        </div>
        <Separator />
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>₹{totalPrice.toFixed(2)}</span>
        </div>
        <Button className="w-full bg-brand-orange hover:bg-brand-orange/90" asChild>
          <Link to="/checkout">Checkout</Link>
        </Button>
        <Button variant="outline" className="w-full" asChild>
          <Link to="/cart">View Cart</Link>
        </Button>
      </div>
    </div>
  );
};

export default CartSidebar;
