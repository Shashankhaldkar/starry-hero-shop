
import { useState, useEffect } from 'react';
import { ShoppingCart, User, Search, Menu, X, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";

export function Header() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const isAdmin = user && user.role === 'admin';

  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        setCartCount(cartItems.reduce((count, item) => count + item.quantity, 0));
      } catch (error) {
        console.error('Error parsing cart items:', error);
      }
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-starry backdrop-blur-md border-b border-gray-800/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Fixed visibility */}
          <div className="flex items-center">
            <Link to={isAdmin ? "/admin" : "/"} className="flex items-center space-x-2">
              <span className="site-name">
                Starry<span className="site-name-accent">Hero</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex centered-nav">
            {isAdmin ? (
              <></>
            ) : (
              <>
                <Link to="/" className="text-white hover:text-gray-300 transition-colors">
                  Home
                </Link>
                <Link to="/shop" className="text-white hover:text-gray-300 transition-colors">
                  Shop
                </Link>
                <Link to="/collections" className="text-white hover:text-gray-300 transition-colors">
                  Collections
                </Link>
                <Link to="/about" className="text-white hover:text-gray-300 transition-colors">
                  About
                </Link>
              </>
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAdmin && (
              <>
                {isSearchOpen ? (
                  <form onSubmit={handleSearchSubmit} className="relative animate-fade-in">
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-56 bg-gray-800/50 border-gray-700/30 text-white focus:border-gray-500"
                      autoFocus
                    />
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:text-gray-300"
                      onClick={toggleSearch}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </form>
                ) : (
                  <Button variant="ghost" size="icon" className="text-white hover:text-gray-300 hover:bg-gray-800/20" onClick={toggleSearch}>
                    <Search className="h-5 w-5" />
                  </Button>
                )}
                <Link to="/account">
                  <Button variant="ghost" size="icon" className="text-white hover:text-gray-300 hover:bg-gray-800/20">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/cart">
                  <Button variant="ghost" size="icon" className="text-white hover:text-gray-300 hover:bg-gray-800/20 relative">
                    <ShoppingCart className="h-5 w-5" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-gray-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </Button>
                </Link>
              </>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:text-gray-300 hover:bg-gray-800/20"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" className="text-white hover:text-gray-300" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-6 space-y-4">
            {/* Mobile Search */}
            {!isAdmin && (
              <form onSubmit={handleSearchSubmit} className="mb-4">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-800/50 border-gray-700/30 text-white"
                  />
                  <Button 
                    type="submit" 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-white"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            )}
            
            <nav className="flex flex-col items-center space-y-4">
              {isAdmin ? (
                <></>
              ) : (
                <>
                  <Link to="/" className="text-white hover:text-gray-300 transition-colors px-2 py-1">
                    Home
                  </Link>
                  <Link to="/shop" className="text-white hover:text-gray-300 transition-colors px-2 py-1">
                    Shop
                  </Link>
                  <Link to="/collections" className="text-white hover:text-gray-300 transition-colors px-2 py-1">
                    Collections
                  </Link>
                  <Link to="/about" className="text-white hover:text-gray-300 transition-colors px-2 py-1">
                    About
                  </Link>
                </>
              )}
            </nav>
            <div className="flex items-center justify-center space-x-4 pt-4 border-t border-gray-800/20">
              {!isAdmin && (
                <>
                  <Link to="/account">
                    <Button variant="ghost" size="icon" className="text-white hover:text-gray-300">
                      <User className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/cart">
                    <Button variant="ghost" size="icon" className="text-white hover:text-gray-300 relative">
                      <ShoppingCart className="h-5 w-5" />
                      {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-gray-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                          {cartCount}
                        </span>
                      )}
                    </Button>
                  </Link>
                </>
              )}
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:text-gray-300"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
