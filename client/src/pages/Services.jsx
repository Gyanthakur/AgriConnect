// src/pages/Services.jsx
import {
  NewspaperIcon,
  TrendingUpIcon,
  WalletIcon,
  TractorIcon,
  CloudIcon,
  PlaneTakeoffIcon,
  Leaf,
} from "lucide-react";
import React from "react";

const Services = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container px-6 mx-auto">
        <div className="mb-12 text-center">
          <h2 className="relative inline-block text-3xl font-bold">
            <span className="relative z-10">Our Services</span>
            <span className="absolute left-0 w-full h-3 bg-green-200 bottom-1 dark:bg-green-900 -z-10 opacity-60"></span>
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-gray-600 dark:text-gray-300">
            Complete agricultural solutions to help farmers thrive in every
            aspect of their operations
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 transition-all duration-300 shadow-lg bg-green-50 dark:bg-gray-700 rounded-xl hover:shadow-xl hover:-translate-y-1">
            <div className="flex items-center mb-4">
              <Leaf className="w-10 h-10 mr-3 text-green-600 dark:text-green-400" />
              <h3 className="text-xl font-bold">
                Crop Database & Planting Calculator
              </h3>
            </div>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              Explore crop info and optimize planting with our calculator.
            </p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mt-0.5 mr-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-600 dark:bg-green-400"></div>
                </div>
                Crop details for planting, care, and harvest
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mt-0.5 mr-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-600 dark:bg-green-400"></div>
                </div>
                Planting calculator based on location
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mt-0.5 mr-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-600 dark:bg-green-400"></div>
                </div>
                Seasonal planting recommendations
              </li>
            </ul>
            <div className="mt-6">
              <a
                href="/crop-database"
                className="font-medium text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
              >
                Learn more
              </a>
            </div>
          </div>

          <div className="p-6 transition-all duration-300 shadow-lg bg-green-50 dark:bg-gray-700 rounded-xl hover:shadow-xl hover:-translate-y-1">
            <div className="flex items-center mb-4">
              <TrendingUpIcon className="w-10 h-10 mr-3 text-green-600 dark:text-green-400" />
              <h3 className="text-xl font-bold">Market Price Updates</h3>
            </div>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              Stay informed on the latest market prices for your crops,
              livestock, and other agricultural products.
            </p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mt-0.5 mr-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-600 dark:bg-green-400"></div>
                </div>
                Real-time price notifications
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mt-0.5 mr-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-600 dark:bg-green-400"></div>
                </div>
                Historical price analysis
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mt-0.5 mr-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-600 dark:bg-green-400"></div>
                </div>
                Market trend forecasting
              </li>
            </ul>
            <div className="mt-6">
              <a
                href="/market-prices"
                className="font-medium text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
              >
                Check prices
              </a>
            </div>
          </div>
          <div className="p-6 transition-all duration-300 shadow-lg bg-green-50 dark:bg-gray-700 rounded-xl hover:shadow-xl hover:-translate-y-1">
            <div className="flex items-center mb-4">
              <CloudIcon className="w-10 h-10 mr-3 text-green-600 dark:text-green-400" />
              <h3 className="text-xl font-bold">Weather Insights</h3>
            </div>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              Access real-time weather forecasts and updates tailored to your
              region, helping you plan farming activities.
            </p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mt-0.5 mr-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-600 dark:bg-green-400"></div>
                </div>
                7-day forecast for your fields
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mt-0.5 mr-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-600 dark:bg-green-400"></div>
                </div>
                Extreme weather alerts
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mt-0.5 mr-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-600 dark:bg-green-400"></div>
                </div>
                Seasonal climate predictions
              </li>
            </ul>
            <div className="mt-6">
              <a
                href="/weather"
                className="font-medium text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
              >
                View weather updates
              </a>
            </div>
          </div>
          <div className="p-6 transition-all duration-300 shadow-lg bg-green-50 dark:bg-gray-700 rounded-xl hover:shadow-xl hover:-translate-y-1">
            <div className="flex items-center mb-4">
              <TractorIcon className="w-10 h-10 mr-3 text-green-600 dark:text-green-400" />
              <h3 className="text-xl font-bold">Farm Equipment Rentals</h3>
            </div>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              Easily rent the latest farming equipment without the cost of
              ownership, available near your area.
            </p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mt-0.5 mr-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-600 dark:bg-green-400"></div>
                </div>
                Wide range of modern equipment
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mt-0.5 mr-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-600 dark:bg-green-400"></div>
                </div>
                Flexible rental periods
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mt-0.5 mr-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-600 dark:bg-green-400"></div>
                </div>
                Technical support included
              </li>
            </ul>
            <div className="mt-6">
              <a
                href="/equipment-rentals"
                className="font-medium text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
              >
                Browse equipment
              </a>
            </div>
          </div>
          <div className="p-6 transition-all duration-300 shadow-lg bg-green-50 dark:bg-gray-700 rounded-xl hover:shadow-xl hover:-translate-y-1">
            <div className="flex items-center mb-4">
              <NewspaperIcon className="w-10 h-10 mr-3 text-green-600 dark:text-green-400" />
              <h3 className="text-xl font-bold">Agritech News</h3>
            </div>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              Stay updated on the latest technological advancements, industry
              trends, and innovations in agriculture.
            </p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mt-0.5 mr-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-600 dark:bg-green-400"></div>
                </div>
                Daily industry updates
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mt-0.5 mr-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-600 dark:bg-green-400"></div>
                </div>
                Innovation spotlights
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mt-0.5 mr-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-600 dark:bg-green-400"></div>
                </div>
                Expert analysis and insights
              </li>
            </ul>
            <div className="mt-6">
              <a
                href="/news"
                className="font-medium text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
              >
                Read more
              </a>
            </div>
          </div>
          <div className="p-6 transition-all duration-300 shadow-lg bg-green-50 dark:bg-gray-700 rounded-xl hover:shadow-xl hover:-translate-y-1">
            <div className="flex items-center mb-4">
              <WalletIcon className="w-10 h-10 mr-3 text-green-600 dark:text-green-400" />
              <h3 className="text-xl font-bold">
                Agriculture Chatbot Assistance
              </h3>
            </div>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              Get instant help with your farming-related queries using our
              AI-powered agriculture chatbot, available 24/7 to guide you.
            </p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mt-0.5 mr-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-600 dark:bg-green-400"></div>
                </div>
                Ask about crop care and seasonal practices
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mt-0.5 mr-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-600 dark:bg-green-400"></div>
                </div>
                Get guidance on irrigation and soil health
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mt-0.5 mr-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-600 dark:bg-green-400"></div>
                </div>
                Instant help with market prices and pest control
              </li>
            </ul>
            <div className="mt-6">
              <a
                href="/chatbot"
                className="font-medium text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
              >
                Chat with our Agriculture Assistant
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
