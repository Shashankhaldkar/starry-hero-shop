
import { Facebook, Instagram, Twitter, Mail, PhoneCall, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gradient-starry border-t border-starry-darkPurple/30 pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand section */}
          <div>
            <a href="/" className="inline-block mb-6">
              <span className="text-2xl font-bold bg-gradient-to-r from-starry-purple to-starry-vividPurple text-transparent bg-clip-text">
                Starry<span className="text-starry-orange">Hero</span>
              </span>
            </a>
            <p className="text-starry-neutral mb-6 leading-relaxed">
              Embrace your inner hero with our comic-inspired t-shirts. 
              Each design tells a story, just like you.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-starry-neutral hover:text-starry-purple transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-starry-neutral hover:text-starry-purple transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-starry-neutral hover:text-starry-purple transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h3 className="text-white font-medium text-lg mb-6">Shop</h3>
            <ul className="space-y-3">
              <li>
                <a href="/collections" className="text-starry-neutral hover:text-starry-purple transition-colors">
                  All Collections
                </a>
              </li>
              <li>
                <a href="/new-arrivals" className="text-starry-neutral hover:text-starry-purple transition-colors">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="/best-sellers" className="text-starry-neutral hover:text-starry-purple transition-colors">
                  Best Sellers
                </a>
              </li>
              <li>
                <a href="/sale" className="text-starry-neutral hover:text-starry-purple transition-colors">
                  Sale
                </a>
              </li>
              <li>
                <a href="/gift-cards" className="text-starry-neutral hover:text-starry-purple transition-colors">
                  Gift Cards
                </a>
              </li>
            </ul>
          </div>

          {/* Company info */}
          <div>
            <h3 className="text-white font-medium text-lg mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="/about" className="text-starry-neutral hover:text-starry-purple transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/blog" className="text-starry-neutral hover:text-starry-purple transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="/careers" className="text-starry-neutral hover:text-starry-purple transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="/sustainability" className="text-starry-neutral hover:text-starry-purple transition-colors">
                  Sustainability
                </a>
              </li>
              <li>
                <a href="/press" className="text-starry-neutral hover:text-starry-purple transition-colors">
                  Press
                </a>
              </li>
            </ul>
          </div>

          {/* Contact information */}
          <div>
            <h3 className="text-white font-medium text-lg mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-starry-purple mr-3 mt-0.5" />
                <span className="text-starry-neutral">
                  123 Comic Lane, Hero City<br />
                  Universe, 12345
                </span>
              </li>
              <li className="flex items-center">
                <PhoneCall className="w-5 h-5 text-starry-purple mr-3" />
                <a href="tel:+1234567890" className="text-starry-neutral hover:text-starry-purple transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-starry-purple mr-3" />
                <a href="mailto:hello@starryhero.com" className="text-starry-neutral hover:text-starry-purple transition-colors">
                  hello@starryhero.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright and policies */}
        <div className="mt-16 pt-8 border-t border-starry-darkPurple/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-starry-neutral text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} StarryHero. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <a href="/privacy" className="text-starry-neutral hover:text-starry-purple transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="/terms" className="text-starry-neutral hover:text-starry-purple transition-colors text-sm">
              Terms of Service
            </a>
            <a href="/shipping" className="text-starry-neutral hover:text-starry-purple transition-colors text-sm">
              Shipping Info
            </a>
            <a href="/faq" className="text-starry-neutral hover:text-starry-purple transition-colors text-sm">
              FAQ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
