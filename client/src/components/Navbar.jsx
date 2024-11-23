import React, { useState } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';
import { Moon, Sun } from 'phosphor-react';

const Navbar = ({ isDarkMode, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`p-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-green-600 text-white'}`}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img className="w-10 h-10" src={assets.logo} alt="Logo" />
          <Link to="/" className="text-2xl font-bold">Agriconnect</Link>
        </div>

        {/* Links */}
        <div className="hidden md:flex justify-center items-center space-x-6">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/about-us" className="hover:underline">About</Link>
          <SignedIn>
            <Link to="/services" className="hover:underline">Services</Link>
            <Link to="/contact-us" className="hover:underline">Contact</Link>
            <UserButton className="hover:underline"/>
          </SignedIn>
          <SignedOut>
            <div className="flex space-x-4">
              <Link to="/farmer-signup" className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700">
                Farmer Signup
              </Link>
              <Link to="/farmer-login" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Farmer Login
              </Link>
              <Link to="/merchant-signup" className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700">
                Merchant Signup
              </Link>
              <Link to="/merchant-login" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Merchant Login
              </Link>
            </div>
          </SignedOut>

          {/* Theme Toggle Button */}
          <button onClick={toggleTheme} className="ml-4">
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden focus:outline-none ml-4"
        >
          <span className="block w-6 h-0.5 bg-white mb-1"></span>
          <span className="block w-6 h-0.5 bg-white mb-1"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
        </button>
      </div>

      {/* Mobile Menu Links */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col items-center space-y-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/about-us" className="hover:underline">About</Link>
          <SignedIn>
            <Link to="/services" className="hover:underline">Services</Link>
            <Link to="/contact-us" className="hover:underline">Contact</Link>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <div className="flex flex-col space-y-2">
              <Link to="/farmer-login" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Farmer Login
              </Link>
              <Link to="/merchant-login" className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700">
                Merchant Login
              </Link>
            </div>
          </SignedOut>

          {/* Theme Toggle Button */}
          <button onClick={toggleTheme} className="">
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
