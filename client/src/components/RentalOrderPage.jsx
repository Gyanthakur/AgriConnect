import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { getToken } from "../utils/token.utils";
import { toast } from "react-toastify";

const RentalOrderPage = () => {
  const { orderId } = useParams();
  const [rental, setRental] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const { user } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getToken()) {
      window.location.href = "/login";
    }

    const fetchRental = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/rental/${orderId}`,
          {
            headers: { Authorization: `Bearer ${getToken()}` },
          }
        );
        setRental(res.data.order);

        if (res.data.stage === "placed") {
          window.location.href = "/dashboard"; // Redirect if already placed
        }

        // Pre-select user address if available
        if (user?.address) {
          setSelectedAddress("user");
        }

        setLoading(false);
      } catch (error) {
        toast.error("Error fetching rental details");
        console.error("Error fetching rental:", error);
        setLoading(false);
      }
    };

    fetchRental();
  }, [orderId, user]);

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.error("Please select a delivery address");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/rental/${orderId}/place`,
        {
          deliveryAddress: user.address,
        },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      toast.success("Rental order placed successfully!");
      window.location.href = "/dashboard"; // Redirect to dashboard
    } catch (error) {
      toast.error("Failed to place rental order. Please try again.");
      console.error("Placing rental order failed", error);
    }
  };

  if (loading)
    return <div className="flex justify-center p-10">Loading...</div>;
  if (!rental)
    return <div className="flex justify-center p-10">Rental not found</div>;

  // Format dates for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const startDate = formatDate(rental.rentalStart);
  const endDate = formatDate(rental.rentalEnd);

  return (
    <div className="max-w-4xl p-6 mx-auto">
      <h1 className="mb-4 text-2xl font-semibold">Rental Order Summary</h1>

      {/* Equipment Details */}
      <div className="p-4 mb-6 border rounded bg-gray-50">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="w-full md:w-1/3">
            {rental?.equipment?.images &&
              rental.equipment.images.length > 0 && (
                <img
                  src={rental.equipment.images[0]}
                  alt={rental.equipment.name}
                  className="object-cover w-full h-48 rounded"
                />
              )}
          </div>
          <div className="w-full md:w-2/3">
            <h2 className="text-xl font-bold">{rental.equipment.name}</h2>
            <p className="text-gray-600">
              Category: {rental.equipment.category}
            </p>
            <div className="mt-4">
              <p>
                <span className="font-semibold">Rental Period:</span>{" "}
                {startDate} to {endDate}
              </p>
              <p>
                <span className="font-semibold">Total Days:</span>{" "}
                {rental.totalDays}
              </p>
              <p>
                <span className="font-semibold">Price Per Day:</span> ₹
                {rental.equipment.pricePerDay}
              </p>
              <p className="mt-2 text-lg font-semibold">
                Total Price: ₹{rental.totalPrice}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Owner Details */}
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Equipment Owner</h2>
        <div className="p-4 border rounded">
          <div className="flex items-center gap-4">
            {rental.owner.image && (
              <img
                src={rental.owner.image}
                alt={`${rental.owner.firstName} ${rental.owner.lastName}`}
                className="object-cover w-12 h-12 rounded-full"
              />
            )}
            <div>
              <p className="font-semibold">
                {rental.owner.firstName} {rental.owner.lastName}
              </p>
              <p>Email: {rental.owner.email}</p>
              <p>Phone: {rental.owner.phone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Delivery Address</h2>
        <div className="p-4 border rounded">
          <label className="flex items-start gap-2">
            <input
              type="radio"
              name="deliveryAddress"
              checked={selectedAddress === "user"}
              onChange={() => setSelectedAddress("user")}
            />
            <div>
              <p>
                {user.firstName} {user.lastName}
              </p>
              <p>
                {user.address?.line}, {user.address?.city}
              </p>
              <p>
                {user.address?.state} - {user.address?.zip},{" "}
                {user.address?.country}
              </p>
              <p>Phone: {user.phone}</p>
            </div>
          </label>
        </div>
      </div>

      {/* Notes Field */}
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Additional Notes</h2>
        <textarea
          className="w-full p-3 border rounded"
          placeholder="Add any special instructions or requirements for your rental..."
          rows="3"
          readOnly
          value={rental.notes || ""}
        ></textarea>
      </div>

      {/* Payment (UI only) */}
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Payment</h2>
        <p className="text-gray-600">
          UPI, Net Banking, Debit/Credit Card (UI only)
        </p>
        <div className="p-3 mt-2 border border-yellow-200 rounded bg-yellow-50">
          <p className="text-sm">
            Payment Status:{" "}
            <span className="font-semibold capitalize">
              {rental.paymentStatus}
            </span>
          </p>
        </div>
      </div>

      {/* Place Order */}
      <button
        className="px-6 py-2 text-white bg-green-600 rounded hover:bg-green-700 disabled:bg-gray-400"
        onClick={handlePlaceOrder}
        disabled={!selectedAddress}
      >
        Confirm Rental Order
      </button>
    </div>
  );
};

export default RentalOrderPage;
