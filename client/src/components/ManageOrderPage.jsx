import { useEffect, useState } from "react";
import { getToken } from "../utils/token.utils";

export default function ManageOrderPage() {
  // Extracting orderId from URL
  const orderId = window.location.pathname.split("/").pop();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  // Available order stages
  const orderStages = [
    "initiated",
    "review",
    "placed",
    "confirmed",
    "dispatched",
    "delivered",
    "cancelled",
  ];

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/order/${orderId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch order details");
        }
        const result = await response.json();
        setOrder(result?.order || null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    } else {
      setError("Order ID is missing");
      setLoading(false);
    }
  }, [orderId]);

  const updateOrderStage = async (newStage) => {
    setUpdating(true);
    setUpdateSuccess(false);
    setUpdateError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/order/${orderId}/stage`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({ stage: newStage }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update order status");
      }

      const result = await response.json();
      setOrder(result?.order || order);
      setUpdateSuccess(true);

      // Clear success message after 3 seconds
      setTimeout(() => {
        setUpdateSuccess(false);
      }, 3000);
    } catch (error) {
      setUpdateError(error.message);
    } finally {
      setUpdating(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadgeClass = (stage) => {
    const statusStyles = {
      initiated: "bg-gray-100 text-gray-800",
      review: "bg-indigo-100 text-indigo-800",
      placed: "bg-blue-100 text-blue-800",
      confirmed: "bg-yellow-100 text-yellow-800",
      dispatched: "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };

    return statusStyles[stage] || "bg-gray-100 text-gray-800";
  };

  const getNextStageOptions = (currentStage) => {
    const currentIndex = orderStages.indexOf(currentStage);

    // If cancelled or delivered, don't show next stage options
    if (currentStage === "cancelled" || currentStage === "delivered") {
      return [];
    }

    // Get the logical next stages in the order flow
    let nextStages = [];

    switch (currentStage) {
      case "initiated":
        nextStages = ["review", "cancelled"];
        break;
      case "review":
        nextStages = ["placed", "cancelled"];
        break;
      case "placed":
        nextStages = ["confirmed", "cancelled", "dispatched"];
        break;
      case "confirmed":
        nextStages = ["dispatched", "cancelled"];
        break;
      case "dispatched":
        nextStages = ["delivered", "cancelled"];
        break;
      default:
        nextStages = orderStages.filter(
          (stage, index) => index > currentIndex || stage === "cancelled"
        );
    }

    return nextStages;
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto border-4 border-gray-200 rounded-full border-t-blue-500 animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-lg p-6 border border-red-200 rounded-lg bg-red-50">
          <h3 className="text-lg font-medium text-red-800">Error</h3>
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

  // No order found
  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-lg p-6 border border-yellow-200 rounded-lg bg-yellow-50">
          <h3 className="text-lg font-medium text-yellow-800">
            Order Not Found
          </h3>
          <p className="mt-2 text-yellow-600">
            The requested order could not be found.
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 mt-4 text-white transition-colors bg-yellow-600 rounded hover:bg-yellow-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Success state - show order details
  return (
    <div className="max-w-6xl px-4 py-8 mx-auto">
      {/* Header with Back button */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => window.history.back()}
          className="p-2 mr-4 rounded-full hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-gray-800">
          Order #{order._id.substring(order._id.length - 8)}
        </h1>
      </div>

      {/* Status update notifications */}
      {updateSuccess && (
        <div className="p-4 mb-6 border border-green-200 rounded-lg bg-green-50">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="w-5 h-5 text-green-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Order status successfully updated.
              </p>
            </div>
          </div>
        </div>
      )}

      {updateError && (
        <div className="p-4 mb-6 border border-red-200 rounded-lg bg-red-50">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="w-5 h-5 text-red-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">{updateError}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column - Order Info */}
        <div className="lg:col-span-2">
          <div className="overflow-hidden bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">
                  Order Details
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass(
                    order.stage
                  )}`}
                >
                  {order.stage.charAt(0).toUpperCase() + order.stage.slice(1)}
                </span>
              </div>
            </div>

            <div className="px-6 py-4 border-b border-gray-200">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Order Date
                  </p>
                  <p className="mt-1 text-sm text-gray-900">
                    {formatDate(order.createdAt)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Payment Status
                  </p>
                  <span
                    className={`mt-1 inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      order.paymentStatus === "success"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.paymentStatus.charAt(0).toUpperCase() +
                      order.paymentStatus.slice(1)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Payment ID
                  </p>
                  <p className="mt-1 text-sm text-gray-900">
                    {order.paymentId}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Expected Delivery
                  </p>
                  <p className="mt-1 text-sm text-gray-900">
                    {order.expectedDeliveryDays} day(s)
                  </p>
                </div>
              </div>
            </div>

            {/* Buyer Information */}
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="mb-2 text-sm font-medium text-gray-500">
                Buyer Information
              </h3>
              <div className="flex items-center">
                {order.buyer.image && (
                  <div className="flex-shrink-0 w-10 h-10">
                    <img
                      className="object-cover w-10 h-10 rounded-full"
                      src={order.buyer.image}
                      alt={`${order.buyer.firstName} ${order.buyer.lastName}`}
                    />
                  </div>
                )}
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {order.buyer.firstName} {order.buyer.lastName}
                  </p>
                  <div className="flex space-x-4 text-sm text-gray-500">
                    <a
                      href={`tel:${order.buyer.phone}`}
                      className="hover:text-gray-700"
                    >
                      <span className="inline-flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4 mr-1"
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
                        {order.buyer.phone}
                      </span>
                    </a>
                    <a
                      href={`mailto:${order.buyer.email}`}
                      className="hover:text-gray-700"
                    >
                      <span className="inline-flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        {order.buyer.email}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="mb-2 text-sm font-medium text-gray-500">
                Delivery Address
              </h3>
              <div className="text-sm text-gray-900">
                <p>{order.deliveryAddress.line}</p>
                <p>{order.deliveryAddress.city}</p>
                <p>
                  {order.deliveryAddress.state}, {order.deliveryAddress.zip}
                </p>
                <p>{order.deliveryAddress.country}</p>
              </div>
            </div>

            {/* Order Items */}
            <div className="px-6 py-4">
              <h3 className="mb-4 text-sm font-medium text-gray-500">
                Order Items
              </h3>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex pb-4 border-b border-gray-200 last:border-0 last:pb-0"
                  >
                    <div className="flex-shrink-0 w-20 h-20 overflow-hidden rounded-md">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="object-cover object-center w-full h-full"
                      />
                    </div>
                    <div className="flex flex-col flex-1 ml-4">
                      <div className="flex justify-between text-sm font-medium text-gray-900">
                        <h4>{item.name}</h4>
                        <p className="ml-4">₹{item.totalPrice}</p>
                      </div>
                      <div className="flex items-end justify-between mt-1 text-sm">
                        <p className="text-gray-500">
                          {item.quantity} {item.unit}
                        </p>
                        <p className="text-gray-500">
                          ₹{item.price} per {item.unit}
                        </p>
                      </div>
                      {item.crop && item.crop.description && (
                        <p className="mt-2 text-xs text-gray-500 line-clamp-2">
                          {item.crop.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Notes (if any) */}
            {order.notes && (
              <div className="px-6 py-4 border-t border-gray-200">
                <h3 className="mb-2 text-sm font-medium text-gray-500">
                  Customer Notes
                </h3>
                <p className="text-sm text-gray-900 whitespace-pre-line">
                  {order.notes}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right column - Update Status */}
        <div className="lg:col-span-1">
          <div className="overflow-hidden bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Order Status
              </h2>
            </div>

            <div className="px-6 py-4">
              <div className="mb-6">
                <h3 className="mb-2 text-sm font-medium text-gray-500">
                  Current Status
                </h3>
                <div
                  className={`px-4 py-3 rounded-md ${getStatusBadgeClass(
                    order.stage
                  )}`}
                >
                  <p className="font-medium text-center">
                    {order.stage.charAt(0).toUpperCase() + order.stage.slice(1)}
                  </p>
                </div>
              </div>

              {order.stage !== "delivered" && order.stage !== "cancelled" && (
                <div>
                  <h3 className="mb-2 text-sm font-medium text-gray-500">
                    Update Status
                  </h3>
                  <div className="space-y-2">
                    {getNextStageOptions(order.stage).map((stage) => (
                      <button
                        key={stage}
                        onClick={() => updateOrderStage(stage)}
                        disabled={updating}
                        className={`w-full px-4 py-2 text-sm font-medium rounded-md ${
                          stage === "cancelled"
                            ? "bg-red-100 text-red-700 hover:bg-red-200"
                            : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                        } transition-colors ${
                          updating ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        Mark as {stage.charAt(0).toUpperCase() + stage.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Order Summary */}
              <div className="pt-6 mt-6 border-t border-gray-200">
                <h3 className="mb-2 text-sm font-medium text-gray-500">
                  Order Summary
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <p className="text-gray-500">Subtotal</p>
                    <p className="font-medium text-gray-900">
                      ₹{order.totalAmount}
                    </p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p className="text-gray-500">Shipping</p>
                    <p className="font-medium text-gray-900">₹0.00</p>
                  </div>
                  <div className="flex justify-between pt-2 text-lg border-t border-gray-200">
                    <p className="font-medium text-gray-900">Total</p>
                    <p className="font-bold text-gray-900">
                      ₹{order.totalAmount}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Print Invoice */}
          <div className="mt-6">
            <button
              className="flex items-center justify-center w-full px-4 py-3 font-medium text-gray-800 bg-gray-100 rounded-md hover:bg-gray-200"
              onClick={() => window.print()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v1h10z"
                />
              </svg>
              Print Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
