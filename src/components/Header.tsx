import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, Menu, X, Phone, Mail, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import CartSidebar from "@/components/CartSidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SearchInput from "@/components/SearchInput";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const { totalItems } = useCart();
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isMobile = useIsMobile();
  
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

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const CartComponent = isMobile ? (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart size={20} />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-brand-orange text-white p-1 h-5 min-w-5 flex items-center justify-center rounded-full">
              {totalItems}
            </Badge>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[90vh]">
        <CartSidebar />
      </DrawerContent>
    </Drawer>
  ) : (
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
  );

  return (
    <header className="w-full">
      {/* Top bar - hidden on mobile */}
      <div className="bg-brand-blue py-2 text-white hidden md:block">
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
          <div className="text-xl md:text-2xl font-bold text-brand-orange">
            MPARTS
            <span className="text-brand-blue ml-1">STORE</span>
          </div>
        </Link>

        {/* Desktop search */}
        <div className="hidden md:flex flex-grow mx-6">
          <SearchInput className="w-full" />
        </div>

        <div className="flex items-center space-x-3">
          {/* Mobile search button */}
          <Button 
            variant="outline" 
            size="icon" 
            className="md:hidden" 
            onClick={toggleSearch}
          >
            <Search size={20} />
          </Button>

          {/* Sign in option - only shown on desktop */}
          <div className="hidden lg:block">
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
          
          {CartComponent}
          
          <Button variant="outline" size="icon" className="lg:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {/* Mobile search overlay */}
      {isSearchOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 p-4">
          <div className="flex items-center gap-2">
            <div className="flex-grow">
              <SearchInput 
                className="w-full" 
                onMobileSearch={toggleSearch}
              />
            </div>
            <Button variant="ghost" size="icon" onClick={toggleSearch}>
              <X size={20} />
            </Button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="bg-brand-orange text-white">
        <div className="container px-4">
          {/* Desktop navigation */}
          <ul className="hidden lg:flex">
            {categories.map((category) => (
              <li key={category.name}>
                <Link
                  to={category.href}
                  className="block py-3 px-4 hover:bg-brand-orange/80 transition-colors text-sm"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile navigation */}
          {isMenuOpen && (
            <div className="lg:hidden absolute z-50 left-0 right-0 bg-white shadow-lg">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="font-semibold text-gray-900">Menu</h2>
                <Button variant="ghost" size="icon" onClick={toggleMenu}>
                  <X size={20} className="text-gray-900" />
                </Button>
              </div>
              <div className="p-2">
                <ul>
                  {categories.map((category) => (
                    <li key={category.name} className="border-b">
                      <Link
                        to={category.href}
                        className="block py-3 px-2 hover:bg-gray-50 text-gray-900"
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
                          className="block py-3 px-2 hover:bg-gray-50 text-gray-900"
                          onClick={toggleMenu}
                        >
                          My Account
                        </Link>
                      </li>
                      {user.role === 'admin' && (
                        <li className="border-b">
                          <Link
                            to="/admin"
                            className="block py-3 px-2 hover:bg-gray-50 text-gray-900"
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
                        className="block py-3 px-2 hover:bg-gray-50 text-gray-900"
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
