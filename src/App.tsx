
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import AdminLayout from "@/components/AdminLayout";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import BrandPage from "./pages/BrandPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminProductForm from "./pages/AdminProductForm";
import { AuthProvider } from "@/contexts/AuthContext";
import SearchResults from "./pages/SearchResults";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="products/new" element={<AdminProductForm />} />
                <Route path="products/edit/:id" element={<AdminProductForm />} />
              </Route>
              
              {/* User Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Layout />}>
                <Route index element={<Index />} />
                <Route path="/products/:slug" element={<ProductDetail />} />
                <Route path="/brand/:brandId" element={<BrandPage />} />
                <Route path="/category/:categoryId" element={<CategoryPage />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </TooltipProvider>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
