import React, { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../../utils/token.utils";

const CropsListing = () => {
  // State management
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [organicOnly, setOrganicOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const categories = ["all", "Grains", "Vegetables", "Fruits", "Legumes"];

  useEffect(() => {
    const fetchCrops = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/api/crop/all-crops",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: getToken() ? `Bearer ${getToken()}` : null,
            },
          }
        );
        if (response.data.success) {
          setCrops(response.data.data.crops);
          setTotalPages(response.data.data.totalPages);
        } else {
          setError("Failed to fetch crops data");
        }
      } catch (err) {
        setError("Error connecting to server");
        console.error("Error fetching crops:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCrops();
  }, [currentPage]);

  const filteredCrops = crops.filter((crop) => {
    const matchesSearch =
      crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || crop.category === selectedCategory;
    const matchesOrganic = !organicOnly || crop.isOrganic;
    return matchesSearch && matchesCategory && matchesOrganic;
  });

  const sortedCrops = [...filteredCrops].sort((a, b) => {
    switch (sortOption) {
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "oldest":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      // window.scrollTo(0, 0);
    }
  };

  const resetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setSortOption("newest");
    setOrganicOnly(false);
  };

  const SkeletonLoader = () => (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className="overflow-hidden bg-white rounded-lg shadow-md animate-pulse"
        >
          <div className="h-48 bg-gray-300"></div>
          <div className="p-4">
            <div className="w-3/4 h-6 mb-2 bg-gray-300 rounded"></div>
            <div className="w-1/2 h-4 mb-3 bg-gray-300 rounded"></div>
            <div className="w-full h-4 mb-3 bg-gray-300 rounded"></div>
            <div className="w-full h-10 mt-4 bg-gray-300 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );

  // Error component
  const ErrorDisplay = () => (
    <div className="p-4 my-8 border-l-4 border-red-500 bg-red-50">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            className="w-5 h-5 text-red-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm-1-5a1 1 0 112 0v4a1 1 0 11-2 0v-4zm1-7a1 1 0 100 2 1 1 0 000-2z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            Unable to load crops
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <p>{error}</p>
          </div>
          <div className="mt-4">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="text-sm font-medium text-red-600 hover:text-red-500"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Browse Fresh Farm Produce
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Directly from farmers to your doorstep
          </p>
        </div>
        <div className="mb-4">
          <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center md:space-y-0">
            <div className="relative w-full md:w-1/3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search crops..."
                className="w-full py-1.5 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-sm">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-2 py-1 text-gray-700 border border-gray-200 rounded focus:outline-none focus:border-green-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>

              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="px-2 py-1 text-gray-700 border border-gray-200 rounded focus:outline-none focus:border-green-500"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="price-low">Price ↑</option>
                <option value="price-high">Price ↓</option>
              </select>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={organicOnly}
                  onChange={() => setOrganicOnly(!organicOnly)}
                  className="w-3 h-3 text-green-500 border-gray-300 rounded focus:ring-0 focus:ring-offset-0"
                />
                <span className="ml-1 text-gray-700">Organic</span>
              </label>

              <button
                onClick={resetFilters}
                className="text-xs text-green-600 hover:text-green-800"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mb-8">
          {loading ? (
            <SkeletonLoader />
          ) : error ? (
            <ErrorDisplay />
          ) : sortedCrops.length > 0 ? (
            <>
              {/* Results count */}
              <p className="mb-4 text-sm text-gray-500">
                Showing {sortedCrops.length}{" "}
                {sortedCrops.length === 1 ? "result" : "results"}
              </p>

              {/* Crop Cards */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {sortedCrops.map((crop) => (
                  <div
                    key={crop._id}
                    className={`bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg ${
                      crop.isUserCrop ? "border-2 border-yellow-300" : ""
                    }`}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={crop.images[0]}
                        alt={crop.name}
                        className="object-cover w-full h-full"
                      />
                      {/* Badges */}
                      <div className="absolute flex flex-col gap-1 top-2 left-2">
                        {crop.isOrganic && (
                          <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                            Organic
                          </span>
                        )}
                        {crop.isUserCrop && (
                          <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-yellow-800 bg-yellow-100 rounded-full">
                            Your Crop
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {crop.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {crop.category}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-600">
                            ₹{crop.price}
                          </p>
                          <p className="text-sm text-gray-500">
                            per {crop.unit}
                          </p>
                        </div>
                      </div>

                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                        {crop.description}
                      </p>

                      <div className="flex flex-wrap gap-1 mt-3">
                        {crop.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-block bg-gray-100 rounded-full px-2 py-0.5 text-xs font-medium text-gray-800"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex justify-between mt-3 text-xs text-gray-500">
                        <span>Harvest: {formatDate(crop.harvestDate)}</span>
                        <span>
                          {crop.quantity} {crop.unit} available
                        </span>
                      </div>

                      <div className="w-full mt-4">
                        <button
                          onClick={() =>
                            (window.location.href = `/shop/${crop._id}`)
                          }
                          className={`w-full py-2 px-4 rounded-lg font-medium ${
                            crop.isUserCrop
                              ? "bg-gray-200 text-gray-500"
                              : "bg-green-600 text-white hover:bg-green-700 transition-colors"
                          }`}
                        >
                          {crop.isUserCrop ? "Your Product" : "View Product"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <nav className="flex items-center">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="flex items-center justify-center h-10 px-5 mr-1 border border-gray-300 rounded-l-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`h-10 w-10 flex items-center justify-center ${
                            currentPage === page
                              ? "bg-green-600 text-white"
                              : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="flex items-center justify-center h-10 px-5 ml-1 border border-gray-300 rounded-r-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </>
          ) : (
            <div className="py-12 text-center">
              <svg
                className="w-12 h-12 mx-auto text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No crops found
              </h3>
              <p className="mt-1 text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Clear filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropsListing;
