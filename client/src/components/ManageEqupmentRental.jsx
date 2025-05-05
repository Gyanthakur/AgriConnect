import { useEffect, useState } from "react";
import { getToken } from "../utils/token.utils";
import { useParams } from "react-router-dom";

export default function ManageMyEquipmentRental() {
  // Get rentalId from URL parameters
  const { rentalId } = useParams();
  const [rental, setRental] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRentalDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/rental/${rentalId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setRental(result.order || null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (rentalId) {
      fetchRentalDetails();
    } else {
      setError("Rental ID not found in URL");
      setLoading(false);
    }
  }, [rentalId]);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "inProgress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-purple-100 text-purple-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusStep = (status) => {
    switch (status) {
      case "pending":
        return 1;
      case "confirmed":
        return 2;
      case "inProgress":
        return 3;
      case "completed":
        return 4;
      case "cancelled":
        return -1;
      default:
        return 0;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

  const formatDateShort = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  const goBack = () => {
    window.location.href = "/dashboard/my-rentals";
  };

  const goToEquipment = () => {
    window.location.href = "/equipment";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[85vh]">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-t-2 border-b-2 border-green-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading rental details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[85vh] p-4">
        <div className="w-full max-w-lg p-6 border border-red-200 rounded-lg bg-red-50">
          <h3 className="text-lg font-medium text-red-800">
            Error Loading Rental
          </h3>
          <p className="mt-2 text-red-700">{error}</p>
          <div className="flex mt-4 space-x-3">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 text-white transition-colors bg-red-600 rounded-md hover:bg-red-700"
            >
              Try Again
            </button>
            <button
              onClick={goBack}
              className="px-4 py-2 text-white transition-colors bg-gray-600 rounded-md hover:bg-gray-700"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!rental) {
    return (
      <div className="flex items-center justify-center min-h-[85vh] p-4">
        <div className="w-full max-w-lg p-6 text-center border border-yellow-200 rounded-lg bg-yellow-50">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-yellow-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h2 className="text-xl font-semibold text-yellow-800">
            Rental Not Found
          </h2>
          <p className="mt-2 text-yellow-700">
            We couldn't find the rental you're looking for.
          </p>
          <div className="flex flex-col justify-center mt-6 space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
            <button
              onClick={goBack}
              className="px-4 py-2 text-white transition-colors bg-yellow-600 rounded-md hover:bg-yellow-700"
            >
              Go Back
            </button>
            <button
              onClick={goToEquipment}
              className="px-4 py-2 text-white transition-colors bg-green-600 rounded-md hover:bg-green-700"
            >
              Browse Equipment
            </button>
          </div>
        </div>
      </div>
    );
  }

  const statusStep = getStatusStep(rental.stage);

  return (
    <div className="min-h-[80vh]">
      <div className="max-w-full mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={goBack}
            className="flex items-center mr-4 text-gray-600 hover:text-gray-900"
          >
            <svg
              className="w-5 h-5 mr-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Rentals
          </button>
          <h1 className="flex-1 text-2xl font-bold text-gray-900">
            Rental Details
          </h1>
        </div>

        <div className="mb-6 overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col justify-between md:flex-row">
              <div>
                <div className="flex items-center">
                  <h2 className="text-lg font-medium text-gray-900">
                    Rental #
                    {rental._id.substring(rental._id.length - 6).toUpperCase()}
                  </h2>
                  <span
                    className={`ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      rental.stage
                    )} capitalize`}
                  >
                    {rental.stage}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Booked on {formatDate(rental.createdAt)}
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="p-4 bg-gray-100 rounded-md">
                  <h3 className="font-medium text-gray-900">Payment</h3>
                  <div className="flex items-center mt-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        rental.paymentStatus === "success"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      } capitalize`}
                    >
                      {rental.paymentStatus}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">
                      ID: {rental.paymentId}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {statusStep !== -1 && (
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-sm font-medium text-gray-500">
                Rental Status
              </h3>
              <div className="mt-3">
                <div className="relative">
                  <div className="flex h-2 mb-4 overflow-hidden text-xs bg-gray-200 rounded">
                    <div
                      className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                        statusStep >= 1 ? "bg-green-500" : "bg-gray-300"
                      }`}
                      style={{ width: `${Math.min(100, statusStep * 25)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-center">
                      <div
                        className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${
                          statusStep >= 1
                            ? "bg-green-500 text-white"
                            : "bg-gray-300 text-gray-600"
                        }`}
                      >
                        <svg
                          className="w-4 h-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">Pending</p>
                    </div>
                    <div className="text-center">
                      <div
                        className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${
                          statusStep >= 2
                            ? "bg-green-500 text-white"
                            : "bg-gray-300 text-gray-600"
                        }`}
                      >
                        <svg
                          className="w-4 h-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">Confirmed</p>
                    </div>
                    <div className="text-center">
                      <div
                        className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${
                          statusStep >= 3
                            ? "bg-green-500 text-white"
                            : "bg-gray-300 text-gray-600"
                        }`}
                      >
                        <svg
                          className="w-4 h-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">In Progress</p>
                    </div>
                    <div className="text-center">
                      <div
                        className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${
                          statusStep >= 4
                            ? "bg-green-500 text-white"
                            : "bg-gray-300 text-gray-600"
                        }`}
                      >
                        <svg
                          className="w-4 h-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">Completed</p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-500">
                <span className="font-medium">Rental Period:</span>{" "}
                {formatDateShort(rental.rentalStart)} to{" "}
                {formatDateShort(rental.rentalEnd)} ({rental.totalDays} days)
              </p>
            </div>
          )}

          <div className="p-6">
            <h3 className="mb-4 text-base font-medium text-gray-900">
              Rental Summary
            </h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-gray-50">
                <h4 className="mb-3 text-sm font-medium text-gray-500">
                  Equipment Details
                </h4>
                <div className="py-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-24 h-24 overflow-hidden bg-gray-100 rounded-md">
                      {rental.equipment.images &&
                      rental.equipment.images.length > 0 ? (
                        <img
                          src={rental.equipment.images[0]}
                          alt={rental.equipment.name}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full text-gray-400">
                          <svg
                            className="w-8 h-8"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 ml-4">
                      <div className="flex justify-between">
                        <div>
                          <h5 className="text-lg font-medium text-gray-900">
                            {rental.equipment.name}
                          </h5>
                          <p className="mt-1 text-sm text-gray-500">
                            Category: {rental.equipment.category}
                          </p>
                          <div className="mt-2 space-y-1">
                            <p className="text-sm text-gray-700">
                              <span className="font-medium">
                                Rental Period:
                              </span>{" "}
                              {formatDateShort(rental.rentalStart)} to{" "}
                              {formatDateShort(rental.rentalEnd)}
                            </p>
                            <p className="text-sm text-gray-700">
                              <span className="font-medium">Duration:</span>{" "}
                              {rental.totalDays} days
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            ₹{rental.equipment.pricePerDay}/day
                          </p>
                          <p className="mt-1 text-sm text-gray-700">
                            Total: ₹{rental.totalPrice}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="p-4 rounded-lg bg-gray-50">
                  <h4 className="mb-3 text-sm font-medium text-gray-500">
                    Delivery Address
                  </h4>
                  <div className="text-sm text-gray-700">
                    <p className="font-medium">
                      {rental.renter?.firstName} {rental.renter?.lastName}
                    </p>
                    <p>{rental.deliveryAddress.line}</p>
                    <p>{rental.deliveryAddress.city}</p>
                    <p>
                      {rental.deliveryAddress.state},{" "}
                      {rental.deliveryAddress.zip}
                    </p>
                    <p>{rental.deliveryAddress.country}</p>
                    {rental.renter?.phone && (
                      <p className="mt-2">
                        <span className="font-medium">Phone:</span>{" "}
                        {rental.renter.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-gray-50">
                  <h4 className="mb-3 text-sm font-medium text-gray-500">
                    Price Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <p className="text-gray-600">Daily Rate</p>
                      <p className="text-gray-900">
                        ₹{rental.equipment.pricePerDay}/day
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-600">Duration</p>
                      <p className="text-gray-900">{rental.totalDays} days</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-600">Equipment Fee</p>
                      <p className="text-gray-900">₹{rental.totalPrice}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-600">Delivery Fee</p>
                      <p className="text-gray-900">₹0</p>
                    </div>
                    {rental.notes && (
                      <div className="pt-2 mt-2 border-t border-gray-200">
                        <p className="font-medium text-gray-600">
                          Rental Notes:
                        </p>
                        <p className="mt-1 text-gray-700">{rental.notes}</p>
                      </div>
                    )}
                    <div className="flex justify-between pt-2 mt-2 font-medium border-t border-gray-200">
                      <p className="text-gray-900">Grand Total</p>
                      <p className="text-gray-900">₹{rental.totalPrice}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
            <button
              onClick={goBack}
              className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              <svg
                className="w-4 h-4 mr-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back to All Rentals
            </button>
            <button
              onClick={goToEquipment}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Browse More Equipment
            </button>
          </div>
        </div>

        {statusStep !== -1 && rental.owner && (
          <div className="overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-6">
              <h3 className="mb-4 text-base font-medium text-gray-900">
                Owner Information
              </h3>
              <div className="flex items-center">
                <div className="flex-shrink-0 w-10 h-10 overflow-hidden bg-gray-200 rounded-full">
                  {rental.owner.image ? (
                    <img
                      src={rental.owner.image}
                      alt={`${rental.owner.firstName} ${rental.owner.lastName}`}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <svg
                      className="w-full h-full text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  )}
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-gray-900">
                    {rental.owner.firstName} {rental.owner.lastName}
                  </h4>
                  <p className="text-sm text-gray-500">{rental.owner.email}</p>
                </div>
                {rental.owner.phone && (
                  <a
                    href={`tel:${rental.owner.phone}`}
                    className="inline-flex items-center px-3 py-1 ml-auto text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <svg
                      className="w-4 h-4 mr-1 text-gray-500"
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
                    Contact Owner
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
