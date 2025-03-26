

import React, { useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const SellCrop = ({ isDarkMode }) => {
  const { token, backendUrl, farmerData } = useContext(AppContext);
  const [cropData, setCropData] = useState({
    name: "",
    category: "Grains",
    price: "",
    quantity: "",
    description: "",
    status: "available", // Added status field with default value
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCropData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setCropData((prev) => ({ ...prev, image: e.target.files[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (!cropData.image) {
        setMessage("Please upload an image.");
        setLoading(false);
        return;
      }

      // Prepare form data
      const formData = new FormData();
      formData.append("farmerId", farmerData?._id);
      formData.append("name", cropData.name);
      formData.append("category", cropData.category);
      formData.append("price", cropData.price);
      formData.append("quantity", cropData.quantity);
      formData.append("description", cropData.description);
      formData.append("status", cropData.status); // Added status
      formData.append("image", cropData.image); // Attach the image file

      // Send form data to backend
      const response = await axios.post(`${backendUrl}/api/farmer/crop/add`, formData, {
        headers: {
          token,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        setMessage("Crop listed successfully!");
        setCropData({
          name: "",
          category: "Grains",
          price: "",
          quantity: "",
          description: "",
          status: "available", // Reset status to default
          image: null,
        });
      }
    } catch (error) {
      setMessage("Error posting crop. Please try again.");
      console.error("Error posting crop:", error.response?.data || error.message);
    }

    setLoading(false);
  };

  return (
    <div className={`min-h-screen p-6 flex items-center justify-center ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
    <div className={`w-full max-w-2xl mx-auto p-6 rounded-lg shadow-lg ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
      <h2 className="text-2xl font-bold mb-4 text-center">Sell Your Crop</h2>
      
      {message && <p className="text-center text-green-500 font-medium mb-4">{message}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" 
          name="name" 
          placeholder="Crop Name" 
          value={cropData.name} 
          onChange={handleChange} 
          required 
          className={`w-full p-3 rounded-md border ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-300 text-gray-900"}`} 
        />
  
        <select 
          name="category" 
          value={cropData.category} 
          onChange={handleChange} 
          required 
          className={`w-full p-3 rounded-md border ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-300 text-gray-900"}`}
        >
          <option value="Grains">Grains</option>
          <option value="Fruits">Fruits</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Pulses">Pulses</option>
          <option value="Spices">Spices</option>
          <option value="Other">Other</option>
        </select>
  
        <input 
          type="number" 
          name="quantity" 
          placeholder="Quantity (Kg)" 
          value={cropData.quantity} 
          onChange={handleChange} 
          required 
          min="1" 
          className={`w-full p-3 rounded-md border ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-300 text-gray-900"}`} 
        />
  
        <input 
          type="number" 
          name="price" 
          placeholder="Price per Kg (₹)" 
          value={cropData.price} 
          onChange={handleChange} 
          required 
          min="1" 
          className={`w-full p-3 rounded-md border ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-300 text-gray-900"}`} 
        />
  
        <textarea 
          name="description" 
          placeholder="Crop Description" 
          value={cropData.description} 
          onChange={handleChange} 
          required 
          className={`w-full p-3 rounded-md border ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-300 text-gray-900"}`}
        ></textarea>
  
        {/* Status Dropdown */}
        <select 
          name="status" 
          value={cropData.status} 
          onChange={handleChange} 
          required 
          className={`w-full p-3 rounded-md border ${isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-300 text-gray-900"}`}
        >
          <option value="available">Available</option>
          <option value="pending">Pending</option>
          <option value="sold">Sold</option>
        </select>
  
        {/* File Upload */}
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          required 
          className={`w-full p-3 border rounded-md cursor-pointer ${isDarkMode? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100'}   `}
        />
  
        {/* Submit Button */}
        <button 
          type="submit" 
          className="w-full py-3 text-white rounded-md transition-all duration-200 bg-green-600 hover:bg-green-700 disabled:bg-gray-500" 
          disabled={loading}
        >
          {loading ? "Posting..." : "Post Crop for Sale"}
        </button>
      </form>
    </div>
  </div>
  
  );
};

export default SellCrop;
