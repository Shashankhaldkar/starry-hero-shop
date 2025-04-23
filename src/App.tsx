
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

  if (!isAuthenticated) {
    // Show login/register modal and nothing else if not authenticated
    return (
      <>
        <LoginRegisterModal open={true} />
        <div className="fixed inset-0 bg-starry-darkPurple/90 backdrop-blur-sm z-30" />
      </>
    );
  }

  return (
    <>
      <Toaster />
      <Sonner />
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* Admin route with role check */}
            <Route
              path="/admin/*"
              element={
                user && user.role === "admin" ? (
                  <AdminDashboard />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            
            {/* Check user role and redirect accordingly */}
            <Route
              path="/"
              element={
                user && user.role === "admin" ? (
                  <Navigate to="/admin" replace />
                ) : (
                  <Index />
                )
              }
            />
            
            {/* Regular user routes */}
            <Route path="/shop" element={
              user && user.role === "admin" ? (
                <Navigate to="/admin" replace />
              ) : (
                <Shop />
              )
            } />
            <Route path="/collections" element={
              user && user.role === "admin" ? (
                <Navigate to="/admin" replace />
              ) : (
                <Collections />
              )
            } />
            <Route path="/account" element={<Account />} />
            <Route path="/products" element={
              user && user.role === "admin" ? (
                <Navigate to="/admin" replace />
              ) : (
                <Products />
              )
            } />
            <Route path="/product/:id" element={
              user && user.role === "admin" ? (
                <Navigate to="/admin" replace />
              ) : (
                <ProductDetail />
              )
            } />
            <Route path="/cart" element={
              user && user.role === "admin" ? (
                <Navigate to="/admin" replace />
              ) : (
                <Cart />
              )
            } />
            <Route path="/wishlist" element={
              user && user.role === "admin" ? (
                <Navigate to="/admin" replace />
              ) : (
                <Wishlist />
              )
            } />
            <Route path="/about" element={
              user && user.role === "admin" ? (
                <Navigate to="/admin" replace />
              ) : (
                <About />
              )
            } />
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
