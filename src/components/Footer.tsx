
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";

const Footer = () => {
  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Thank you for subscribing to our newsletter!");
  };

  return (
    <footer className="bg-gray-900 text-white pt-12">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-brand-orange">CONTACT US</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-brand-orange flex-shrink-0" />
                <p className="text-sm">501, Star CJ Plaza, Lamington Road, Grant Road East, Mumbai - 400007</p>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-brand-orange flex-shrink-0" />
                <p className="text-sm">+91 9967901100</p>
              </div>
              <div className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-brand-orange flex-shrink-0" />
                <p className="text-sm">spareparts@example.com</p>
              </div>
              <div className="flex items-center space-x-4 pt-2">
                <Link to="#" className="hover:text-brand-orange">
                  <Facebook size={20} />
                </Link>
                <Link to="#" className="hover:text-brand-orange">
                  <Instagram size={20} />
                </Link>
                <Link to="#" className="hover:text-brand-orange">
                  <Youtube size={20} />
                </Link>
              </div>
            </div>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-brand-orange">INFORMATION</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/account" className="hover:text-brand-orange">My Account</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-orange">Contact Us</Link>
              </li>
              <li>
                <Link to="/academy" className="hover:text-brand-orange">Repair Academy</Link>
              </li>
              <li>
                <Link to="/life-at-mparts" className="hover:text-brand-orange">Life At MParts</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-brand-orange">Terms Of Service</Link>
              </li>
              <li>
                <Link to="/refund-policy" className="hover:text-brand-orange">Refund Policy</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-brand-orange">CUSTOMER SERVICE</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/support" className="hover:text-brand-orange">Customer Support</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-brand-orange">Terms & Condition</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-brand-orange">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/warranty" className="hover:text-brand-orange">Warranty</Link>
              </li>
              <li>
                <Link to="/track-order" className="hover:text-brand-orange">Order Tracking</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-brand-orange">NEWSLETTER SIGN UP</h3>
            <p className="text-sm mb-4">Sign up for exclusive updates, new arrivals & insider only discounts</p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email address"
                required
                className="bg-gray-800 border-gray-700 focus:border-brand-orange"
              />
              <Button type="submit" className="w-full bg-brand-orange text-white hover:bg-brand-orange/90">
                SUBMIT
              </Button>
            </form>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-center py-6 mt-8 border-t border-gray-800 text-sm">
          <p>Disclaimer: All company, product and service names used in this website are for identification purposes only.</p>
          <p className="mt-2">© {new Date().getFullYear()} MParts Store. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
