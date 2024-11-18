// src/pages/Contact.jsx

import React from 'react';

const Contact = ({isDarkMode}) => {
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} p-6`}>
      <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'} mb-6`}>Contact Us</h1>
      <p className={`text-lg ${isDarkMode ? 'text-gray-50' : 'text-gray-700'} mb-10 text-center max-w-xl`}>
        Have any questions or need assistance? Reach out to us, and we'll get back to you as soon as possible.
        
      </p>
      
      <form className={`w-full max-w-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-8`}>
        <div className="mb-4">
          <label className={`block ${isDarkMode ? 'text-gray-50' : 'text-gray-700'} text-sm font-bold mb-2`} htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Your Name"
            className={`w-full p-3 border ${isDarkMode ? 'border-gray-900 bg-gray-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-400`}
          />
        </div>

        <div className="mb-4">
          <label className={`block ${isDarkMode ? 'text-gray-50' : 'text-gray-700'} text-sm font-bold mb-2`} htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Your Email"
            className={`w-full p-3 border ${isDarkMode ? 'border-gray-900 bg-gray-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-400`}
          />
        </div>

        <div className="mb-6">
          <label className={`block ${isDarkMode ? 'text-gray-50' : 'text-gray-700'} text-sm font-bold mb-2`} htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            rows="5"
            placeholder="Your Message"
            className={`w-full p-3 border ${isDarkMode ? 'border-gray-900 bg-gray-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-400`}
          ></textarea>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
