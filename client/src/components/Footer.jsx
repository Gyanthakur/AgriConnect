// src/components/Footer.jsx

import React from 'react';
import { FacebookLogo, TwitterLogo, InstagramLogo, LinkedinLogo } from 'phosphor-react'; // Importing Phosphor icons

const Footer = ({isDarkMode}) => {
  return (
    <footer className={`  py-8 mt-12 ${isDarkMode ? 'bg-gray-800 text-white ' : 'bg-green-600 text-white'}`}>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul>
              <li><a href="/about-us" className="hover:underline">About Us</a></li>
              <li><a href="/contact-us" className="hover:underline">Contact Us</a></li>
              <li><a href="/privacy-policy" className="hover:underline">Privacy Policy</a></li>
              <li><a href="/terms-of-service" className="hover:underline">Terms of Service</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul>
              <li><a href="/services" className="hover:underline">Services</a></li>
              <li><a href="/blog" className="hover:underline">Blog</a></li>
              <li><a href="/faq" className="hover:underline">FAQ</a></li>
              <li><a href="/help" className="hover:underline">Help</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <ul className="flex space-x-4">
              <li><a href="https://facebook.com" className="hover:text-gray-300"><FacebookLogo size={24} /></a></li>
              <li><a href="https://twitter.com" className="hover:text-gray-300"><TwitterLogo size={24} /></a></li>
              <li><a href="https://instagram.com" className="hover:text-gray-300"><InstagramLogo size={24} /></a></li>
              <li><a href="https://linkedin.com" className="hover:text-gray-300"><LinkedinLogo size={24} /></a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p>Phone: +91 1234567890</p>
            <p>Email: <a href="mailto:agriconnect@gmail.com" className="hover:underline">agriconnect@gmail.com</a></p>
            <p>Address: Sultanpur, Uttar Pradesh, India</p>
          </div>
        </div>
      </div>

      <div className={` text-center py-4 mt-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-green-700' }`}>
        <p className="text-sm">&copy; {new Date().getFullYear()} Agri Connect. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
