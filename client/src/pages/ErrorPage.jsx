// src/pages/ErrorPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold text-green-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Oops! Page not found.</h2>
      <p className="text-lg mb-6">
        Sorry, the page you're looking for doesn't exist. You might have followed an incorrect link or typed the wrong URL.
      </p>
      <Link
        to="/"
        className="px-6 py-2 text-lg font-medium text-white bg-green-500 rounded-md hover:bg-green-600 transition duration-300"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default ErrorPage;
