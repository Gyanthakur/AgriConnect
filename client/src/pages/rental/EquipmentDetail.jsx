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
  const [rentalStart, setRentalStart] = useState("");
  const [rentalEnd, setRentalEnd] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [orderLoading, setOrderLoading] = useState(false);

  // Calculate default dates (today and tomorrow)
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    // Format dates as YYYY-MM-DD for input fields
    const formatDateForInput = (date) => {
      return date.toISOString().split("T")[0];
    };

    setRentalStart(formatDateForInput(today));
    setRentalEnd(formatDateForInput(tomorrow));
  }, []);

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

  const initiateRental = async () => {
    if (!getToken()) {
      navigate(`/login?redirect=/equipment/${equipmentId}`, {
        state: { from: `/equipment/${equipmentId}` },
      });
      return;
    }

    // Check if equipment is available
    if (equipment.status !== "available") {
      toast.error("This equipment is currently unavailable for rental");
      return;
    }

    // Validate dates
    const startDate = new Date(rentalStart);
    const endDate = new Date(rentalEnd);
    if (isNaN(startDate) || isNaN(endDate) || endDate <= startDate) {
      toast.error("Please select valid rental dates");
      return;
    }

    setOrderLoading(true);
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/rental/initiate",
        {
          equipmentId: equipmentId,
          rentalStart: rentalStart,
          rentalEnd: rentalEnd,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      if (response.data.order) {
        navigate(`/rental/order/${response.data.order._id}`);
      } else {
        toast.error(response.data?.message || "Failed to initiate rental");
      }
    } catch (err) {
      console.error("Error initiating rental:", err);
      toast.error(err.response?.data?.message || "Error initiating rental");
    } finally {
      setOrderLoading(false);
    }
  };

  // Calculate the total days and price when rental dates change
  const calculateTotalDays = () => {
    const startDate = new Date(rentalStart);
    const endDate = new Date(rentalEnd);
    if (isNaN(startDate) || isNaN(endDate) || endDate <= startDate) {
      return 0;
    }

    const msInDay = 1000 * 60 * 60 * 24;
    return Math.ceil((endDate - startDate) / msInDay);
  };

  const calculateTotalPrice = () => {
    if (!equipment) return 0;
    const totalDays = calculateTotalDays();
    return equipment.pricePerDay * totalDays;
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Minimum date for the date picker (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  // Minimum end date based on selected start date
  const getMinEndDate = () => {
    if (!rentalStart) return getMinDate();

    const startDate = new Date(rentalStart);
    const nextDay = new Date(startDate);
    nextDay.setDate(startDate.getDate() + 1);
    return nextDay.toISOString().split("T")[0];
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

                  {/* Date selector */}
                  <div className="mb-6">
                    <h3 className="mb-2 text-lg font-semibold">
                      Rental Period
                    </h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="rentalStart"
                          className="block mb-2 text-sm font-medium text-gray-700"
                        >
                          Start Date
                        </label>
                        <input
                          type="date"
                          id="rentalStart"
                          name="rentalStart"
                          value={rentalStart}
                          min={getMinDate()}
                          onChange={(e) => setRentalStart(e.target.value)}
                          className="block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="rentalEnd"
                          className="block mb-2 text-sm font-medium text-gray-700"
                        >
                          End Date
                        </label>
                        <input
                          type="date"
                          id="rentalEnd"
                          name="rentalEnd"
                          value={rentalEnd}
                          min={getMinEndDate()}
                          onChange={(e) => setRentalEnd(e.target.value)}
                          className="block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>

                    {/* Show calculated rental information */}
                    <div className="p-3 mt-4 border border-blue-100 rounded-md bg-blue-50">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Duration:</span>
                        <span className="font-medium">
                          {calculateTotalDays()} day
                          {calculateTotalDays() !== 1 ? "s" : ""}
                        </span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-gray-700">Rate:</span>
                        <span className="font-medium">
                          ₹{equipment.pricePerDay}/day
                        </span>
                      </div>
                      <div className="flex justify-between pt-2 mt-2 border-t border-blue-200">
                        <span className="font-semibold text-gray-800">
                          Total:
                        </span>
                        <span className="font-semibold text-blue-700">
                          ₹{calculateTotalPrice()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    {!equipment.isUserEquipment ? (
                      <button
                        type="button"
                        className="flex-1 px-4 py-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Edit Equipment
                      </button>
                    ) : (
                      <button
                        disabled={
                          equipment.status !== "available" || orderLoading
                        }
                        onClick={initiateRental}
                        type="button"
                        className={`flex-1 px-4 py-3 font-semibold text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                          equipment.status === "available" && !orderLoading
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                      >
                        {orderLoading
                          ? "Processing..."
                          : equipment.status === "available"
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
