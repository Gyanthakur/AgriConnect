import React from 'react';
import { Link } from 'react-router-dom';

const InformationResources = ({isDarkMode}) => {
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-50' : 'bg-gray-50 text-gray-800'} `}>
      <hr />
      <div className="container mx-auto py-16 px-6">
        
        {/* Main Heading */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold leading-normal text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-400">
            Easy Access to Information
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg">
            Stay updated with the latest market prices, crop health tips, daily weather forecasts, and a wealth of resources on everything agriculture-related.
          </p>
        </header>

        {/* Bread Information Section */}
        <section className="mb-12">
          <h2 className={`text-3xl font-semibold mb-4 ${isDarkMode ? 'text-green-400' : 'text-green-600'} `}>Bread Information</h2>
          <p className="text-lg mb-4">
            Explore a variety of bread types and their nutritional values, popular among farmers for sustainable food practices.
          </p>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li>Whole Wheat Bread: High in fiber and essential nutrients.</li>
            <li>Multigrain Bread: Contains multiple grains, beneficial for health.</li>
            <li>Rye Bread: Known for its earthy flavor and health benefits.</li>
            <li>Sourdough Bread: Easier to digest, with a rich source of probiotics.</li>
          </ul>
        </section>

        {/* Farmer Profiles Section */}
        <section className="mb-12">
          <h2 className={`text-3xl font-semibold mb-4 ${isDarkMode ? 'text-green-400' : 'text-green-600'} `}>Farmers' Profiles</h2>
          <p className="text-lg mb-4">
            Connect with experienced farmers across various regions. Learn about their farming methods, success stories, and shared insights.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className={`p-6  ${isDarkMode ? 'bg-gray-700' : 'bg-green-50'} rounded-lg shadow-md`}>
              <h3 className="text-xl font-bold">Farmer A</h3>
              <p>Specializes in organic farming methods and sustainable agriculture practices.</p>
            </div>
            <div className={`p-6  ${isDarkMode ? 'bg-gray-700' : 'bg-green-50'} rounded-lg shadow-md`}>
              <h3 className="text-xl font-bold">Farmer B</h3>
              <p>Expert in crop rotation and water management for drought-prone areas.</p>
            </div>
            <div className={`p-6  ${isDarkMode ? 'bg-gray-700' : 'bg-green-50'} rounded-lg shadow-md`}>
              <h3 className="text-xl font-bold">Farmer C</h3>
              <p>Pioneer in integrating technology for precision farming and yield optimization.</p>
            </div>
          </div>
        </section>

        {/* Brand Information Section */}
        <section className="mb-12">
          <h2 className={`text-3xl font-semibold mb-4 ${isDarkMode ? 'text-green-400' : 'text-green-600'} `}>Agriculture Brand Insights</h2>
          <p className="text-lg mb-4">
            Discover popular brands in agriculture that offer tools, fertilizers, seeds, and other essential resources for farming.
          </p>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li><strong>AgriTech Solutions:</strong> Provides advanced equipment for precision farming.</li>
            <li><strong>GreenGrow:</strong> Known for organic fertilizers and sustainable crop solutions.</li>
            <li><strong>HarvestMax:</strong> A leader in high-yield seeds and pest-resistant crop varieties.</li>
          </ul>
        </section>

        {/* Merchant Information Section */}
        <section className="mb-12">
          <h2 className={`text-3xl font-semibold mb-4 ${isDarkMode ? 'text-green-400' : 'text-green-600'} `}>Merchant Listings</h2>
          <p className="text-lg mb-4">
            Find local and national merchants who supply agricultural products, machinery, and resources.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={`p-6  ${isDarkMode ? 'bg-gray-700' : 'bg-green-50'} rounded-lg shadow-md`}>
              <h3 className="text-xl font-bold">Merchant X</h3>
              <p>Specializes in farm machinery and irrigation systems.</p>
            </div>
            <div className={`p-6  ${isDarkMode ? 'bg-gray-700' : 'bg-green-50'} rounded-lg shadow-md`}>
              <h3 className="text-xl font-bold">Merchant Y</h3>
              <p>Offers a wide range of seeds and organic fertilizers.</p>
            </div>
            <div className={`p-6  ${isDarkMode ? 'bg-gray-700' : 'bg-green-50'} rounded-lg shadow-md`}>
              <h3 className="text-xl font-bold">Merchant Z</h3>
              <p>Provides greenhouses, tools, and accessories for modern farming.</p>
            </div>
          </div>
        </section>

        {/* Additional Resources Section */}
        <section className="mb-12">
          <h2 className={`text-3xl font-semibold mb-4 ${isDarkMode ? 'text-green-400' : 'text-green-600'} `}>Additional Resources</h2>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li>
              <Link
                to="/market-price"
                rel="noopener noreferrer"
                className={` ${isDarkMode ? 'text-green-400 hover:text-sky-500' : 'text-green-500 hover:text-green-700'} underline`}
              >
                Market Prices
              </Link>: Get daily updates on crop prices to make informed selling decisions.
            </li>
            <li>
              <Link
                to="/weather-forecast"
                rel="noopener noreferrer"
                className={` ${isDarkMode ? 'text-green-400 hover:text-sky-500' : 'text-green-500 hover:text-green-700'} underline`}
              >
                Weather Forecast
              </Link>: Access real-time weather forecasts for optimal planning.
            </li>
            <li>
              <Link
                to="/crop-health-tips"
                rel="noopener noreferrer"
                className={` ${isDarkMode ? 'text-green-400 hover:text-sky-500' : 'text-green-500 hover:text-green-700'} underline`}
              >
                Crop Health Tips
              </Link>: Explore best practices for maintaining crop health and maximizing yield.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default InformationResources;
