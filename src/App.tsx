
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import About from "./pages/About";

import Shop from "./pages/Shop";
import Collections from "./pages/Collections";
import Account from "./pages/Account";
import AdminDashboard from "./pages/Admin/AdminDashboard";

import { AuthProvider, useAuth } from "@/context/AuthContext";
import { LoginRegisterModal } from "@/components/LoginRegisterModal";

const queryClient = new QueryClient();

const ProtectedRoutes = () => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen text-xl">Loading...</div>;
  }

  // If user is not authenticated, show login modal
  if (!isAuthenticated) {
    return (
      <>
        <LoginRegisterModal open={true} />
        <div className="fixed inset-0 bg-starry-darkPurple/90 backdrop-blur-sm z-30" />
      </>
    );
  }

  // If user is authenticated and is an admin, redirect to admin dashboard
  if (user && user.role === "admin") {
    return (
      <>
        <Toaster />
        <Sonner />
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/admin/*" element={<AdminDashboard />} />
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </>
    );
  }

  // Regular user routes
  return (
    <>
      <Toaster />
      <Sonner />
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/account" element={<Account />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <ProtectedRoutes />
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
