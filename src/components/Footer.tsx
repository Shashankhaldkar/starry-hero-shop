
import { Facebook, Instagram, Twitter, Mail, PhoneCall, MapPin, Github, Star, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-indigo-950 to-purple-950 border-t border-purple-800/30 pt-16 pb-8 relative overflow-hidden">
      {/* Comic-style decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute top-0 left-0 w-full h-20 bg-[radial-gradient(circle,_white_1px,_transparent_1px)] bg-[length:20px_20px]"></div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-[radial-gradient(circle,_white_1px,_transparent_1px)] bg-[length:20px_20px]"></div>
        <div className="absolute top-40 left-20 w-40 h-40 border-8 border-white rounded-full"></div>
        <div className="absolute bottom-60 right-40 w-60 h-60 border-8 border-white rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand section */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <span className="text-2xl font-bold bg-gradient-to-r text-white text-transparent bg-clip-text">
                Starry<span className="text-[#f97316]">Hero</span>
              </span>
            </Link>
            <p className="text-purple-300 mb-6 leading-relaxed">
              Embrace your inner hero with our comic-inspired apparel.
              Each design tells a story, just like you.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h3 className="text-white font-medium text-lg mb-6 flex items-center">
              <Star className="w-5 h-5 mr-2 text-yellow-400" /> Shop
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/collections" className="text-purple-300 hover:text-purple-200 transition-colors flex items-center">
                  <span className="w-1 h-1 bg-purple-400 rounded-full mr-2"></span>
                  All Collections
                </Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="text-purple-300 hover:text-purple-200 transition-colors flex items-center">
                  <span className="w-1 h-1 bg-purple-400 rounded-full mr-2"></span>
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/best-sellers" className="text-purple-300 hover:text-purple-200 transition-colors flex items-center">
                  <span className="w-1 h-1 bg-purple-400 rounded-full mr-2"></span>
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link to="/sale" className="text-purple-300 hover:text-purple-200 transition-colors flex items-center">
                  <span className="w-1 h-1 bg-purple-400 rounded-full mr-2"></span>
                  Sale
                </Link>
              </li>
              <li>
                <Link to="/gift-cards" className="text-purple-300 hover:text-purple-200 transition-colors flex items-center">
                  <span className="w-1 h-1 bg-purple-400 rounded-full mr-2"></span>
                  Gift Cards
                </Link>
              </li>
            </ul>
          </div>

          {/* Company info */}
          <div>
            <h3 className="text-white font-medium text-lg mb-6 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-yellow-400" /> Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-purple-300 hover:text-purple-200 transition-colors flex items-center">
                  <span className="w-1 h-1 bg-purple-400 rounded-full mr-2"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-purple-300 hover:text-purple-200 transition-colors flex items-center">
                  <span className="w-1 h-1 bg-purple-400 rounded-full mr-2"></span>
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-purple-300 hover:text-purple-200 transition-colors flex items-center">
                  <span className="w-1 h-1 bg-purple-400 rounded-full mr-2"></span>
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/sustainability" className="text-purple-300 hover:text-purple-200 transition-colors flex items-center">
                  <span className="w-1 h-1 bg-purple-400 rounded-full mr-2"></span>
                  Sustainability
                </Link>
              </li>
              <li>
                <Link to="/press" className="text-purple-300 hover:text-purple-200 transition-colors flex items-center">
                  <span className="w-1 h-1 bg-purple-400 rounded-full mr-2"></span>
                  Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact information */}
          <div>
            <h3 className="text-white font-medium text-lg mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-purple-400 mr-3 mt-0.5" />
                <span className="text-purple-300">
                  123 Comic Lane, Hero City<br />
                  Universe, 12345
                </span>
              </li>
              <li className="flex items-center">
                <PhoneCall className="w-5 h-5 text-purple-400 mr-3" />
                <a href="tel:+1234567890" className="text-purple-300 hover:text-purple-200 transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-purple-400 mr-3" />
                <a href="mailto:hello@heroicthreads.com" className="text-purple-300 hover:text-purple-200 transition-colors">
                  hello@heroicthreads.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright and policies */}
        <div className="mt-16 pt-8 border-t border-purple-800/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-purple-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} HeroicThreads. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <Link to="/privacy" className="text-purple-400 hover:text-purple-300 transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-purple-400 hover:text-purple-300 transition-colors text-sm">
              Terms of Service
            </Link>
            <Link to="/shipping" className="text-purple-400 hover:text-purple-300 transition-colors text-sm">
              Shipping Info
            </Link>
            <Link to="/faq" className="text-purple-400 hover:text-purple-300 transition-colors text-sm">
              FAQ
            </Link>
          </div>
        </div>

        {/* Comic-style signature */}
        <div className="text-center mt-8">
          <div className="inline-block px-4 py-1 bg-purple-900/30 border border-purple-700/30 rounded-md">
            <p className="text-purple-300 text-xs font-comic italic">Designed with superhero strength</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
