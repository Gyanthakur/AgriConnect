import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { getToken } from "../../utils/token.utils";

const EquipmentDetail = () => {
  const { equipmentId } = useParams();
  const navigate = useNavigate();
  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rentalDays, setRentalDays] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchEquipment = async () => {
      if (!equipmentId) return;
      setLoading(true);
      try {
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL +
            `/api/equipment/get-equipment/${equipmentId}`,
          {
            headers: {
              Authorization: getToken() ? `Bearer ${getToken()}` : null,
            },
          }
        );
        if (response.data.success) {
          setEquipment(response.data.data);
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

    fetchEquipment();
  }, [equipmentId]);

  const handleRentalDaysChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= 30) {
      setRentalDays(value);
    }
  };

  const incrementRentalDays = () => {
    if (rentalDays < 30) {
      setRentalDays(rentalDays + 1);
    }
  };

  const decrementRentalDays = () => {
    if (rentalDays > 1) {
      setRentalDays(rentalDays - 1);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Skeleton loader component
  const EquipmentSkeleton = () => (
    <div className="p-6 bg-white rounded-lg shadow-md animate-pulse">
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="w-full md:w-1/2">
          <div className="mb-4 bg-gray-300 rounded-lg h-96"></div>
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="h-20 bg-gray-300 rounded-lg"></div>
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <div className="w-3/4 h-8 mb-4 bg-gray-300 rounded"></div>
          <div className="w-1/4 h-6 mb-6 bg-gray-300 rounded"></div>
          <div className="w-1/2 h-6 mb-4 bg-gray-300 rounded"></div>
          <div className="w-full h-24 mb-6 bg-gray-300 rounded"></div>
          <div className="w-full h-10 mb-4 bg-gray-300 rounded"></div>
          <div className="w-full h-12 mb-6 bg-gray-300 rounded"></div>
          <div className="w-full h-12 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );

  // Error display component
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
            Unable to load equipment
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <p>{error}</p>
          </div>
          <div className="mt-4">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mr-4 text-sm font-medium text-red-600 hover:text-red-500"
            >
              Try again
            </button>
            <button
              type="button"
              onClick={() => navigate("/equipment")}
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Return to listings
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="mx-auto sm:px-4 max-w-7xl lg:px-8">
        {/* Breadcrumb */}
        <nav className="px-6 mb-6">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <button
                onClick={() => navigate("/")}
                className="text-gray-500 hover:text-gray-700"
              >
                Home
              </button>
            </li>
            <li className="text-gray-500">/</li>
            <li>
              <button
                onClick={() => navigate("/rental")}
                className="text-gray-500 hover:text-gray-700"
              >
                Rental
              </button>
            </li>
            <li className="text-gray-500">/</li>
            <li className="font-medium text-gray-900">
              {loading ? "Loading..." : error ? "Error" : equipment?.name}
            </li>
          </ol>
        </nav>

        {/* Main Content */}
        {loading ? (
          <EquipmentSkeleton />
        ) : error ? (
          <ErrorDisplay />
        ) : (
          equipment && (
            <div className="p-6 bg-white">
              <div className="flex flex-col gap-8 md:flex-row">
                {/* Equipment Images */}
                <div className="w-full md:w-1/2">
                  <div className="mb-4 overflow-hidden rounded-lg">
                    <img
                      src={equipment.images[selectedImage]}
                      alt={equipment.name}
                      className="object-cover w-full transition-transform duration-300 rounded-lg h-96 hover:scale-105"
                    />
                  </div>

                  {equipment.images.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {equipment.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`overflow-hidden rounded-lg border-2 ${
                            selectedImage === index
                              ? "border-blue-500"
                              : "border-transparent"
                          }`}
                        >
                          <img
                            src={image}
                            alt={`${equipment.name} thumbnail ${index + 1}`}
                            className="object-cover w-full h-20"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Equipment Details */}
                <div className="w-full md:w-1/2">
                  <div className="mb-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                          {equipment.name}
                        </h1>
                        <p className="mt-1 text-lg text-gray-600">
                          {equipment.category}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">
                          ₹{equipment.pricePerDay}
                        </div>
                        <p className="text-sm text-gray-500">per day</p>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${
                        equipment.status === "available"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      <svg
                        className="w-4 h-4 mr-1"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={
                            equipment.status === "available"
                              ? "M5 13l4 4L19 7"
                              : "M6 18L18 6M6 6l12 12"
                          }
                        />
                      </svg>
                      {equipment.status === "available"
                        ? "Available"
                        : "Unavailable"}
                    </span>

                    {equipment.safetyCheckPassed && (
                      <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
                        <svg
                          className="w-4 h-4 mr-1"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                        Safety Verified
                      </span>
                    )}

                    <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-gray-800 bg-gray-100 rounded-full">
                      <svg
                        className="w-4 h-4 mr-1"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Listed: {formatDate(equipment.createdAt)}
                    </span>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <h3 className="mb-2 text-lg font-semibold">Description</h3>
                    <p className="text-gray-700">{equipment.description}</p>
                  </div>

                  {/* Tags */}
                  {equipment.tags && equipment.tags.length > 0 && (
                    <div className="mb-6">
                      <h3 className="mb-2 text-lg font-semibold">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {equipment.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-block px-3 py-1 text-sm font-medium text-gray-800 bg-gray-100 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Rental statistics */}
                  <div className="p-4 mb-6 rounded-lg bg-gray-50">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Bookings</p>
                        <p className="text-xl font-semibold text-gray-800">
                          {equipment.bookingsCount || 0}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Views</p>
                        <p className="text-xl font-semibold text-gray-800">
                          {equipment.views || 0}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Rating</p>
                        <p className="text-xl font-semibold text-gray-800">
                          {equipment.rating || 0}/5
                          <span className="text-sm text-gray-500">
                            {" "}
                            ({equipment.numReviews || 0} reviews)
                          </span>
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Status</p>
                        <p className="text-xl font-semibold text-gray-800">
                          {equipment.status.charAt(0).toUpperCase() +
                            equipment.status.slice(1)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Owner details */}
                  <div className="p-4 mb-6 rounded-lg bg-gray-50">
                    <div className="flex items-center">
                      {equipment.user.image ? (
                        <img
                          src={equipment.user.image}
                          alt={`${equipment.user.firstName} ${equipment.user.lastName}`}
                          className="object-cover w-12 h-12 mr-4 rounded-full"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-12 h-12 mr-4 bg-gray-200 rounded-full">
                          <span className="text-lg font-medium text-gray-500">
                            {equipment.user.firstName.charAt(0)}
                            {equipment.user.lastName.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="font-medium">
                          {equipment.user.firstName} {equipment.user.lastName}
                          {equipment.user.verified && (
                            <span className="ml-1 text-blue-600">
                              <svg
                                className="inline w-4 h-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                          )}
                        </p>
                        <p className="text-sm text-gray-500">Equipment Owner</p>
                      </div>
                      <a
                        href={`tel:${equipment.contactNumber}`}
                        className="px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200"
                      >
                        <svg
                          className="inline w-4 h-4 mr-1"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        Call
                      </a>
                    </div>
                  </div>

                  {/* Rental days selector */}
                  <div className="mb-6">
                    <label
                      htmlFor="rentalDays"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Rental Duration (Days)
                    </label>
                    <div className="flex">
                      <button
                        type="button"
                        onClick={decrementRentalDays}
                        className="px-3 py-2 text-gray-500 border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100"
                      >
                        <svg
                          className="w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <input
                        type="number"
                        id="rentalDays"
                        name="rentalDays"
                        min="1"
                        max="30"
                        value={rentalDays}
                        onChange={handleRentalDaysChange}
                        className="flex-1 p-2 text-center border-gray-300 border-y focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={incrementRentalDays}
                        className="px-3 py-2 text-gray-500 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100"
                      >
                        <svg
                          className="w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Total:{" "}
                      <span className="font-semibold">
                        ₹{equipment.pricePerDay * rentalDays}
                      </span>{" "}
                      for {rentalDays} day{rentalDays > 1 ? "s" : ""}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    {equipment.isUserEquipment ? (
                      <button
                        type="button"
                        className="flex-1 px-4 py-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Edit Equipment
                      </button>
                    ) : (
                      <button
                        disabled={equipment.status !== "available"}
                        type="button"
                        className={`flex-1 px-4 py-3 font-semibold text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                          equipment.status === "available"
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                      >
                        {equipment.status === "available"
                          ? "Book Now"
                          : "Currently Unavailable"}
                      </button>
                    )}

                    <button
                      type="button"
                      className="flex-1 px-4 py-3 font-semibold text-blue-600 bg-white border border-blue-600 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Contact Owner
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default EquipmentDetail;
