
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className={`text-2xl font-bold ${isScrolled ? 'text-waterfall-800' : 'text-white'}`}>
            Manthokha<span className="text-waterfall-400">Waterfall</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`font-medium hover:text-waterfall-500 transition-colors ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/hotels" 
            className={`font-medium hover:text-waterfall-500 transition-colors ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}
          >
            Hotels
          </Link>
          <Link 
            to="/about" 
            className={`font-medium hover:text-waterfall-500 transition-colors ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}
          >
            About
          </Link>
          <Link 
            to="/car-booking" 
            className={`font-medium hover:text-waterfall-500 transition-colors ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}
          >
            Car Booking
          </Link>
          <Link 
            to="/contact" 
            className={`font-medium hover:text-waterfall-500 transition-colors ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}
          >
            Contact
          </Link>
          <Button className="bg-waterfall-600 hover:bg-waterfall-700 text-white">
            Book Now
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={isScrolled ? 'text-gray-700' : 'text-white'} size={24} />
          ) : (
            <Menu className={isScrolled ? 'text-gray-700' : 'text-white'} size={24} />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4 px-2">
          <nav className="flex flex-col space-y-4 px-4">
            <Link 
              to="/" 
              className="font-medium text-gray-700 hover:text-waterfall-500 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/hotels" 
              className="font-medium text-gray-700 hover:text-waterfall-500 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Hotels
            </Link>
            <Link 
              to="/about" 
              className="font-medium text-gray-700 hover:text-waterfall-500 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/car-booking" 
              className="font-medium text-gray-700 hover:text-waterfall-500 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Car Booking
            </Link>
            <Link 
              to="/contact" 
              className="font-medium text-gray-700 hover:text-waterfall-500 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Button className="bg-waterfall-600 hover:bg-waterfall-700 text-white">
              Book Now
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
