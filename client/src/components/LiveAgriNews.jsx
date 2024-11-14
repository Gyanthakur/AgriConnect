import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LiveAgriNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch news on component mount
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=agriculture&apiKey=e73fee0b1a724f8886cb501c10885881`
        // `https://newsapi.org/v2/everything?q=agriculture&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
        );
        setNews(response.data.articles);
      } catch (err) {
        setError("Failed to load news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-green-700 text-center mb-6">Live AgriConnect News</h1>
      <p className="text-center text-gray-700 mb-6">Stay updated with the latest agricultural news from around the world.</p>

      {loading ? (
        <p className="text-center text-gray-500">Loading news...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((article, index) => (
            <div key={index} className="border rounded-lg overflow-hidden shadow-lg bg-white">
              <img
                src={article.urlToImage || "https://via.placeholder.com/300"}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-green-700">{article.title}</h2>
                <p className="text-gray-700 mt-2">
                  {article.description ? article.description : "No description available."}
                </p>
                <p className="text-sm text-gray-500 mt-2">Source: {article.source.name}</p>
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
