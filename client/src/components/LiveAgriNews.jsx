import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LiveAgriNews = ({ isDarkMode }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('agriculture'); // Default category

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://api.currentsapi.services/v1/latest-news', {
          params: { 
            apiKey: import.meta.env.VITE_CURRENTS_API_KEY, 
            category: category
          }
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

  return (
    <div className={`p-8 min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <h1 className={`text-4xl font-bold text-center mb-6 ${isDarkMode ? 'text-green-400' : 'text-green-700'}`}>Live AgriConnect News</h1>
      <p className="text-center mb-6">Stay updated with the latest agricultural news from around the world.</p>

      <div className="text-center mb-6">
        <label htmlFor="category" className="mr-4 text-lg">Select Category:</label>
        <select 
          id="category" 
          value={category} 
          onChange={handleCategoryChange}
          className={`border rounded-md p-2 ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'}`}
        >
          <option value="agriculture">Agriculture</option>
          <option value="business">Business</option>
          <option value="technology">Technology</option>
          <option value="health">Health</option>
          <option value="science">Science</option>
          <option value="sports">Sports</option>
          <option value="entertainment">Entertainment</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading news...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((article, index) => (
            <div key={index} className={`border rounded-lg overflow-hidden shadow-lg ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>
              <img
                src={article.image || "https://via.placeholder.com/300"}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className={`text-xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-700'}`}>{article.title}</h2>
                <p className="mt-2">
                  {article.description ? article.description : "No description available."}
                </p>
                <p className="text-sm mt-2">Source: {article.source?.name || "Unknown"}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline mt-4 block"
                >
                  Read More
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
