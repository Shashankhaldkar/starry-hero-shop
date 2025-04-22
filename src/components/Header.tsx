
import { useState, useEffect } from 'react';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export function Header() {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const isAdmin = user && user.role === 'admin';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-starry backdrop-blur-md border-b border-starry-darkPurple/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to={isAdmin ? "/admin" : "/"} className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-starry-purple to-starry-vividPurple text-transparent bg-clip-text">
                Starry<span className="text-starry-orange">Hero</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {isAdmin ? (
              <>
                <Link to="/admin" className="text-white hover:text-starry-purple transition-colors">
                  Dashboard
                </Link>
                <Link to="/admin/products" className="text-white hover:text-starry-purple transition-colors">
                  Products
                </Link>
                <Link to="/admin/orders" className="text-white hover:text-starry-purple transition-colors">
                  Orders
                </Link>
                <Link to="/admin/users" className="text-white hover:text-starry-purple transition-colors">
                  Users
                </Link>
              </>
            ) : (
              <>
                <Link to="/" className="text-white hover:text-starry-purple transition-colors">
                  Home
                </Link>
                <Link to="/shop" className="text-white hover:text-starry-purple transition-colors">
                  Shop
                </Link>
                <Link to="/collections" className="text-white hover:text-starry-purple transition-colors">
                  Collections
                </Link>
                <Link to="/about" className="text-white hover:text-starry-purple transition-colors">
                  About
                </Link>
              </>
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-white hover:text-starry-purple hover:bg-starry-darkPurple/20">
              <Search className="h-5 w-5" />
            </Button>
            <Link to="/account">
              <Button variant="ghost" size="icon" className="text-white hover:text-starry-purple hover:bg-starry-darkPurple/20">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            {!isAdmin && (
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="text-white hover:text-starry-purple hover:bg-starry-darkPurple/20 relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-starry-orange text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" className="text-white hover:text-starry-purple" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-6 space-y-4">
            <nav className="flex flex-col space-y-4">
              {isAdmin ? (
                <>
                  <Link to="/admin" className="text-white hover:text-starry-purple transition-colors px-2 py-1">
                    Dashboard
                  </Link>
                  <Link to="/admin/products" className="text-white hover:text-starry-purple transition-colors px-2 py-1">
                    Products
                  </Link>
                  <Link to="/admin/orders" className="text-white hover:text-starry-purple transition-colors px-2 py-1">
                    Orders
                  </Link>
                  <Link to="/admin/users" className="text-white hover:text-starry-purple transition-colors px-2 py-1">
                    Users
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/" className="text-white hover:text-starry-purple transition-colors px-2 py-1">
                    Home
                  </Link>
                  <Link to="/shop" className="text-white hover:text-starry-purple transition-colors px-2 py-1">
                    Shop
                  </Link>
                  <Link to="/collections" className="text-white hover:text-starry-purple transition-colors px-2 py-1">
                    Collections
                  </Link>
                  <Link to="/about" className="text-white hover:text-starry-purple transition-colors px-2 py-1">
                    About
                  </Link>
                </>
              )}
            </nav>
            <div className="flex items-center space-x-4 pt-4 border-t border-starry-darkPurple/20">
              <Button variant="ghost" size="icon" className="text-white hover:text-starry-purple">
                <Search className="h-5 w-5" />
              </Button>
              <Link to="/account">
                <Button variant="ghost" size="icon" className="text-white hover:text-starry-purple">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              {!isAdmin && (
                <Link to="/cart">
                  <Button variant="ghost" size="icon" className="text-white hover:text-starry-purple relative">
                    <ShoppingCart className="h-5 w-5" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-starry-orange text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
