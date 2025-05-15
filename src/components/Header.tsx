
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, Menu, X, Phone, Mail, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CartSidebar from "@/components/CartSidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { totalItems } = useCart();
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const categories = [
    { name: "MOBILE DISPLAY", href: "/category/mobile-display" },
    { name: "MOBILE SPARE PARTS", href: "/category/mobile-spare-parts" },
    { name: "LAPTOP SPARES", href: "/category/laptop-spares" },
    { name: "TOOLS", href: "/category/tools" },
    { name: "ACCESSORIES", href: "/category/accessories" },
    { name: "REPAIR COURSE", href: "/repair-course" },
    { name: "BLOGS", href: "/blogs" },
    { name: "FAQS", href: "/faqs" },
    { name: "ABOUT", href: "/about" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full">
      {/* Top bar */}
      <div className="bg-brand-blue py-2 text-white">
        <div className="container flex flex-wrap items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <Phone size={16} />
              <span className="text-sm">+91 9967901100</span>
            </Link>
            <Link to="/" className="flex items-center space-x-2">
              <Mail size={16} />
              <span className="text-sm">spareparts@example.com</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/track-order" className="text-sm hover:underline">
              Track Order
            </Link>
            <Link to="/contact" className="text-sm hover:underline">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container flex items-center justify-between py-4 px-4">
        <Link to="/" className="flex-shrink-0">
          <div className="text-2xl font-bold text-brand-orange">
            MPARTS
            <span className="text-brand-blue ml-1">STORE</span>
          </div>
        </Link>

        <div className="hidden md:flex flex-grow mx-6 relative">
          <Input 
            type="search" 
            placeholder="Search the store" 
            className="w-full pr-10"
          />
          <Button 
            variant="ghost" 
            size="icon"
            className="absolute right-0 top-0 h-full text-gray-400 hover:text-brand-orange"
          >
            <Search size={20} />
          </Button>
        </div>

        <div className="flex items-center space-x-3">
          <div className="hidden md:block">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <User size={18} />
                    <span>{user.name || user.email.split('@')[0]}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/account">My Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/orders">My Orders</Link>
                  </DropdownMenuItem>
                  {user.role === 'admin' && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/admin">Admin Panel</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="text-red-500">
                    <LogOut size={16} className="mr-2" /> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login" className="text-sm font-medium hover:text-brand-orange flex items-center gap-1">
                <User size={18} />
                Sign In
              </Link>
            )}
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-brand-orange text-white p-1 h-5 min-w-5 flex items-center justify-center rounded-full">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[400px] p-0">
              <CartSidebar />
            </SheetContent>
          </Sheet>
          
          <Button variant="outline" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-brand-orange text-white">
        <div className="container px-4">
          {/* Desktop navigation */}
          <ul className="hidden md:flex">
            {categories.map((category) => (
              <li key={category.name}>
                <Link
                  to={category.href}
                  className="block py-3 px-4 hover:bg-brand-orange/80 transition-colors"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile navigation */}
          {isMenuOpen && (
            <div className="md:hidden absolute z-50 left-0 right-0 bg-white shadow-lg">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="font-semibold">Menu</h2>
                <Button variant="ghost" size="icon" onClick={toggleMenu}>
                  <X size={20} />
                </Button>
              </div>
              <div className="p-2">
                <div className="relative mb-4">
                  <Input 
                    type="search" 
                    placeholder="Search the store" 
                    className="w-full pr-10"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="absolute right-0 top-0 h-full text-gray-400"
                  >
                    <Search size={20} />
                  </Button>
                </div>
                <ul>
                  {categories.map((category) => (
                    <li key={category.name} className="border-b">
                      <Link
                        to={category.href}
                        className="block py-3 px-2 hover:bg-gray-50"
                        onClick={toggleMenu}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                  {user ? (
                    <>
                      <li className="border-b">
                        <Link
                          to="/account"
                          className="block py-3 px-2 hover:bg-gray-50"
                          onClick={toggleMenu}
                        >
                          My Account
                        </Link>
                      </li>
                      {user.role === 'admin' && (
                        <li className="border-b">
                          <Link
                            to="/admin"
                            className="block py-3 px-2 hover:bg-gray-50"
                            onClick={toggleMenu}
                          >
                            Admin Panel
                          </Link>
                        </li>
                      )}
                      <li className="border-b">
                        <button
                          onClick={() => {
                            signOut();
                            toggleMenu();
                          }}
                          className="block w-full text-left py-3 px-2 hover:bg-gray-50 text-red-500"
                        >
                          Sign Out
                        </button>
                      </li>
                    </>
                  ) : (
                    <li className="border-b">
                      <Link
                        to="/login"
                        className="block py-3 px-2 hover:bg-gray-50"
                        onClick={toggleMenu}
                      >
                        Sign In / Register
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
