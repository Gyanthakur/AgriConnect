
import React, { useContext, useEffect, useState } from "react";
import { sampleCrops } from "../assets/assets"; // Import sampleCrops from assets
import { AppContext } from "../context/AppContext";
import axios from "axios";
import Loading from "./Loading";

const FarmerDashboard = ({ isDarkMode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [merchants, setMerchants] = useState([]);

  const {token,farmerData,loadFarmerProfileData,backendUrl} = useContext(AppContext)

  useEffect(() => {
    // Simulate token check and user retrieval
    // const token = localStorage.getItem("authToken"); // Assuming token is stored in localStorage
    if (token) {
      // Fetch user details if token exists (simulate API call)
      setTimeout(() => {
        setUser({
          Name: farmerData.name ,
          email: farmerData.email,
        });
        setLoading(false);
      }, 1000); // Simulate API response delay
    } else {
      setLoading(false); // No token, so stop loading
    }
  }, []);



  

   // Fetch all Merchants
   useEffect(() => {
    const getAllMerchants = async () => {
      try {
        const { data } = await axios.get(backendUrl + '/api/merchant/all-merchant');
        if (data.success) {
          setMerchants(data.merchants);
        }
      } catch (error) {
        console.error('Error fetching farmers:', error);
      }
    };
    getAllMerchants();
  }, [token]);

  // Show loading state while checking token or fetching user
  if (loading) {
    return <div className="flex items-center justify-center mt-10"><Loading/></div>;
  }

  // If no user data is available
  if (!user) {
    return <div>No user data available. Please log in.</div>;
  }

  // Conditional styles for dark mode
  const containerClass = isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900";
  const sectionClass = isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900";
  const headerClass = isDarkMode ? "bg-gray-700 text-white" : "bg-green-600 text-white";

  return (
    <div className={`min-h-screen   ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
		
      <div className="container mx-auto">
        {/* Header */}
        <header className={`  ${isDarkMode ? 'bg-gray-900 text-green-600'  : 'bg-green-200'} flex flex-col items-center  p-4 rounded-lg shadow-md mb-6`}>
          <h1 className="text-2xl flex text-center items-center font-bold">Welcome to the Former Dashboard</h1>
          <p className="text-sm flex text-center items-center">Your one-stop hub for managing farming activities.</p>
        </header>

        {/* User Info Section */}
       {/* User Info Section */}
<section className={`${sectionClass} p-6 rounded-lg shadow-md mb-6`}>
  <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
  <div>
    <p>
      <strong>Name:</strong> {farmerData?.name || "Not available"} 
    </p>
    <p>
      <strong>Email:</strong> {farmerData?.email || "Not available"}  
    </p>
  </div>
</section>





          {/* All Merchats Section */}
          <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} mb-5`}>

        
          <section className="mt-6">
  <h3 className="text-2xl font-semibold mb-4 pt-6 pl-6">All Merchants</h3>
  {merchants.length > 0 ? (
    <div className="overflow-x-auto px-6 ">
      <table className={`w-full mb-10 table-auto border-collapse border rounded-md ${isDarkMode ? 'bg-gray-800 text-gray-100 border-gray-700' : 'bg-white text-gray-800 border-gray-200'}`}>
        <thead>
          <tr className={isDarkMode ? "bg-gray-600" : "bg-gray-400"}>
            <th className="py-3 px-4 border-b border-gray-300 dark:border-gray-600 text-left">Name</th>
            <th className="py-3 px-4 border-b border-gray-300 dark:border-gray-600 text-left">Email</th>
            <th className="py-3 px-4 border-b border-gray-300 dark:border-gray-600 text-left">Contact</th>
          </tr>
        </thead>
        <tbody>
          {merchants.map((merchant, index) => (
            <tr key={index} className={`   ${isDarkMode ? 'bg-gray-700 hover:text-black hover:bg-gray-100' : 'bg-gray-200 hover:bg-gray-300 hover:text-black'}`}>
              <td className="py-3 px-4 border-b  border-gray-300 dark:border-gray-600">{merchant.name}</td>
              <td className="py-3 px-4 border-b border-gray-300 dark:border-gray-600">{merchant.email}</td>
              <td className="py-3 px-4 border-b border-gray-300 dark:border-gray-600">{merchant.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p className="text-gray-500 px-6">No merchants available.</p>
  )}
</section>


        </div>

        {/* Crop Management Section */}
        <section className={`${sectionClass} p-6 rounded-lg shadow-md mb-6`}>
          <h2 className="text-xl font-semibold mb-4">Your Crops</h2>
          <div className="space-y-4">
            {sampleCrops.map((crop, index) => (
              <div key={index} className={`p-4 ${isDarkMode ? "bg-gray-700" : "bg-gray-200"} rounded-lg shadow`}>
                <h3 className="text-lg font-semibold">{crop.cropName}</h3>
                <p>
                  <strong>Hindi Name:</strong> {crop.hindiCropName}
                </p>
                <p>
                  <strong>Quantity:</strong> {crop.quantity}
                </p>
                <p>
                  <strong>Price Per Unit:</strong> ₹{crop.pricePerUnit}
                </p>
                <p>
                  <strong>Description:</strong> {crop.description}
                </p>
                <p className="flex items-center">
                  <strong>Status:</strong>
                  <span
                    className={`ml-3 px-3 pb-1 mt-1 rounded-full text-white ${
                      crop.status === "Sold"
                        ? "bg-red-600"
                        : crop.status === "Pending"
                        ? "bg-blue-600"
                        : "bg-green-500"
                    }`}
                  >
                    {crop.status}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Dashboard Actions */}
        <section className={`${sectionClass} p-6 rounded-lg shadow-md`}>
          <h2 className="text-xl font-semibold mb-4">Dashboard Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className={`p-4 ${isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"} rounded-lg shadow cursor-pointer`}>
              <h3 className="text-lg font-semibold">Manage Crops</h3>
              <p className="text-sm">View and update your crop details.</p>
            </div>
            <div className={`p-4 ${isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"} rounded-lg shadow cursor-pointer`}>
              <h3 className="text-lg font-semibold">View Market Prices</h3>
              <p className="text-sm">Check current market rates for crops.</p>
            </div>
            <div className={`p-4 ${isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"} rounded-lg shadow cursor-pointer`}>
              <h3 className="text-lg font-semibold">Order Supplies</h3>
              <p className="text-sm">Order seeds, fertilizers, and other essentials.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FarmerDashboard;
