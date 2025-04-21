import React from "react";
import { Link } from "react-router-dom";
import { House, ArrowLeft, MagnifyingGlass } from "phosphor-react";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[92vh] px-4 text-gray-800 bg-gray-50 dark:bg-zinc-900 dark:text-white">
      <div className="w-full max-w-md text-center">
        <div className="relative mb-8">
          <div className="text-[150px] font-bold text-green-600 dark:text-green-400 opacity-20 leading-none select-none">
            404
          </div>
        </div>
        <h1 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
          Page Not Found
        </h1>
        <p className="mb-4 text-lg text-gray-600 dark:text-gray-300">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-2 font-medium text-white transition-all duration-300 bg-green-600 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            <House weight="bold" size={20} />
            Back to Home
          </Link>
        </div>
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center mt-8 font-medium text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400"
        >
          <ArrowLeft className="mr-2" size={18} weight="bold" />
          Go Back
        </button>
      </div>
      <div className="mt-16 text-sm text-center text-gray-500 dark:text-gray-400">
        <p>
          If you believe this is an error, please{" "}
          <Link
            to="/contact"
            className="text-green-600 hover:underline dark:text-green-500"
          >
            contact support
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
