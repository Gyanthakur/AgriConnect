import React, { useEffect, useState } from "react";
import { marketPrices } from "../assets/assets";

const MarketPrice = () => {
  const [prices, setPrices] = useState([]);
  const [filteredPrices, setFilteredPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedState, setSelectedState] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const statesList = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Delhi",
    "Lakshadweep",
    "Puducherry",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Jammu and Kashmir",
    "Ladakh",
  ];

  const handleStateChange = (e) => {
    e.preventDefault();
    const state = e.target.value;
    setSelectedState(state);
    filterPrices(state, searchTerm);
  };

  const handleSearchChange = (e) => {
    e.preventDefault();
    const term = e.target.value;
    setSearchTerm(term);
    filterPrices(selectedState, term);
  };

  const filterPrices = (state, search) => {
    let filtered = marketPrices;

    if (state) {
      filtered = filtered.filter((price) => price.region === state);
    }

    if (search) {
      filtered = filtered.filter(
        (price) =>
          price.name.toLowerCase().includes(search.toLowerCase()) ||
          price.price.toLowerCase().includes(search.toLowerCase()) ||
          price.region.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredPrices(filtered);
  };

  useEffect(() => {
    setPrices(marketPrices);
    setFilteredPrices(marketPrices);
    setLoading(false);
  }, []);

  return (
    <div className={`min-h-screen px-6 py-10 `}>
      <div className="mx-auto max-w-7xl">
        <h1
          className={`text-4xl font-extrabold text-center mb-4 
        text-green-600 dark:text-green-400
          `}
        >
          Live Market Prices
        </h1>
        <p
          className={`text-center mb-8 text-lg dark:text-gray-300 text-zinc-800 `}
        >
          Stay updated with the latest agricultural market prices in your
          region.
        </p>

        <div className="flex flex-col gap-4 mb-10 md:flex-row md:gap-8">
          <div className="flex-1">
            <label
              htmlFor="search"
              className={`block mb-2 font-medium dark:text-zinc-300 text-zinc-800 `}
            >
              Search:
            </label>
            <input
              id="search"
              type="text"
              className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-all
              dark:bg-zinc-800 dark:border-gray-600 dark:text-white dark:focus:ring-green-400
                    bg-white border-gray-300 focus:ring-green-500
                `}
              placeholder="Search by crop, price, or region"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="state-select"
              className={`block mb-2 font-medium 
             dark:text-gray-200  text-gray-800
              `}
            >
              Filter by State:
            </label>
            <select
              id="state-select"
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all
               dark:bg-zinc-800 dark:border-gray-600 dark:text-white dark:focus:ring-green-400
                    bg-white border-gray-300 focus:ring-green-500
                `}
              value={selectedState}
              onChange={handleStateChange}
            >
              <option value="">All States</option>
              {statesList.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <p
            className={`text-center text-lg  dark:text-gray-300 text-gray-600
            `}
          >
            Loading prices...
          </p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPrices.length > 0 ? (
              filteredPrices.map((price, index) => (
                <div
                  key={index}
                  className={`border rounded-lg dark:border-zinc-700 transition-transform transform hover:-translate-y-1 duration-300
                  dark:bg-zinc-800 dark:hover:shadow-green-500/20
                     bg-white hover:shadow-green-400/30
                  `}
                >
                  <div className="p-6">
                    <h2
                      className={`text-xl font-semibold mb-2 dark:text-green-400 text-green-700
                      }`}
                    >
                      {price.name}
                    </h2>
                    <p
                      className={`dark:text-gray-200 text-gray-700
                      `}
                    >
                      Price: <span className="font-medium">{price.price}</span>
                    </p>
                    <p
                      className={`mt-1 text-sm dark:text-gray-400 text-gray-500
                      `}
                    >
                      Region: {price.region}
                    </p>
                    <p
                      className={`mt-1 text-sm dark:text-gray-400 text-gray-500
                      `}
                    >
                      Last Updated: {new Date(price.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                No prices available for the selected state or search term.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketPrice;
