import React from 'react';
import { useUser } from '@clerk/clerk-react';

const FormerDashboard = () => {
  const { firstName, lastName, emailAddress } = useUser();

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <div className="container mx-auto">
        {/* Header */}
        <header className="bg-green-600 text-white p-4 rounded-lg shadow-md mb-6">
          <h1 className="text-2xl font-bold">Welcome to the Former Dashboard</h1>
          <p className="text-sm">Your one-stop hub for managing farming activities.</p>
        </header>

        {/* User Info Section */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
          <div>
            <p><strong>Name:</strong> {firstName} {lastName}</p>
            <p><strong>Email:</strong> {emailAddress}</p>
          </div>
        </section>

        {/* Dashboard Actions */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Dashboard Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Example Action */}
            <div className="bg-gray-200 p-4 rounded-lg shadow hover:bg-gray-300 cursor-pointer">
              <h3 className="text-lg font-semibold">Manage Crops</h3>
              <p className="text-sm">View and update your crop details.</p>
            </div>
            <div className="bg-gray-200 p-4 rounded-lg shadow hover:bg-gray-300 cursor-pointer">
              <h3 className="text-lg font-semibold">View Market Prices</h3>
              <p className="text-sm">Check current market rates for crops.</p>
            </div>
            <div className="bg-gray-200 p-4 rounded-lg shadow hover:bg-gray-300 cursor-pointer">
              <h3 className="text-lg font-semibold">Order Supplies</h3>
              <p className="text-sm">Order seeds, fertilizers, and other essentials.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FormerDashboard;
