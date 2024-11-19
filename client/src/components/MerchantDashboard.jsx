import React, { useState } from 'react';
import {
  ShoppingBag,
  ChartBar,
  Gear,
  SignOut,
  Sun,
  Moon,
} from 'phosphor-react';

const MerchantDashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className={`flex min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800'}`}>
      {/* Sidebar */}
      <aside
        className={`w-64 p-4 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } shadow-md`}
      >
        <div className="flex items-center mb-6">
          <ShoppingBag size={32} className="text-blue-500" />
          <h1 className="text-2xl font-bold ml-3">Merchant Panel</h1>
        </div>

        <nav>
          <ul className="space-y-4">
            <li>
              <a
                href="#dashboard"
                className="flex items-center gap-3 p-2 rounded-md hover:bg-blue-500 hover:text-white transition"
              >
                <ChartBar size={20} />
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#settings"
                className="flex items-center gap-3 p-2 rounded-md hover:bg-blue-500 hover:text-white transition"
              >
                <Gear size={20} />
                Settings
              </a>
            </li>
            <li>
              <a
                href="#logout"
                className="flex items-center gap-3 p-2 rounded-md hover:bg-red-500 hover:text-white transition"
              >
                <SignOut size={20} />
                Logout
              </a>
            </li>
          </ul>
        </nav>
        <button
          onClick={toggleDarkMode}
          className={`mt-6 w-full flex items-center justify-center gap-2 py-2 rounded-md ${
            isDarkMode
              ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          Toggle Dark Mode
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <header className="mb-6">
          <h2 className="text-3xl font-bold">Welcome, Merchant!</h2>
          <p className="text-gray-600 dark:text-gray-400">Here’s what’s happening today:</p>
        </header>

        {/* Dashboard Widgets */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            className={`p-4 rounded-lg shadow ${
              isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white'
            }`}
          >
            <h3 className="text-xl font-semibold mb-2">Sales</h3>
            <p className="text-2xl font-bold">$12,345</p>
          </div>
          <div
            className={`p-4 rounded-lg shadow ${
              isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white'
            }`}
          >
            <h3 className="text-xl font-semibold mb-2">Orders</h3>
            <p className="text-2xl font-bold">125</p>
          </div>
          <div
            className={`p-4 rounded-lg shadow ${
              isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white'
            }`}
          >
            <h3 className="text-xl font-semibold mb-2">Products</h3>
            <p className="text-2xl font-bold">50</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MerchantDashboard;
