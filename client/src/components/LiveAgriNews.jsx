import React, { useEffect, useState } from "react";
import axios from "axios";

const LiveAgriNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("agriculture"); // Default category

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://api.currentsapi.services/v1/latest-news",
        {
          params: {
            apiKey: import.meta.env.VITE_CURRENTS_API_KEY,
            category: category,
          },
        }
      );
      setNews(response.data.news);
    } catch (err) {
      setError("Failed to load news. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [category]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  // Loading skeleton for article cards
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="overflow-hidden bg-white border rounded-lg shadow-lg animate-pulse dark:bg-gray-800"
        >
          <div className="w-full h-48 bg-gray-300 dark:bg-gray-700"></div>
          <div className="p-4">
            <div className="h-6 mb-4 bg-gray-300 rounded dark:bg-gray-700"></div>
            <div className="h-4 mb-2 bg-gray-300 rounded dark:bg-gray-700"></div>
            <div className="h-4 mb-2 bg-gray-300 rounded dark:bg-gray-700"></div>
            <div className="h-4 mb-2 bg-gray-300 rounded dark:bg-gray-700"></div>
            <div className="w-1/4 h-4 mt-4 bg-gray-300 rounded dark:bg-gray-700"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-[80vh] p-8 text-gray-900 ">
      {/* Header Section with Decorative Elements */}
      <div className="relative mb-16 text-center">
        <div className="absolute top-0 left-0 w-32 h-32 opacity-20 -translate-x-1/4 -translate-y-1/4">
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="text-green-500 fill-current dark:text-green-400"
          >
            <path
              d="M46.5,-78.1C59.4,-72.7,68.9,-59.5,75.7,-45.4C82.5,-31.2,86.6,-15.6,87.7,0.6C88.7,16.9,86.6,33.8,78.3,47.3C70,60.8,55.6,70.9,40.5,76.4C25.4,81.9,9.6,82.8,-4.9,79.9C-19.5,77,-37.6,70.4,-52.9,60.1C-68.1,49.9,-80.5,36.1,-85.1,20.4C-89.7,4.8,-86.3,-12.8,-79.8,-28.8C-73.3,-44.8,-63.7,-59.1,-50.3,-64.4C-36.8,-69.8,-19.4,-66.2,-2.4,-62.5C14.6,-58.8,33.6,-83.5,46.5,-78.1Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 w-48 h-48 opacity-20 translate-x-1/3 translate-y-1/4">
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="text-green-500 fill-current dark:text-green-400"
          >
            <path
              d="M36.3,-62.4C46.1,-54.9,52.5,-42.6,60.3,-30.2C68.2,-17.8,77.5,-5.4,77.2,6.7C76.9,18.8,67,30.6,56.4,39.9C45.8,49.2,34.5,56,22.3,61.4C10.1,66.9,-3.1,71,-14.6,68.2C-26.1,65.4,-36,55.8,-47.8,46.3C-59.7,36.8,-73.5,27.4,-78.9,14.6C-84.3,1.8,-81.3,-14.4,-74.3,-28.2C-67.4,-42,-56.4,-53.3,-43.6,-59.5C-30.8,-65.7,-15.4,-66.8,-0.8,-65.7C13.9,-64.6,27.7,-61.3,36.3,-62.4Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>

        <h1 className="relative text-4xl font-bold tracking-tight text-transparent bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text md:text-5xl dark:from-green-400 dark:to-blue-400">
          Live AgriConnect News
        </h1>
        <div className="w-24 h-1 mx-auto mt-4 mb-6 rounded-full bg-gradient-to-r from-green-500 to-blue-500"></div>
        <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
          Stay updated with the latest agricultural news and insights from
          around the world.
        </p>
      </div>

      {/* Category Selection */}
      <div className="p-1 mx-auto mb-12 overflow-hidden border border-gray-200 rounded-full bg-white/50 backdrop-blur-sm dark:bg-gray-800/50 dark:border-gray-700">
        <div className="flex flex-wrap items-center justify-center gap-2 p-2">
          {[
            "agriculture",
            "business",
            "technology",
            "health",
            "science",
            "sports",
            "entertainment",
          ].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 text-sm font-medium capitalize transition-all duration-200 rounded-full 
                ${
                  category === cat
                    ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* News Content */}
      {loading ? (
        <LoadingSkeleton />
      ) : error ? (
        <div className="p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-red-100 rounded-full dark:bg-red-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-red-600 dark:text-red-300"
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
          </div>
          <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
            Error Loading News
          </h3>
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <button
            onClick={fetchNews}
            className="px-4 py-2 mt-4 font-medium text-white transition-colors rounded-lg bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
          >
            Try Again
          </button>
        </div>
      ) : news.length === 0 ? (
        <div className="p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-yellow-100 rounded-full dark:bg-yellow-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-yellow-600 dark:text-yellow-300"
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
          </div>
          <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
            No News Found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            No articles available for this category. Please try another
            category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 ">
          {news.map((article, index) => (
            <div
              key={index}
              className="overflow-hidden transition-all duration-300 transform bg-white border shadow-lg rounded-xl hover:shadow-xl hover:-translate-y-1 dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="relative">
                <img
                  src={
                    article.image ||
                    "https://via.placeholder.com/600x400?text=Agricultural+News"
                  }
                  alt={article.title}
                  className="object-cover w-full h-56"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/600x400?text=Agricultural+News";
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-xs font-medium text-white">
                    {new Date(
                      article.published || Date.now()
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="px-3 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full dark:bg-green-900 dark:text-green-200">
                    {article.category?.[0] || category}
                  </span>
                  <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
                    {article.source?.name || "Unknown Source"}
                  </span>
                </div>
                <h2 className="mb-3 text-xl font-bold leading-tight text-gray-900 line-clamp-2 dark:text-gray-100">
                  {article.title}
                </h2>
                <p className="mb-6 text-gray-600 line-clamp-3 dark:text-gray-400">
                  {article.description ||
                    "No description available for this article. Click 'Read More' to view the full content on the source website."}
                </p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 font-medium text-white transition-colors rounded-lg bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                >
                  Read More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LiveAgriNews;
