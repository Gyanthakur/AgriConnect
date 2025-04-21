import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Cloud,
  Sun,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
  Wind,
  Droplets,
  ThermometerSun,
  ThermometerSnowflake,
  Sunrise,
  Sunset,
  Calendar,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const WeatherInsights = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState(""); // User input for city
  const [searching, setSearching] = useState(false);
  const [farmingTips, setFarmingTips] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  // Get weather condition icon
  const getWeatherIcon = (condition) => {
    const code = condition.toLowerCase();
    if (code.includes("clear"))
      return <Sun className="text-yellow-500" size={36} />;
    if (code.includes("cloud"))
      return <Cloud className="text-gray-500" size={36} />;
    if (code.includes("rain") || code.includes("drizzle"))
      return <CloudRain className="text-blue-500" size={36} />;
    if (code.includes("snow"))
      return <CloudSnow className="text-blue-200" size={36} />;
    if (code.includes("thunder"))
      return <CloudLightning className="text-yellow-400" size={36} />;
    if (code.includes("fog") || code.includes("haze") || code.includes("mist"))
      return <CloudFog className="text-gray-400" size={36} />;
    return <Cloud size={36} />;
  };

  const generateFarmingTips = (weatherData) => {
    const { temp } = weatherData.main;
    const condition = weatherData.weather[0].main.toLowerCase();
    const windSpeed = weatherData.wind.speed;
    const humidity = weatherData.main.humidity;
    let tips = [];
    if (temp > 30) {
      tips.push(
        "High temperature alert. Ensure crops have adequate irrigation."
      );
      tips.push("Consider providing shade for sensitive crops.");
    } else if (temp < 10) {
      tips.push("Low temperature alert. Protect frost-sensitive crops.");
    }
    if (condition.includes("rain") || condition.includes("drizzle")) {
      tips.push("Rainfall expected. Delay pesticide application.");
      if (windSpeed > 5) {
        tips.push(
          "Strong winds with rain - check for crop damage after storm."
        );
      }
    }
    if (humidity > 80) {
      tips.push("High humidity. Watch for fungal diseases in crops.");
    }
    if (windSpeed > 7) {
      tips.push("Strong winds alert. Secure any loose farming equipment.");
    }
    if (condition.includes("clear")) {
      tips.push("Good weather for harvesting dry crops.");
    }
    return tips.length > 0
      ? tips
      : ["Weather conditions are generally favorable for farming activities."];
  };

  const fetchWeather = async (query) => {
    try {
      if (!API_KEY) {
        setError(
          "Weather API key is missing. Please configure it in .env file."
        );
        setLoading(false);
        return;
      }
      let url;
      let forecastUrl;
      if (typeof query === "string") {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${API_KEY}`;
        forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&appid=${API_KEY}`;
      } else {
        const { latitude, longitude } = query;
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
        forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
      }
      setLoading(true);
      const weatherResponse = await axios.get(url);
      const forecastResponse = await axios.get(forecastUrl);
      setWeather(weatherResponse.data);
      // Get all forecast data instead of just filtering
      setForecast(forecastResponse.data.list);
      setFarmingTips(generateFarmingTips(weatherResponse.data));
      setError(null);
    } catch (error) {
      setError(
        "Failed to fetch weather data. Please check the city name and try again."
      );
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
        setError(
          "Location access denied. Using default location (Sultanpur, UP)."
        );
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
      setCurrentSlide(0); // Reset slider position
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (dt_txt) => {
    const date = new Date(dt_txt);
    return date.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const formatForecastTime = (dt_txt) => {
    const date = new Date(dt_txt);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const slideRight = () => {
    if (forecast && currentSlide < forecast.length - 3) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const slideLeft = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="w-full p-4 py-12 mx-auto text-gray-800 dark:bg-zinc-900 dark:text-white">
      <div className="mb-6 text-center">
        <h1 className="flex items-center justify-center gap-2 text-2xl font-bold">
          <CloudRain className="text-blue-600 dark:text-blue-400" />
          Farm Weather Insights
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Real-time weather information to help plan your farming activities
        </p>
      </div>

      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="text"
            placeholder="Enter city or village name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none bg-gray-50 dark:bg-gray-900 dark:border-gray-700 focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="px-4 py-2 font-medium text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            disabled={searching}
          >
            {searching ? (
              <RefreshCw className="mx-auto animate-spin" />
            ) : (
              "Search"
            )}
          </button>
        </div>
      </form>

      <div className="">
        {loading || searching ? (
          <div className="flex flex-col items-center justify-center py-10">
            <RefreshCw
              className="mb-4 text-blue-600 animate-spin dark:text-blue-400"
              size={40}
            />
            <p>Loading weather data...</p>
          </div>
        ) : error ? (
          <div className="py-8 text-center text-red-500">
            <p>{error}</p>
          </div>
        ) : (
          <div>
            {/* Current Weather */}
            <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
              <div className="p-4 bg-white border rounded-lg dark:border-zinc-700 dark:bg-gray-900">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Current Weather</h2>
                  <span className="text-sm text-gray-500 dark:text-gray-300">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center mb-4">
                  {getWeatherIcon(weather.weather[0].description)}
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold">
                      {weather.name}, {weather.sys.country}
                    </h3>
                    <p className="capitalize">
                      {weather.weather[0].description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <ThermometerSun
                      className="text-red-600 dark:text-red-400"
                      size={20}
                    />
                    <span className="ml-2">
                      {weather.main.temp.toFixed(1)}°C
                    </span>
                  </div>
                  <div className="flex items-center">
                    <ThermometerSnowflake
                      className="text-blue-600 dark:text-blue-400"
                      size={20}
                    />
                    <span className="ml-2">
                      Feels like {weather.main.feels_like.toFixed(1)}°C
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Droplets className="text-blue-500" size={20} />
                    <span className="ml-2">
                      Humidity: {weather.main.humidity}%
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Wind
                      className="text-gray-600 dark:text-gray-300"
                      size={20}
                    />
                    <span className="ml-2">Wind: {weather.wind.speed} m/s</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center">
                    <Sunrise className="text-yellow-500" size={20} />
                    <span className="ml-2">
                      Rise: {formatTime(weather.sys.sunrise)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Sunset className="text-orange-500" size={20} />
                    <span className="ml-2">
                      Set: {formatTime(weather.sys.sunset)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Farming Tips Section */}
              <div className="p-4 bg-white border rounded-lg dark:border-zinc-700 dark:bg-gray-900">
                <h2 className="mb-4 text-xl font-semibold">Farming Tips</h2>
                <ul className="space-y-2">
                  {farmingTips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Forecast Slider */}
            {forecast && (
              <div className="p-4 mt-6 bg-white border rounded-lg dark:border-zinc-700 dark:bg-gray-900">
                <h2 className="flex items-center mb-4 text-xl font-semibold">
                  <Calendar className="mr-2" size={20} />
                  Weather Forecast
                </h2>

                <div className="relative">
                  {/* Slider Navigation */}
                  <div className="flex items-center justify-between mb-2">
                    <button
                      onClick={slideLeft}
                      disabled={currentSlide === 0}
                      className="p-2 bg-gray-200 rounded-full dark:bg-gray-600 disabled:opacity-50"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <span className="text-sm text-gray-500 dark:text-gray-300">
                      {forecast.length > 0
                        ? `${currentSlide + 1}-${Math.min(
                            currentSlide + 3,
                            forecast.length
                          )} of ${forecast.length}`
                        : ""}
                    </span>
                    <button
                      onClick={slideRight}
                      disabled={currentSlide >= forecast.length - 3}
                      className="p-2 bg-gray-200 rounded-full dark:bg-gray-600 disabled:opacity-50"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>

                  {/* Slider Content */}
                  <div ref={sliderRef} className="overflow-hidden">
                    <div
                      className="flex transition-transform duration-300 ease-in-out"
                      style={{
                        transform: `translateX(-${currentSlide * 33.33}%)`,
                      }}
                    >
                      {forecast.map((item, index) => (
                        <div key={index} className="w-full min-w-[33.33%] px-2">
                          <div className="h-full p-3 text-center bg-gray-100 rounded-lg dark:bg-gray-900">
                            <h3 className="font-medium">
                              {formatDate(item.dt_txt)}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {formatForecastTime(item.dt_txt)}
                            </p>
                            <div className="flex justify-center my-2">
                              {getWeatherIcon(item.weather[0].description)}
                            </div>
                            <p className="mb-2 text-sm capitalize">
                              {item.weather[0].description}
                            </p>
                            <div className="flex justify-between text-sm">
                              <span>{item.main.temp_min.toFixed(1)}°C</span>
                              <span>{item.main.temp_max.toFixed(1)}°C</span>
                            </div>
                            <div className="grid grid-cols-2 gap-1 mt-2 text-xs">
                              <div className="flex items-center">
                                <Droplets
                                  size={12}
                                  className="mr-1 text-blue-500"
                                />
                                <span>{item.main.humidity}%</span>
                              </div>
                              <div className="flex items-center">
                                <Wind size={12} className="mr-1" />
                                <span>{item.wind.speed} m/s</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer with Additional Info */}
      <div className="mt-6 text-sm text-center text-gray-500 dark:text-gray-400">
        <p>Data provided by OpenWeatherMap</p>
        <p className="mt-1">Last updated: {new Date().toLocaleTimeString()}</p>
      </div>
    </div>
  );
};

export default WeatherInsights;
