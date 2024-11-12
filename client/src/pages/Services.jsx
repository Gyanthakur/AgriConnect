// src/pages/Services.jsx

import React from 'react';

const Services = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-green-600 text-center mb-10">Our Services</h1>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Crop Advisory Service */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">Crop Advisory</h2>
          <p className="text-gray-700">
            Get personalized advice on crop selection, soil health, pest control, and optimal practices for each season.
          </p>
          <a 
            href="/crop-advisory"
            className="inline-block mt-4 text-green-600 hover:underline"
          >
            Learn more
          </a>
        </div>

        {/* Market Price Updates */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">Market Price Updates</h2>
          <p className="text-gray-700">
            Stay informed on the latest market prices for your crops, livestock, and other agricultural products.
          </p>
          <a 
            href="/market-prices"
            className="inline-block mt-4 text-green-600 hover:underline"
          >
            Check prices
          </a>
        </div>

        {/* Weather Insights */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">Weather Insights</h2>
          <p className="text-gray-700">
            Access real-time weather forecasts and updates tailored to your region, helping you plan farming activities.
          </p>
          <a 
            href="/weather"
            className="inline-block mt-4 text-green-600 hover:underline"
          >
            View weather updates
          </a>
        </div>

        {/* Farm Equipment Rentals */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">Farm Equipment Rentals</h2>
          <p className="text-gray-700">
            Easily rent the latest farming equipment without the cost of ownership, available near your area.
          </p>
          <a 
            href="/equipment-rentals"
            className="inline-block mt-4 text-green-600 hover:underline"
          >
            Browse equipment
          </a>
        </div>

        {/* Agritech News */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">Agritech News</h2>
          <p className="text-gray-700">
            Stay updated on the latest technological advancements, industry trends, and innovations in agriculture.
          </p>
          <a 
            href="/agritech-news"
            className="inline-block mt-4 text-green-600 hover:underline"
          >
            Read more
          </a>
        </div>

        {/* Financial and Insurance Guidance */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">Financial & Insurance Guidance</h2>
          <p className="text-gray-700">
            Access resources for loans, subsidies, and insurance options to support and secure your farming operations.
          </p>
          <a 
            href="/financial-guidance"
            className="inline-block mt-4 text-green-600 hover:underline"
          >
            Get financial advice
          </a>
        </div>
      </div>
    </div>
  );
};

export default Services;