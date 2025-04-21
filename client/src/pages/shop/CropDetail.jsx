import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { getToken } from "../../utils/token.utils";

const CropDetail = () => {
  const { cropId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!cropId) return;
      setLoading(true);
      try {
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + `/api/crop/get-crop/${cropId}`,
          {
            headers: {
              Authorization: getToken() ? `Bearer ${getToken()}` : null,
            },
          }
        );
        if (response.data.success) {
          setProduct(response.data.data);
        } else {
          setError("Failed to fetch product data");
        }
      } catch (err) {
        setError("Error connecting to server");
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [cropId]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= (product?.quantity || 1)) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => {
    if (quantity < (product?.quantity || 1)) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate time remaining until expiry
  const calculateTimeRemaining = (expiryDate) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? `${diffDays} days remaining` : "Expired";
  };

  // Skeleton loader component
  const ProductSkeleton = () => (
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
            Unable to load product
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
              onClick={() => navigate("/shop")}
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
                onClick={() => navigate("/shop")}
                className="text-gray-500 hover:text-gray-700"
              >
                Crops
              </button>
            </li>
            <li className="text-gray-500">/</li>
            <li className="font-medium text-gray-900">
              {loading ? "Loading..." : error ? "Error" : product?.name}
            </li>
          </ol>
        </nav>

        {/* Main Content */}
        {loading ? (
          <ProductSkeleton />
        ) : error ? (
          <ErrorDisplay />
        ) : (
          product && (
            <div className="p-6 bg-white ">
              <div className="flex flex-col gap-8 md:flex-row">
                {/* Product Images */}
                <div className="w-full md:w-1/2">
                  <div className="mb-4 overflow-hidden rounded-lg">
                    <img
                      src={product.images[selectedImage]}
                      alt={product.name}
                      className="object-cover w-full transition-transform duration-300 rounded-lg h-96 hover:scale-105"
                    />
                  </div>

                  {product.images.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {product.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`overflow-hidden rounded-lg border-2 ${
                            selectedImage === index
                              ? "border-green-500"
                              : "border-transparent"
                          }`}
                        >
                          <img
                            src={image}
                            alt={`${product.name} thumbnail ${index + 1}`}
                            className="object-cover w-full h-20"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="w-full md:w-1/2">
                  <div className="mb-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                          {product.name}
                        </h1>
                        <p className="mt-1 text-lg text-gray-600">
                          {product.category}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">
                          ₹{product.price}
                        </div>
                        <p className="text-sm text-gray-500">
                          per {product.unit}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.isOrganic && (
                      <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">
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
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Organic
                      </span>
                    )}
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
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Harvest Date: {formatDate(product.harvestDate)}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-amber-100 text-amber-800">
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
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {calculateTimeRemaining(product.expiryDate)}
                    </span>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <h3 className="mb-2 text-lg font-semibold">Description</h3>
                    <p className="text-gray-700">{product.description}</p>
                  </div>

                  {/* Tags */}
                  {product.tags.length > 0 && (
                    <div className="mb-6">
                      <h3 className="mb-2 text-lg font-semibold">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {product.tags.map((tag, index) => (
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

                  {/* Stock and delivery info */}
                  <div className="p-4 mb-6 rounded-lg bg-gray-50">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700">Available Stock:</span>
                      <span className="font-semibold">
                        {product.quantity} {product.unit}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Estimated Dispatch:</span>
                      <span className="font-semibold">
                        {product.dispatchTime} days
                      </span>
                    </div>
                  </div>

                  {/* Farmer details */}
                  <div className="p-4 mb-6 rounded-lg bg-gray-50">
                    <div className="flex items-center">
                      {product.user.image ? (
                        <img
                          src={product.user.image}
                          alt={`${product.user.firstName} ${product.user.lastName}`}
                          className="object-cover w-12 h-12 mr-4 rounded-full"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-12 h-12 mr-4 bg-gray-200 rounded-full">
                          <span className="text-lg font-medium text-gray-500">
                            {product.user.firstName.charAt(0)}
                            {product.user.lastName.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="font-medium">
                          {product.user.firstName} {product.user.lastName}
                          {product.user.verified && (
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
                        <p className="text-sm text-gray-500">Farmer</p>
                      </div>
                    </div>
                  </div>

                  {/* Quantity selector */}
                  <div className="mb-6">
                    <label
                      htmlFor="quantity"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Quantity
                    </label>
                    <div className="flex">
                      <button
                        type="button"
                        onClick={decrementQuantity}
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
                        id="quantity"
                        name="quantity"
                        min="1"
                        max={product.quantity}
                        value={quantity}
                        onChange={handleQuantityChange}
                        className="flex-1 p-2 text-center border-gray-300 border-y focus:ring-green-500 focus:border-green-500"
                      />
                      <button
                        type="button"
                        onClick={incrementQuantity}
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
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    {product.isUserCrop ? (
                      <button
                        disabled={product.quantity === 0}
                        type="button"
                        className="flex-1 px-4 py-3 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      >
                        Edit Crop
                      </button>
                    ) : (
                      <button
                        disabled={product.quantity === 0}
                        type="button"
                        className="flex-1 px-4 py-3 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      >
                        Add to Cart
                      </button>
                    )}

                    <button
                      type="button"
                      className="flex-1 px-4 py-3 font-semibold text-green-600 bg-white border border-green-600 rounded-md hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                      Contact Farmer
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

export default CropDetail;
