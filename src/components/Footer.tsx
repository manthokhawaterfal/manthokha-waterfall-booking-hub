
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Manthokha Waterfall</h3>
            <p className="text-gray-300 mb-4">
              Experience the beauty of Manthokha Waterfall with our premium accommodation options.
            </p>
            <p className="text-gray-300">
              District Kharmang, Gilgit-Baltistan, Pakistan
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-waterfall-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/hotels" className="text-gray-300 hover:text-waterfall-300 transition-colors">
                  Hotels
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-waterfall-300 transition-colors">
                  About Manthokha
                </Link>
              </li>
              <li>
                <Link to="/car-booking" className="text-gray-300 hover:text-waterfall-300 transition-colors">
                  Car Booking
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-waterfall-300 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <span className="font-medium">Phone:</span> +92 345 678 9012
              </li>
              <li>
                <span className="font-medium">Email:</span> info@manthokhawaterfall.com
              </li>
              <li>
                <span className="font-medium">Address:</span> Manthokha Waterfall, District Kharmang, Gilgit-Baltistan, Pakistan
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for updates and special offers.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-waterfall-400"
                required
              />
              <button
                type="submit"
                className="w-full bg-waterfall-600 hover:bg-waterfall-700 text-white font-medium py-2 px-4 rounded transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} ManthokhaWaterfall.com | All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-waterfall-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-waterfall-300 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-waterfall-300 transition-colors">
              FAQ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
