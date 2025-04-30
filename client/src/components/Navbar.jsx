import { Moon, Sun } from "phosphor-react";
import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { getToken, handleSignOut } from "../utils/token.utils";

const Navbar = ({ isDarkMode, toggleTheme }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const { user } = useContext(AppContext);
  const logout = () => {
    handleSignOut();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md dark:bg-gray-900">
      <div className="px-6 py-4 mx-auto ">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              className="w-8 h-8 text-green-600 dark:text-green-500"
              src={assets.logo}
              alt="Logo"
            />
            <span className="ml-2 text-xl font-bold dark:text-white">
              Agriconnect
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden space-x-8 md:flex">
            <NavLink
              to="/shop"
              className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500"
            >
              Shop
            </NavLink>
            <NavLink
              to="/chatbot"
              className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500"
            >
              Chatbot
            </NavLink>
            <NavLink
              to="/rental"
              className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500"
            >
              Rental
            </NavLink>
            {getToken() && user && (
              <>
                <NavLink
                  to="/services"
                  className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500"
                >
                  Services
                </NavLink>
                <NavLink
                  to="/dashboard"
                  className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500"
                >
                  Dashboard
                </NavLink>
              </>
            )}
          </div>

          {/* Auth and Theme Buttons */}
          <div className="flex items-center space-x-4">
            {getToken() && user ? (
              <div className="relative">
                <img
                  className="w-6 h-6 rounded-full cursor-pointer"
                  src={user?.image}
                  alt="Profile"
                  onClick={toggleDropdown}
                />
                {isDropdownOpen && (
                  <div className="absolute right-0 w-48 mt-2 text-black bg-white rounded shadow-lg dark:bg-gray-700 dark:text-white">
                    <p
                      onClick={() => {
                        navigate("/dashboard/settings");
                        setIsDropdownOpen(false);
                      }}
                      className="block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-500"
                    >
                      My Profile
                    </p>
                    <p
                      onClick={() => {
                        logout();
                        setIsDropdownOpen(false);
                      }}
                      className="block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-500"
                    >
                      Logout
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="hidden px-4 py-2 text-green-600 transition border border-green-600 rounded-lg md:block dark:border-green-500 dark:text-green-500 hover:bg-green-600 hover:text-white dark:hover:bg-green-500"
                >
                  Log In
                </NavLink>
                <NavLink
                  to="/register"
                  className="px-4 py-2 text-white transition bg-green-600 rounded-lg dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600"
                >
                  Sign Up
                </NavLink>
              </>
            )}
            <button
              onClick={toggleTheme}
              className="hidden text-gray-600 md:flex dark:text-gray-300"
            >
              {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
              
            </button>


            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="md:hidden focus:outline-none"
            >
              <span className="block w-6 h-0.5 bg-gray-600 dark:bg-gray-300 mb-1"></span>
              <span className="block w-6 h-0.5 bg-gray-600 dark:bg-gray-300 mb-1"></span>
              <span className="block w-6 h-0.5 bg-gray-600 dark:bg-gray-300"></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMenu && (
          <div className="flex flex-col items-center py-3 mt-4 space-y-4 md:hidden">
            <NavLink
              to="/"
              className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500"
            >
              Home
            </NavLink>
            <NavLink
              to="/about-us"
              className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500"
            >
              About
            </NavLink>
            <NavLink
              to="/rental"
              className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500"
            >
              Rental
            </NavLink>

            {getToken() ? (
              <>
                <NavLink
                  to="/services"
                  className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500"
                >
                  Services
                </NavLink>
                <NavLink
                  to="/dashboard"
                  className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500"
                >
                  My Dashboard
                </NavLink>
                <p
                  onClick={() => navigate("/dashboard/settings")}
                  className="text-gray-600 cursor-pointer dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500"
                >
                  My Profile
                </p>
                <button
                  onClick={logout}
                  className="text-red-500 hover:text-red-600 dark:hover:text-red-400"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="px-4 py-2 text-green-600 transition border border-green-600 rounded-lg dark:border-green-500 dark:text-green-500 hover:bg-green-600 hover:text-white dark:hover:bg-green-500"
                >
                  Log In
                </NavLink>
                <NavLink
                  to="/register"
                  className="px-4 py-2 text-white transition bg-green-600 rounded-lg dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600"
                >
                  Sign Up
                </NavLink>
              </>
            )}
            
            <button
              onClick={toggleTheme}
              className="text-gray-600 md:flex dark:text-gray-300"
            >
              {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
              
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
