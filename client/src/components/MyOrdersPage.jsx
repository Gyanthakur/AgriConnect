import { useEffect, useState } from "react";
import { getToken } from "../utils/token.utils";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/order/user`,
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
        setOrders(result?.orders || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const navigateToOrderDetails = (orderId) => {
    window.location.href = `/dashboard/my-orders/${orderId}`;
  };

  const navigateToShop = () => {
    window.location.href = "/shop";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "placed":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-t-2 border-b-2 border-green-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-lg p-6 border border-red-200 rounded-lg bg-red-50">
          <h3 className="text-lg font-medium text-red-800">
            Error Loading Orders
          </h3>
          <p className="mt-2 text-red-700">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 mt-4 text-white transition-colors bg-red-600 rounded-md hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md p-8 text-center bg-white border border-gray-200 rounded-lg shadow-md">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full">
            <svg
              className="w-8 h-8 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">No Orders Yet</h2>
          <p className="mt-2 text-gray-600">
            You haven't placed any orders yet. Start shopping to see your orders
            here.
          </p>
          <button
            onClick={navigateToShop}
            className="w-full px-4 py-2 mt-6 text-white transition-colors bg-green-600 rounded-md hover:bg-green-700"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
          <p className="mt-1 text-sm text-gray-500">
            {orders.length} {orders.length === 1 ? "order" : "orders"} placed
          </p>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              <div className="p-4 border-b border-gray-200 sm:p-6">
                <div className="flex flex-col justify-between sm:flex-row">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">
                      Order #
                      {order._id.substring(order._id.length - 6).toUpperCase()}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Placed on {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="flex flex-col items-start mt-2 sm:mt-0 sm:items-end">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        order.stage
                      )} capitalize`}
                    >
                      {order.stage}
                    </span>
                    <p className="mt-1 text-sm text-gray-500">
                      Expected delivery:{" "}
                      {formatDate(
                        new Date(
                          new Date(order.createdAt).getTime() +
                            order.expectedDeliveryDays * 24 * 60 * 60 * 1000
                        )
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-4 py-4 sm:px-6 bg-gray-50">
                <div className="flex justify-between text-sm font-medium">
                  <p className="text-gray-500">Items</p>
                  <p className="text-gray-500">Price</p>
                </div>
              </div>

              <ul className="divide-y divide-gray-200">
                {order.items.map((item, index) => (
                  <li
                    key={`${order._id}-${index}`}
                    className="p-4 transition-colors cursor-pointer sm:p-6 hover:bg-gray-50"
                    onClick={() => navigateToOrderDetails(order._id)}
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-16 h-16 overflow-hidden bg-gray-100 rounded-md">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
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
                            <h3 className="font-medium text-gray-900">
                              {item.name}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              {item.quantity} {item.unit} × ₹{item.price}
                            </p>
                          </div>
                          <p className="text-sm font-medium text-gray-900">
                            ₹{item.totalPrice}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="px-4 py-4 border-t border-gray-200 sm:px-6 bg-gray-50">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total</p>
                  <p>₹{order.totalAmount}</p>
                </div>
                <div className="flex justify-between mt-4">
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">
                      Delivery Address:
                    </p>
                    <p className="mt-1 text-gray-500">
                      {order.deliveryAddress.line}
                      <br />
                      {order.deliveryAddress.city}
                      <br />
                      {order.deliveryAddress.state}, {order.deliveryAddress.zip}
                      <br />
                      {order.deliveryAddress.country}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateToOrderDetails(order._id);
                    }}
                    className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    View Details
                    <svg
                      className="w-4 h-4 ml-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
