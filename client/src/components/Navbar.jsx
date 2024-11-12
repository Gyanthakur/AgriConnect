import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-green-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}


        <div className="text-2xl font-bold">Agriconnect</div>


        {/* Links */}
        <div className="hidden md:flex space-x-6 ">
        <SignedIn>
          <Link to={"/"}  className="hover:underline">Home</Link>
          <Link to={"/about"}  className="hover:underline">About</Link>
          <Link to={"/services"}  className="hover:underline">Services</Link>
          <Link to={"/contact"}  className="hover:underline">Contact</Link>
          <UserButton/>
          </SignedIn>

          <SignedOut>
            <SignInButton/>
          </SignedOut>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden focus:outline-none"
        >
          <span className="block w-6 h-0.5 bg-white mb-1"></span>
          <span className="block w-6 h-0.5 bg-white mb-1"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
        </button>
      </div>

      {/* Mobile Menu Links */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col items-center space-y-4 active:underline">
           <SignedIn>
          <Link to={"/"}  className="hover:underline">Home</Link>
          <Link to={"/about"}  className="hover:underline">About</Link>
          <Link to={"/services"}  className="hover:underline">Services</Link>
          <Link to={"/contact"}  className="hover:underline">Contact</Link>
          <UserButton/>
          </SignedIn>

          <SignedOut>
            <SignInButton/>
          </SignedOut>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
