import React, { useEffect, useState } from 'react';
import { marketPrices } from '../assets/assets';

const MarketPrice = ({isDarkMode}) => {
  const [prices, setPrices] = useState([]);
  const [filteredPrices, setFilteredPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedState, setSelectedState] = useState("");  // State for selected state filter
  const [searchTerm, setSearchTerm] = useState(""); // State for search term input

  // List of all states for the search box
  const statesList = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", 
    "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", 
    "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", 
    "Delhi", "Lakshadweep", "Puducherry", "Andaman and Nicobar Islands", "Chandigarh", 
    "Dadra and Nagar Haveli and Daman and Diu", "Jammu and Kashmir", "Ladakh"
  ];
  

  // Handle changes in the state selection
  const handleStateChange = (e) => {
    e.preventDefault()
    const state = e.target.value;
    setSelectedState(state);
    filterPrices(state, searchTerm);
  };

  // Handle changes in the search term
  const handleSearchChange = (e) => {
    e.preventDefault()
    const term = e.target.value;
    setSearchTerm(term);
    filterPrices(selectedState, term);
  };

  // Function to filter prices based on state and search term
  const filterPrices = (state, search) => {
    let filtered = marketPrices;

    if (state) {
      filtered = filtered.filter(price => price.region === state);
    }

    if (search) {
      filtered = filtered.filter(price => 
        price.name.toLowerCase().includes(search.toLowerCase()) ||
        price.price.toLowerCase().includes(search.toLowerCase()) || // Add more fields if needed
        price.region.toLowerCase().includes(search.toLowerCase()) // Add more fields if needed
        
      );
    }

    setFilteredPrices(filtered);
  };

  useEffect(() => {
    // If you're in testing mode, use the local simulated data
    setPrices(marketPrices);  // Use the mock data for now
    setFilteredPrices(marketPrices);  // Set initial filtered data
    setLoading(false);
  }, []);

  return (
    <div className={`p-8 bg-gray-100 ${isDarkMode ? 'bg-gray-900' :'bg-gray-100'} min-h-screen`}>
      <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-400' : 'text-green-700'} text-center mb-6`}>Live Market Prices</h1>
      <p className={`text-center ${isDarkMode ? 'text-gray-100' : 'text-gray-700'}  mb-6`}>Stay updated with the latest agricultural market prices in your region.</p>

      {/* Flex container for search input and state dropdown */}
      <div className="flex justify-between mb-6">
        {/* Search box for entering search term */}
        <div className="flex-2 mr-4">
          <label htmlFor="search" className={`mr-4 font-medium ${isDarkMode ? 'text-white' : ''}`}>Search:</label>
          <input
            id="search"
            type="text"
            className={`p-2 border rounded w-full ${isDarkMode ? 'bg-gray-700 border-white text-white' :''}`}
            placeholder="Search by crop or price or region"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {/* Search box for selecting a state */}
        <div className="flex-2 ml-4">
          <label htmlFor="state-select" className={`mr-4 font-medium ${isDarkMode ? 'text-white' : ''}`}>Filter by State:</label>
          <select
            id="state-select"
            className={`p-2 border rounded w-full ${isDarkMode ? 'bg-gray-700 border-white text-white' :''}`}
            value={selectedState}
            onChange={handleStateChange}
          >
            <option value="">All States</option>
            {statesList.map((state, index) => (
              <option key={index} value={state}>{state}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <p className={`text-center ${isDarkMode ? 'text-gray-100' : 'text-gray-500'}`}>Loading prices...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrices.length > 0 ? (
            filteredPrices.map((price, index) => (
              <div key={index} className={`border rounded-lg overflow-hidden shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="p-4">
                  <h2 className={`text-xl font-bold ${isDarkMode ? 'text-green-500' : 'text-green-700'}`}>{price.name}</h2>
                  <p className={`${isDarkMode ? 'text-gray-100' : 'text-gray-700'} mt-2`}>Price: {price.price}</p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}  mt-2`}>Region: {price.region}</p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}  mt-2`}>Last Updated: {new Date(price.timestamp).toLocaleString()}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No prices available for the selected state or search term.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MarketPrice;
