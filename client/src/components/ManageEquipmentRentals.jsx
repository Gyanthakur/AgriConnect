import { useEffect, useState } from "react";
import { getToken } from "../utils/token.utils";

export default function ManageEquipmentsRentals() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/rental/owner`,
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
        setRentals(result?.rentals || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const viewRentalDetails = (rentalId) => {
    window.location.href = `/dashboard/equipments/rental/manage/${rentalId}`;
  };

  const getRentalStatusBadge = (stage) => {
    const statusStyles = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-green-100 text-green-800",
      inProgress: "bg-blue-100 text-blue-800",
      completed: "bg-purple-100 text-purple-800",
      cancelled: "bg-red-100 text-red-800",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          statusStyles[stage] || "bg-gray-100 text-gray-800"
        }`}
      >
        {stage.charAt(0).toUpperCase() + stage.slice(1)}
      </span>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto border-4 border-gray-200 rounded-full border-t-blue-500 animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading rentals...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-lg p-6 border border-red-200 rounded-lg bg-red-50">
          <h3 className="text-lg font-medium text-red-800">
            Error Loading Rentals
          </h3>
          <p className="mt-2 text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 mt-4 text-white transition-colors bg-red-600 rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Manage Equipment Rentals
        </h1>
        <div className="text-sm text-gray-500">
          Total Rentals: <span className="font-medium">{rentals.length}</span>
        </div>
      </div>

      {rentals.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-lg shadow">
          <div className="w-16 h-16 mx-auto text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <p className="mt-4 text-gray-600">
            You don't have any equipment rentals yet.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden bg-white rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Rental ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Booking Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Equipment
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Rental Period
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Renter
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Payment
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rentals.map((rental) => (
                  <tr
                    key={rental._id}
                    className="transition-colors cursor-pointer hover:bg-gray-50"
                    onClick={() => viewRentalDetails(rental._id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {rental._id.substring(rental._id.length - 8)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(rental.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-8 h-8">
                          {rental.equipment.images &&
                            rental.equipment.images.length > 0 && (
                              <img
                                className="object-cover w-8 h-8 rounded-lg"
                                src={rental.equipment.images[0]}
                                alt={rental.equipment.name}
                              />
                            )}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {rental.equipment.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {rental.equipment.category}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(rental.rentalStart)} -{" "}
                        {formatDate(rental.rentalEnd)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {rental.totalDays} days
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-1">
                          <div className="text-sm font-medium text-gray-900">
                            {rental.renter.firstName} {rental.renter.lastName}
                          </div>
                          <div className="text-xs text-gray-500">
                            {rental.renter.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ₹{rental.totalPrice}
                      </div>
                      <div className="text-xs text-gray-500">
                        ₹{rental.equipment.pricePerDay}/day
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getRentalStatusBadge(rental.stage)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          rental.paymentStatus === "success"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {rental.paymentStatus.charAt(0).toUpperCase() +
                          rental.paymentStatus.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                      <button
                        className="font-medium text-blue-600 hover:text-blue-800"
                        onClick={(e) => {
                          e.stopPropagation();
                          viewRentalDetails(rental._id);
                        }}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
