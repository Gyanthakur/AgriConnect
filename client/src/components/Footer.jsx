// src/components/Footer.jsx

import React from "react";
import {
  FacebookLogo,
  TwitterLogo,
  InstagramLogo,
  LinkedinLogo,
} from "phosphor-react";
import Logger from "./Logger";

const Footer = () => {
  return (
    <footer className="text-white bg-gradient-to-r from-green-700 to-green-600 dark:from-zinc-900 dark:to-zinc-800">
      {/* Main Footer */}
      <div className="container px-4 py-12 mx-auto">
        <div className="flex flex-col justify-between md:flex-row">
          {/* Left Column - Company Info & Logo */}
          <div className="mb-8 md:mb-0 md:w-1/3">
            <h2 className="mb-6 text-2xl font-bold">Agri Connect</h2>
            <p className="max-w-md mb-6 text-gray-100 dark:text-gray-300">
              Connecting farmers with technology, resources, and markets for
              sustainable agriculture.
            </p>

            {/* Social Media */}
            <div className="mt-6">
              <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
              <div className="flex space-x-5">
                <a
                  href="https://facebook.com"
                  className="p-2 text-green-700 transition duration-300 bg-white rounded-full dark:text-zinc-800 hover:bg-gray-200"
                  aria-label="Facebook"
                >
                  <FacebookLogo size={20} weight="fill" />
                </a>
                <a
                  href="https://twitter.com"
                  className="p-2 text-green-700 transition duration-300 bg-white rounded-full dark:text-zinc-800 hover:bg-gray-200"
                  aria-label="Twitter"
                >
                  <TwitterLogo size={20} weight="fill" />
                </a>
                <a
                  href="https://instagram.com"
                  className="p-2 text-green-700 transition duration-300 bg-white rounded-full dark:text-zinc-800 hover:bg-gray-200"
                  aria-label="Instagram"
                >
                  <InstagramLogo size={20} weight="fill" />
                </a>
                <a
                  href="https://linkedin.com"
                  className="p-2 text-green-700 transition duration-300 bg-white rounded-full dark:text-zinc-800 hover:bg-gray-200"
                  aria-label="LinkedIn"
                >
                  <LinkedinLogo size={20} weight="fill" />
                </a>
                <div className="ml-1">
                  <Logger />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Links and Contact */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 md:w-2/3">
            {/* Quick Links */}
            <div>
              <h3 className="pb-2 mb-4 text-lg font-semibold border-b border-white/20">
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="/about-us"
                    className="flex items-center transition duration-300 hover:text-gray-300"
                  >
                    <span className="mr-2">›</span> About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/contact-us"
                    className="flex items-center transition duration-300 hover:text-gray-300"
                  >
                    <span className="mr-2">›</span> Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy-policy"
                    className="flex items-center transition duration-300 hover:text-gray-300"
                  >
                    <span className="mr-2">›</span> Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/terms-of-service"
                    className="flex items-center transition duration-300 hover:text-gray-300"
                  >
                    <span className="mr-2">›</span> Terms of Service
                  </a>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="pb-2 mb-4 text-lg font-semibold border-b border-white/20">
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="/services"
                    className="flex items-center transition duration-300 hover:text-gray-300"
                  >
                    <span className="mr-2">›</span> Services
                  </a>
                </li>
                <li>
                  <a
                    href="/blog"
                    className="flex items-center transition duration-300 hover:text-gray-300"
                  >
                    <span className="mr-2">›</span> Blog
                  </a>
                </li>
                <li>
                  <a
                    href="/faq"
                    className="flex items-center transition duration-300 hover:text-gray-300"
                  >
                    <span className="mr-2">›</span> FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="/help"
                    className="flex items-center transition duration-300 hover:text-gray-300"
                  >
                    <span className="mr-2">›</span> Help
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="pb-2 mb-4 text-lg font-semibold border-b border-white/20">
                Contact
              </h3>
              <address className="space-y-3 not-italic text-gray-100 dark:text-gray-300">
                <p className="flex items-center">
                  <span className="inline-block w-5 mr-2">📞</span> +91
                  1234567890
                </p>
                <p className="flex items-center">
                  <span className="inline-block w-5 mr-2">✉️</span>
                  <a
                    href="mailto:agriconnect@gmail.com"
                    className="transition duration-300 hover:text-white"
                  >
                    agriconnect@gmail.com
                  </a>
                </p>
                <p className="flex items-center">
                  <span className="inline-block w-5 mr-2">📍</span> Sultanpur,
                  Uttar Pradesh, India
                </p>
              </address>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="py-4 text-center bg-green-800 dark:bg-black/30">
        <div className="container mx-auto">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Agri Connect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
