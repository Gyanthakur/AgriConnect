import React, { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../utils/token.utils";

const EquipmentsListing = () => {
  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [category, setCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const categories = ["all", "Tractor", "Harvester", "Sprayer", "Plough"];

  useEffect(() => {
    const fetchEquipments = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/api/equipment/all-equipments",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: getToken() ? `Bearer ${getToken()}` : null,
            },
          }
        );
        if (response.data.success) {
          setEquipments(response.data.data.equipments);
          setTotalPages(response.data.data.totalPages);
        } else {
          setError("Failed to fetch equipment data");
        }
      } catch (err) {
        setError("Error connecting to server");
        console.error("Error fetching equipment:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipments();
  }, [currentPage]);

  const filteredEquipments = equipments.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = category === "all" || item.category === category;
    return matchSearch && matchCategory;
  });

  const sortedEquipments = [...filteredEquipments].sort((a, b) => {
    switch (sortOption) {
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "oldest":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "price-low":
        return a.pricePerDay - b.pricePerDay;
      case "price-high":
        return b.pricePerDay - a.pricePerDay;
      default:
        return 0;
    }
  });
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

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) setCurrentPage(page);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSortOption("newest");
    setCategory("all");
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Browse Farm Equipment
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Rent equipment directly from trusted providers
          </p>
        </div>

        {/* Filters */}
        <div className="mb-4">
          <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center md:space-y-0">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search equipment..."
              className="w-full md:w-1/3 py-1.5 pl-4 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />

            <div className="flex flex-wrap items-center gap-2 text-sm">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-2 py-1 text-gray-700 border border-gray-200 rounded"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>

              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="px-2 py-1 text-gray-700 border border-gray-200 rounded"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="price-low">Price ↑</option>
                <option value="price-high">Price ↓</option>
              </select>

              <button
                onClick={resetFilters}
                className="text-xs text-green-600 hover:text-green-800"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Main */}
        {loading ? (
          <SkeletonLoader />
        ) : error ? (
          <ErrorDisplay />
        ) : sortedEquipments.length > 0 ? (
          <>
            <p className="mb-4 text-sm text-gray-500">
              Showing {sortedEquipments.length} result
              {sortedEquipments.length > 1 && "s"}
            </p>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {sortedEquipments.map((equipment) => (
                <div
                  key={equipment._id}
                  className={`bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg ${
                    equipment.isUserEquipment
                      ? "border-2 border-yellow-300"
                      : ""
                  }`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={equipment.images[0]}
                      alt={equipment.name}
                      className="object-cover w-full h-full"
                    />
                    {/* Badges */}
                    <div className="absolute flex flex-col gap-1 top-2 left-2">
                      {equipment.safetyCheckPassed && (
                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                          Safety Checked
                        </span>
                      )}
                      {equipment.isUserEquipment && (
                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-yellow-800 bg-yellow-100 rounded-full">
                          Your Equipment
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {equipment.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {equipment.category}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">
                          ₹{equipment.pricePerDay}
                        </p>
                        <p className="text-sm text-gray-500">per day</p>
                      </div>
                    </div>

                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                      {equipment.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mt-3">
                      {equipment.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-block bg-gray-100 rounded-full px-2 py-0.5 text-xs font-medium text-gray-800"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between mt-3 text-xs text-gray-500">
                      <span>
                        Available: {formatDate(equipment.availableFrom)} -{" "}
                        {formatDate(equipment.availableTo)}
                      </span>
                      <span>{equipment.status}</span>
                    </div>

                    <div className="w-full mt-4">
                      <button
                        onClick={() =>
                          (window.location.href = `/rental/${equipment._id}`)
                        }
                        className={`w-full py-2 px-4 rounded-lg font-medium ${
                          equipment.isUserEquipment
                            ? "bg-gray-200 text-gray-500"
                            : "bg-green-600 text-white hover:bg-green-700 transition-colors"
                        }`}
                      >
                        {equipment.isUserEquipment
                          ? "Your Equipment"
                          : "View Equipment"}
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
                    className="h-10 px-4 border border-gray-300 rounded-l disabled:opacity-50"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`h-10 w-10 border text-sm ${
                          currentPage === page
                            ? "bg-green-600 text-white"
                            : "border-gray-300 text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="h-10 px-4 border border-gray-300 rounded-r disabled:opacity-50"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        ) : (
          <div className="py-10 text-center">
            <h3 className="text-lg font-medium text-gray-900">
              No equipment found
            </h3>
            <p className="text-gray-500">Try adjusting your filters.</p>
            <div className="mt-4">
              <button
                onClick={resetFilters}
                className="px-4 py-2 text-sm text-white bg-green-600 rounded hover:bg-green-700"
              >
                Clear filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EquipmentsListing;
