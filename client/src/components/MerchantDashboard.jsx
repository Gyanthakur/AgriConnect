import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  ChartBar,
  Gear,
  SignOut,
  Sun,
  Moon,
} from 'phosphor-react';
import { useClerk, useUser } from '@clerk/clerk-react';

import { cropSchema, sampleCrops } from '../assets/assets';

const MerchantDashboard = ({isDarkMode}) => {
  const { signOut } = useClerk(); // Clerk's signOut method
  const { user } = useUser(); // Accessing the current logged-in user data
  const [crops, setCrops] = useState(sampleCrops); // Use sampleCrops instead of fetching

  const [salesData, setSalesData] = useState({
    totalSales: 0,
    orders: 0,
    products: 0,
  });

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        // Fetch sales data from an actual API
        const salesResponse = await fetch('https://api.example.com/sales'); // Replace with actual API for sales data
        const salesData = await salesResponse.json();
        setSalesData(salesData);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchSalesData();
  }, []);

  const handleLogout = () => {
    signOut(); // Logout via Clerk
  };

  // Check if user and metadata are available before trying to access properties
  const userName = user ? user.fullName : 'Loading...';
  const userEmail = user ? user.emailAddresses[0]?.emailAddress : 'Loading...';
  const userLocation = user?.metadata?.location || 'Not Set';
  const userSpecialization = user?.metadata?.specialization || 'Not Set';

  return (
    <div className={`flex min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800'}`}>
      {/* Sidebar */}
      <aside className={`w-64 p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
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
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 p-2 rounded-md hover:bg-red-500 hover:text-white transition"
              >
                <SignOut size={20} />
                Logout
              </button>
            </li>
          </ul>
        </nav>
        
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <header className="mb-6">
          <h2 className="text-3xl font-bold">Welcome, Merchant!</h2>
          <p className="text-gray-600 dark:text-gray-400">Here’s what’s happening today:</p>
        </header>

        {/* Merchant Profile */}
        <section className="mb-6">
          <div className={`p-6 rounded-lg shadow ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white'}`}>
            <h3 className="text-xl font-semibold mb-4">Your Profile</h3>
            <div className="space-y-4">
              <p><strong>Name:</strong> {userName}</p>
              <p><strong>Email:</strong> {userEmail}</p>
              <p><strong>Location:</strong> {userLocation}</p>
              <p><strong>Specialization:</strong> {userSpecialization}</p>
            </div>
            <button
              className="mt-6 w-full py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
            >
              Update Profile
            </button>
          </div>
        </section>

        {/* Dashboard Widgets */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            className={`p-4 rounded-lg shadow ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white'}`}
          >
            <h3 className="text-xl font-semibold mb-2">Sales</h3>
            <p className="text-2xl font-bold">${salesData.totalSales}</p>
          </div>
          <div
            className={`p-4 rounded-lg shadow ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white'}`}
          >
            <h3 className="text-xl font-semibold mb-2">Orders</h3>
            <p className="text-2xl font-bold">{salesData.orders}</p>
          </div>
          <div
            className={`p-4 rounded-lg shadow ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white'}`}
          >
            <h3 className="text-xl font-semibold mb-2">Products</h3>
            <p className="text-2xl font-bold">{salesData.products}</p>
          </div>
        </section>

        {/* Crops Section */}
        <section className="mt-6">
          <h3 className="text-2xl font-semibold mb-4">Available Crops</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {crops.map((crop, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg shadow ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white'}`}
              >
                <h4 className="text-xl font-semibold">{crop.cropName} ({crop.hindiCropName})</h4>
                <p className="mt-2">Quantity: {crop.quantity}</p>
                <p className="mt-2">Price per Unit: ${crop.pricePerUnit}</p>
                <button className="mt-4 w-full py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white">
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default MerchantDashboard;
