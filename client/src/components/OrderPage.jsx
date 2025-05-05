import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { getToken } from "../utils/token.utils";
import { toast } from "react-toastify";

const OrderPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const { user } = useContext(AppContext);
  useEffect(() => {
    if (!getToken()) {
      window.location.href = "/login";
    }
    const fetchOrder = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/order/${orderId}`,
          {
            headers: { Authorization: `Bearer ${getToken()}` },
          }
        );
        setOrder(res.data.order);
        if ((res.data, order.stage === "placed")) {
          window.location.href = "/dashboard"; // Redirect to dashboard or order confirmation page
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchOrder();
  }, [orderId, user]);

  const handlePlaceOrder = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/order/${orderId}/place`,
        {
          deliveryAddress: user.address,
        },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      toast.success("Order placed successfully!");
      window.location.href = "/dashboard"; // Redirect to dashboard or order confirmation page
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
      console.error("Placing order failed", error);
    }
  };

  if (!order) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl p-6 mx-auto">
      <h1 className="mb-4 text-2xl font-semibold">Order Summary</h1>

      {/* Items */}
      <div className="mb-6">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 py-2 border-b">
            <img
              src={item.image}
              alt={item.name}
              className="object-cover w-20 h-20 rounded"
            />
            <div>
              <h2 className="font-bold">{item.name}</h2>
              <p>
                {item.quantity} {item.unit} × ₹{item.price} = ₹{item.totalPrice}
              </p>
            </div>
          </div>
        ))}
        <p className="mt-4 font-semibold">Total: ₹{order.totalAmount}</p>
      </div>

      {/* Address */}
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Select Delivery Address</h2>
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

      {/* Payment (UI only) */}
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Payment</h2>
        <p className="text-gray-600">
          UPI, Net Banking, Debit/Credit Card (UI only)
        </p>
      </div>

      {/* Place Order */}
      <button
        className="px-6 py-2 text-white bg-green-600 rounded hover:bg-green-700"
        onClick={handlePlaceOrder}
      >
        Place Order
      </button>
    </div>
  );
};

export default OrderPage;
