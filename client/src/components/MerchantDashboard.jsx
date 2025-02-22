// import React, { useState, useEffect } from 'react';
// import {
//   ShoppingBag,
//   ChartBar,
//   Gear,
//   SignOut,
//   Sun,
//   Moon,
// } from 'phosphor-react';
// import { useClerk, useUser } from '@clerk/clerk-react';

// import { cropSchema, sampleCrops } from '../assets/assets';

// const MerchantDashboard = ({isDarkMode}) => {
//   const { signOut } = useClerk(); // Clerk's signOut method
//   const { user } = useUser(); // Accessing the current logged-in user data
//   const [crops, setCrops] = useState(sampleCrops); // Use sampleCrops instead of fetching

//   const [salesData, setSalesData] = useState({
//     totalSales: 0,
//     orders: 0,
//     products: 0,
//   });

//   useEffect(() => {
//     const fetchSalesData = async () => {
//       try {
//         // Fetch sales data from an actual API
//         const salesResponse = await fetch('https://api.example.com/sales'); // Replace with actual API for sales data
//         const salesData = await salesResponse.json();
//         setSalesData(salesData);
//       } catch (error) {
//         console.error('Error fetching sales data:', error);
//       }
//     };

//     fetchSalesData();
//   }, []);

//   const handleLogout = () => {
//     signOut(); // Logout via Clerk
//   };

//   // Check if user and metadata are available before trying to access properties
//   const userName = user ? user.fullName : 'Loading...';
//   const userEmail = user ? user.emailAddresses[0]?.emailAddress : 'Loading...';
//   const userLocation = user?.metadata?.location || 'Not Set';
//   const userSpecialization = user?.metadata?.specialization || 'Not Set';

//   return (
//     <div className={`flex min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800'}`}>
//       {/* Sidebar */}
//       <aside className={`w-64 p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
//         <div className="flex items-center mb-6">
//           <ShoppingBag size={32} className="text-blue-500" />
//           <h1 className="text-2xl font-bold ml-3">Merchant Panel</h1>
//         </div>

//         <nav>
//           <ul className="space-y-4">
//             <li>
//               <a
//                 href="#dashboard"
//                 className="flex items-center gap-3 p-2 rounded-md hover:bg-blue-500 hover:text-white transition"
//               >
//                 <ChartBar size={20} />
//                 Dashboard
//               </a>
//             </li>
//             <li>
//               <a
//                 href="#settings"
//                 className="flex items-center gap-3 p-2 rounded-md hover:bg-blue-500 hover:text-white transition"
//               >
//                 <Gear size={20} />
//                 Settings
//               </a>
//             </li>
//             <li>
//               <button
//                 onClick={handleLogout}
//                 className="flex items-center gap-3 p-2 rounded-md hover:bg-red-500 hover:text-white transition"
//               >
//                 <SignOut size={20} />
//                 Logout
//               </button>
//             </li>
//           </ul>
//         </nav>
        
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6">
//         <header className="mb-6">
//           <h2 className="text-3xl font-bold">Welcome, Merchant!</h2>
//           <p className="text-gray-600 dark:text-gray-400">Here’s what’s happening today:</p>
//         </header>

//         {/* Merchant Profile */}
//         <section className="mb-6">
//           <div className={`p-6 rounded-lg shadow ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white'}`}>
//             <h3 className="text-xl font-semibold mb-4">Your Profile</h3>
//             <div className="space-y-4">
//               <p><strong>Name:</strong> {userName}</p>
//               <p><strong>Email:</strong> {userEmail}</p>
//               <p><strong>Location:</strong> {userLocation}</p>
//               <p><strong>Specialization:</strong> {userSpecialization}</p>
//             </div>
//             <button
//               className="mt-6 w-full py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
//             >
//               Update Profile
//             </button>
//           </div>
//         </section>

//         {/* Dashboard Widgets */}
//         <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           <div
//             className={`p-4 rounded-lg shadow ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white'}`}
//           >
//             <h3 className="text-xl font-semibold mb-2">Sales</h3>
//             <p className="text-2xl font-bold">${salesData.totalSales}</p>
//           </div>
//           <div
//             className={`p-4 rounded-lg shadow ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white'}`}
//           >
//             <h3 className="text-xl font-semibold mb-2">Orders</h3>
//             <p className="text-2xl font-bold">{salesData.orders}</p>
//           </div>
//           <div
//             className={`p-4 rounded-lg shadow ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white'}`}
//           >
//             <h3 className="text-xl font-semibold mb-2">Products</h3>
//             <p className="text-2xl font-bold">{salesData.products}</p>
//           </div>
//         </section>

//         {/* Crops Section */}
//         <section className="mt-6">
//           <h3 className="text-2xl font-semibold mb-4">Available Crops</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {crops.map((crop, index) => (
//               <div
//                 key={index}
//                 className={`p-4 rounded-lg shadow ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white'}`}
//               >
//                 <h4 className="text-xl font-semibold">{crop.cropName} ({crop.hindiCropName})</h4>
//                 <p className="mt-2">Quantity: {crop.quantity}</p>
//                 <p className="mt-2">Price per Unit: ${crop.pricePerUnit}</p>
//                 <button className="mt-4 w-full py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white">
//                   Buy Now
//                 </button>
//               </div>
//             ))}
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default MerchantDashboard;









import React, { useState, useEffect, useContext } from 'react';
import {
  ShoppingBag,
  ChartBar,
  Gear,
  SignOut,
  Sun,
  Moon,
} from 'phosphor-react';
import { AppContext } from '../context/AppContext'; // Assuming AppContext is defined and provides mToken

import { cropSchema, sampleCrops } from '../assets/assets';
import axios from 'axios';

const MerchantDashboard = ({ isDarkMode }) => {
  const { mtoken, logout, backendUrl } = useContext(AppContext); // Using mToken from AppContext
  const [crops, setCrops] = useState(sampleCrops); // Use sampleCrops instead of fetching
  const [salesData, setSalesData] = useState({
    totalSales: 0,
    orders: 0,
    products: 0,
  });

  
  const [merchantData,setMerchantData] = useState(false)
  const [farmers, setFarmers] = useState([]);

  useEffect(() => {
    if (mtoken) {
      const fetchMerchantData = async () => {
        try {
         
          const {data} = await axios.get(backendUrl + '/api/merchant/get-profile', {headers:{mtoken}})
      
          console.log("get data m", data.merchantData);
          if(data.success)
          {
            setMerchantData(data.merchantData)
          }
          

          // Fetch sales data
          // const salesResponse = await fetch('https://api.example.com/sales', {
          //   headers: {
          //     Authorization: `Bearer ${mtoken}`,
          //   },
          // });
          // const salesData = await salesResponse.json();
          // setSalesData(salesData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchMerchantData();
    }
  }, [mtoken]);


  // Fetch all farmers
  useEffect(() => {
    const getAllFarmers = async () => {
      try {
        const { data } = await axios.get(backendUrl + '/api/farmer/all-farmer', {
          headers: { mtoken },
        });
        if (data.success) {
          setFarmers(data.farmers);
        }
      } catch (error) {
        console.error('Error fetching farmers:', error);
      }
    };
    getAllFarmers();
  }, [mtoken]);

  const handleLogout = () => {
    logout();
  };

  

  if (!mtoken) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800'}`}>
        <p className="text-xl">Please log in to access the dashboard.</p>
      </div>
    );
  }

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
          <h2 className="text-3xl font-bold">Welcome, {merchantData?.name || 'Merchant'}!</h2>
          <p className="text-gray-600 dark:text-gray-400">Here’s what’s happening today:</p>
        </header>

        {/* Merchant Profile */}
        <section className="mb-6">
          <div className={`p-6 rounded-lg shadow ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white'}`}>
            <h3 className="text-xl font-semibold mb-4">Your Profile</h3>
            <div className="space-y-4">
              <p><strong>Name:</strong> {merchantData?.name || 'Loading...'}</p>
              <p><strong>Email:</strong> {merchantData?.email || 'Loading...'}</p>
              <p><strong>Phone:</strong> {merchantData?.phone || 'Not Set'}</p>
              <p><strong>Gender:</strong> {merchantData?.gender || 'Not Set'}</p>
            </div>
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



        {/* Farmers Section */}
        {/* <section className="mt-6">
          <h3 className="text-2xl font-semibold mb-4">All Farmers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {farmers.length > 0 ? (
              farmers.map((farmer, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg shadow ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white'}`}
                >
                  <h4 className="text-xl font-semibold">{farmer.name}</h4>
                  <p className="mt-2">Email: {farmer.email}</p>
                  <p className="mt-2">Contact: {farmer.phone}</p>
                </div>
              ))
            ) : (
              <p>No farmers available.</p>
            )}
          </div>
        </section> */}
        
        <section className="mt-6">
  <h3 className="text-2xl font-semibold mb-4">All Farmers</h3>
  {farmers.length > 0 ? (
    <div className="overflow-x-auto">
      <table className={`w-full table-auto border-collapse border ${isDarkMode ? 'bg-gray-800 text-gray-100 border-gray-700' : 'bg-white text-gray-800 border-gray-200'}`}>
        <thead>
          <tr className={isDarkMode ? "bg-gray-700" : "bg-gray-300"}>
            <th className="py-3 px-4 border-b border-gray-300 dark:border-gray-600 text-left">Name</th>
            <th className="py-3 px-4 border-b border-gray-300 dark:border-gray-600 text-left">Email</th>
            <th className="py-3 px-4 border-b border-gray-300 dark:border-gray-600 text-left">Contact</th>
          </tr>
        </thead>
        <tbody>
          {farmers.map((farmer, index) => (
            <tr key={index} className={` focus:ring-1 ${isDarkMode ? 'border-gray-700 hover:bg-gray-600' : ' hover:bg-gray-200'}`}>
              <td className="py-3 px-4 border-b border-gray-300 dark:border-gray-600">{farmer.name}</td>
              <td className="py-3 px-4 border-b border-gray-300 dark:border-gray-600">{farmer.email}</td>
              <td className="py-3 px-4 border-b border-gray-300 dark:border-gray-600">{farmer.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p className="text-gray-500">No farmers available.</p>
  )}
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
