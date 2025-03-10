import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherInsights = ({ isDarkMode }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState(""); // User input for city
  const [searching, setSearching] = useState(false);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchWeather = async (query) => {
    try {
      if (!API_KEY) {
        setError("Weather API key is missing. Please configure it in .env file.");
        setLoading(false);
        return;
      }

      let url;
      if (typeof query === "string") {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${API_KEY}`;
      } else {
        const { latitude, longitude } = query;
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
      }

      setLoading(true);
      const response = await axios.get(url);
      setWeather(response.data);
      setError(null);
    } catch (error) {
      setError("Failed to fetch weather data. Please check the city name and try again.");
    } finally {
      setLoading(false);
      setSearching(false);
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeather({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        setError("Location access denied. Using default location (Sultanpur, UP).");
        fetchWeather("Sultanpur");
      }
    );
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      setSearching(true);
      fetchWeather(city);
      setCity(""); // Clear input after search
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-6 transition-colors ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <header className="text-4xl font-extrabold leading-normal text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
        Weather Insights
      </header>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mt-4 flex gap-2">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className={`p-2 border rounded-lg focus:outline-none ${isDarkMode ? 'bg-gray-800' : ''} focus:ring-2 focus:ring-blue-400`}
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          Search
        </button>
      </form>

      <main className={`mt-6 p-8 rounded-lg shadow-lg max-w-3xl transition-colors ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
        {loading || searching ? (
          <p className="text-lg">Loading weather data...</p>
        ) : error ? (
          <p className="text-lg text-red-500">{error}</p>
        ) : (
          <div>
            <h2 className="text-3xl font-semibold text-blue-500">{weather.name}, {weather.sys.country}</h2>
            <p className="text-lg mt-2">Temperature: {weather.main.temp}°C</p>
            <p className="text-lg">Condition: {weather.weather[0].description}</p>
            <p className="text-lg">Humidity: {weather.main.humidity}%</p>
            <p className="text-lg">Wind Speed: {weather.wind.speed} m/s</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default WeatherInsights;
