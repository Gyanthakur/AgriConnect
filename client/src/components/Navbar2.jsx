import { Moon, Sun, CaretDown, CaretUp, MoonStars } from "phosphor-react";

import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { getToken } from "../utils/token.utils";

const Navbar = ({ isDarkMode, toggleTheme }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const { user } = useContext(AppContext);
  const logout = () => {
    setToken(false);
    setMtoken(false);
    localStorage.removeItem("token");
    localStorage.removeItem("mtoken");
    navigate("/");
  };

  return (
    <nav
      className={`p-4 py-3.5 bg-green-600 text-white border-b  dark:bg-zinc-800`}
    >
      <div className="flex items-center justify-between mx-auto">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img className="w-6 h-6" src={assets.logo} alt="Logo" />
          <h1 className="font-bold ">Agriconnect</h1>
        </div>

        {/* Desktop Links */}
        <ul className="items-center hidden space-x-4 md:flex">
          <NavLink to="/" className="hover:underline dark:hover:text-blue-500">
            <li>Home</li>
          </NavLink>
          <NavLink
            to="/chatbot"
            className="hover:underline dark:hover:text-blue-500"
          >
            <li>Chatbot</li>
          </NavLink>
          <NavLink
            to="/shop"
            className="hover:underline dark:hover:text-blue-500"
          >
            <li>Shop</li>
          </NavLink>
          {getToken() && user ? (
            <>
              <NavLink to="/services" className="hover:underline">
                <li>Services</li>
              </NavLink>
              <NavLink to="/dashboard" className="hover:underline">
                <li>Dashboard</li>
              </NavLink>

              <div className="relative">
                <img
                  className="w-8 h-8 rounded-full cursor-pointer"
                  src={user?.image}
                  alt="Profile"
                  onClick={toggleDropdown} // Toggle dropdown on click
                />
                {isDropdownOpen && ( // Render dropdown if state is true
                  <div
                    className={`absolute right-0 mt-2 w-48 rounded shadow-lg ${
                      isDarkMode
                        ? "bg-gray-700 text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    <p
                      onClick={() => {
                        navigate("/my-profile");
                        setIsDropdownOpen(false); // Close dropdown after navigation
                      }}
                      className={`block px-4 py-2 ${
                        isDarkMode ? "hover:bg-gray-500" : "hover:bg-gray-100"
                      } cursor-pointer`}
                    >
                      My Profile
                    </p>
                    <p
                      onClick={() => {
                        logout();
                        setIsDropdownOpen(false); // Close dropdown after logout
                      }}
                      className={`block px-4 py-2 ${
                        isDarkMode ? "hover:bg-gray-500" : "hover:bg-gray-100"
                      } cursor-pointer`}
                    >
                      Logout
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="px-4 py-1.5 rounded-md font-medium bg-green-600 text-white hover:bg-green-700 transition duration-200"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="px-4 py-1.5 rounded-md font-medium bg-white text-green-700 border border-green-600 hover:bg-green-100 transition duration-200"
              >
                Sign Up
              </NavLink>
            </>
          )}

          <button onClick={toggleTheme} className="ml-4">
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="md:hidden focus:outline-none"
        >
          <span className="block w-6 h-0.5 bg-current mb-1"></span>
          <span className="block w-6 h-0.5 bg-current mb-1"></span>
          <span className="block w-6 h-0.5 bg-current"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div
          className={`md:hidden mt-4 flex flex-col items-center space-y-4 ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-green-600 text-black"
          }`}
        >
          <NavLink to="/" className="hover:underline">
            Home
          </NavLink>
          <NavLink to="/about-us" className="hover:underline">
            About
          </NavLink>
          <NavLink to="/contact-us" className="hover:underline">
            Contact
          </NavLink>

          {getToken() ? (
            <>
              <NavLink to="/services" className="hover:underline">
                Services
              </NavLink>
              <NavLink to="/farmer-dashboard" className="hover:underline">
                My Dashboard
              </NavLink>

              <p
                onClick={() => navigate("/my-profile")}
                className={`block px-4 py-2 ${
                  isDarkMode ? "hover:bg-gray-500" : "hover:bg-gray-100"
                } cursor-pointer`}
              >
                My Profile
              </p>

              <button onClick={logout} className="text-red-500 hover:underline">
                Logout
              </button>
            </>
          ) : mtoken ? (
            <>
              <NavLink to="/services" className="hover:underline">
                Services
              </NavLink>
              <NavLink to="/merchant-dashboard" className="hover:underline">
                My Dashboard
              </NavLink>

              <p
                onClick={() => navigate("/my-m-profile")}
                className={`block px-4 py-2 ${
                  isDarkMode ? "hover:bg-gray-500" : "hover:bg-gray-100"
                } cursor-pointer`}
              >
                My Profile
              </p>

              <button onClick={logout} className="text-red-500 hover:underline">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login-farmer"
                className="px-4 py-1 bg-yellow-600 rounded-full hover:bg-yellow-700"
              >
                Farmer
              </NavLink>
              <NavLink
                to="/login-merchant"
                className="px-4 py-1 bg-blue-600 rounded-full hover:bg-blue-700"
              >
                Merchant
              </NavLink>
            </>
          )}
          <button onClick={toggleTheme} className="ml-4">
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
