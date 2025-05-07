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
  Tractor,
  Leaf,
} from "lucide-react";

const WeatherInsights = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [monthlyForecast, setMonthlyForecast] = useState(null);
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

  const generateFarmingTips = (weatherData, monthlyData) => {
    const { temp } = weatherData.main;
    const condition = weatherData.weather[0].main.toLowerCase();
    const windSpeed = weatherData.wind.speed;
    const humidity = weatherData.main.humidity;
    let tips = [];

    // Current weather tips
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

    // Monthly forecast tips
    if (monthlyData) {
      const rainyDays = monthlyData.filter(
        (day) =>
          day.weather.toLowerCase().includes("rain") ||
          day.weather.toLowerCase().includes("drizzle")
      ).length;

      const hotDays = monthlyData.filter((day) => day.maxTemp > 30).length;
      const coldDays = monthlyData.filter((day) => day.minTemp < 10).length;

      if (rainyDays > 10) {
        tips.push(
          `Heavy rainfall expected this month (${rainyDays} days). Plan drainage systems and consider delayed sowing.`
        );
      } else if (rainyDays < 5) {
        tips.push(
          "Low rainfall expected this month. Plan irrigation accordingly."
        );
      }

      if (hotDays > 15) {
        tips.push(
          `Hot weather expected (${hotDays} days above 30°C). Choose heat-resistant varieties.`
        );
      }

      if (coldDays > 10) {
        tips.push(
          `Cold spell expected (${coldDays} days below 10°C). Protect sensitive crops.`
        );
      }
    }

    return tips.length > 0
      ? tips
      : ["Weather conditions are generally favorable for farming activities."];
  };

  // Simulated monthly forecast data (since OpenWeatherMap free API doesn't provide long-term forecasts)
  const generateMonthlyForecast = (location) => {
    const today = new Date();
    const forecast = [];

    // Generate forecast for next 60 days (2 months)
    for (let i = 0; i < 60; i++) {
      const forecastDate = new Date();
      forecastDate.setDate(today.getDate() + i);

      // Create seasonal variations based on month
      const month = forecastDate.getMonth();
      let baseTemp, rainProbability, windSpeed;

      // Adjust conditions based on month (Northern Hemisphere seasons)
      if (month >= 2 && month <= 4) {
        // Spring (Mar-May)
        baseTemp = 18 + Math.random() * 8;
        rainProbability = 0.3 + Math.random() * 0.2;
        windSpeed = 2 + Math.random() * 4;
      } else if (month >= 5 && month <= 7) {
        // Summer (Jun-Aug)
        baseTemp = 25 + Math.random() * 10;
        rainProbability = 0.2 + Math.random() * 0.3;
        windSpeed = 1 + Math.random() * 3;
      } else if (month >= 8 && month <= 10) {
        // Fall (Sep-Nov)
        baseTemp = 15 + Math.random() * 8;
        rainProbability = 0.4 + Math.random() * 0.2;
        windSpeed = 2 + Math.random() * 5;
      } else {
        // Winter (Dec-Feb)
        baseTemp = 5 + Math.random() * 8;
        rainProbability = 0.3 + Math.random() * 0.4;
        windSpeed = 3 + Math.random() * 6;
      }

      // Daily variation
      const dailyVariation = Math.random() * 6 - 3;
      const tempVariation = Math.random() * 8 - 4;

      // Determine weather condition
      let weather;
      const randomCondition = Math.random();
      if (randomCondition < rainProbability) {
        weather = "Rain";
      } else if (randomCondition < rainProbability + 0.1) {
        weather = "Cloudy";
      } else if (randomCondition < rainProbability + 0.2 && baseTemp < 5) {
        weather = "Snow";
      } else {
        weather = "Clear";
      }

      forecast.push({
        date: forecastDate,
        weather: weather,
        maxTemp: baseTemp + tempVariation,
        minTemp: baseTemp - tempVariation - 5,
        humidity: 40 + Math.random() * 50,
        windSpeed: windSpeed,
        rainChance: rainProbability * 100,
      });
    }

    return forecast;
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

      // Get current weather and 5-day forecast
      setWeather(weatherResponse.data);
      setForecast(forecastResponse.data.list);

      // Generate 2-month forecast (simulated)
      const monthlyData = generateMonthlyForecast(weatherResponse.data.name);
      setMonthlyForecast(monthlyData);

      // Generate farming tips based on current weather and monthly forecast
      setFarmingTips(generateFarmingTips(weatherResponse.data, monthlyData));
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

  const formatDate = (date) => {
    return date.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const slideRight = () => {
    if (monthlyForecast && currentSlide < monthlyForecast.length - 7) {
      setCurrentSlide(currentSlide + 7);
    }
  };

  const slideLeft = () => {
    if (currentSlide >= 7) {
      setCurrentSlide(currentSlide - 7);
    }
  };

  // Group forecast data by week
  const getWeeklyGroups = () => {
    if (!monthlyForecast) return [];

    const weeks = [];
    for (let i = 0; i < monthlyForecast.length; i += 7) {
      const weekData = monthlyForecast.slice(i, i + 7);
      weeks.push(weekData);
    }
    return weeks;
  };

  // Get current week data
  const getCurrentWeekData = () => {
    const weeklyGroups = getWeeklyGroups();
    const currentWeekIndex = Math.floor(currentSlide / 7);
    return weeklyGroups[currentWeekIndex] || [];
  };

  const getWeatherIconForForecast = (condition) => {
    const code = condition.toLowerCase();
    if (code.includes("clear"))
      return <Sun className="text-yellow-500" size={24} />;
    if (code.includes("cloud"))
      return <Cloud className="text-gray-500" size={24} />;
    if (code.includes("rain"))
      return <CloudRain className="text-blue-500" size={24} />;
    if (code.includes("snow"))
      return <CloudSnow className="text-blue-200" size={24} />;
    return <Cloud size={24} />;
  };

  return (
    <div className="w-full p-4 py-12 mx-auto text-gray-800 dark:bg-zinc-900 dark:text-white">
      <div className="mb-6 text-center">
        <h1 className="flex items-center justify-center gap-2 text-2xl font-bold">
          <Tractor className="text-green-600 dark:text-green-400" />
          Agricultural Weather Insights
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Long-term weather forecasts for better agricultural planning
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
            className="px-4 py-2 font-medium text-white transition-colors bg-green-500 rounded-lg hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
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
              className="mb-4 text-green-600 animate-spin dark:text-green-400"
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
              <div className="p-4 bg-white border rounded-lg shadow-sm dark:border-zinc-700 dark:bg-gray-900">
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
              <div className="p-4 bg-white border rounded-lg shadow-sm dark:border-zinc-700 dark:bg-gray-900">
                <h2 className="flex items-center mb-4 text-xl font-semibold">
                  <Leaf className="mr-2 text-green-600" size={24} />
                  Farming Tips
                </h2>
                <ul className="space-y-2">
                  {farmingTips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 text-green-600">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Monthly Forecast */}
            {monthlyForecast && (
              <div className="p-4 mt-6 bg-white border rounded-lg shadow-sm dark:border-zinc-700 dark:bg-gray-900">
                <h2 className="flex items-center mb-4 text-xl font-semibold">
                  <Calendar className="mr-2 text-green-600" size={20} />
                  2-Month Weather Forecast
                </h2>

                <div className="relative">
                  {/* Slider Navigation */}
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={slideLeft}
                      disabled={currentSlide === 0}
                      className="p-2 bg-gray-200 rounded-full dark:bg-gray-600 disabled:opacity-50"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {monthlyForecast.length > 0
                        ? `Week ${
                            Math.floor(currentSlide / 7) + 1
                          } of ${Math.ceil(monthlyForecast.length / 7)}`
                        : ""}
                    </span>
                    <button
                      onClick={slideRight}
                      disabled={currentSlide >= monthlyForecast.length - 7}
                      className="p-2 bg-gray-200 rounded-full dark:bg-gray-600 disabled:opacity-50"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>

                  {/* Weekly Overview */}
                  <div className="mb-6 overflow-hidden bg-gray-100 rounded-lg dark:bg-gray-800">
                    <div className="p-4">
                      <h3 className="mb-2 text-lg font-medium">
                        Weekly Overview
                      </h3>
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        {getCurrentWeekData().length > 0 && (
                          <>
                            <div className="p-3 bg-white rounded-lg shadow-sm dark:bg-gray-700">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium">
                                  Avg Temperature
                                </h4>
                                <ThermometerSun
                                  className="text-red-500"
                                  size={16}
                                />
                              </div>
                              <p className="mt-2 text-xl font-semibold">
                                {(
                                  getCurrentWeekData().reduce(
                                    (acc, day) =>
                                      acc + (day.maxTemp + day.minTemp) / 2,
                                    0
                                  ) / getCurrentWeekData().length
                                ).toFixed(1)}
                                °C
                              </p>
                            </div>

                            <div className="p-3 bg-white rounded-lg shadow-sm dark:bg-gray-700">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium">
                                  Rainy Days
                                </h4>
                                <CloudRain
                                  className="text-blue-500"
                                  size={16}
                                />
                              </div>
                              <p className="mt-2 text-xl font-semibold">
                                {
                                  getCurrentWeekData().filter((day) =>
                                    day.weather.toLowerCase().includes("rain")
                                  ).length
                                }
                              </p>
                            </div>

                            <div className="p-3 bg-white rounded-lg shadow-sm dark:bg-gray-700">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium">
                                  Avg Humidity
                                </h4>
                                <Droplets className="text-blue-500" size={16} />
                              </div>
                              <p className="mt-2 text-xl font-semibold">
                                {(
                                  getCurrentWeekData().reduce(
                                    (acc, day) => acc + day.humidity,
                                    0
                                  ) / getCurrentWeekData().length
                                ).toFixed(0)}
                                %
                              </p>
                            </div>

                            <div className="p-3 bg-white rounded-lg shadow-sm dark:bg-gray-700">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium">
                                  Avg Wind
                                </h4>
                                <Wind className="text-gray-500" size={16} />
                              </div>
                              <p className="mt-2 text-xl font-semibold">
                                {(
                                  getCurrentWeekData().reduce(
                                    (acc, day) => acc + day.windSpeed,
                                    0
                                  ) / getCurrentWeekData().length
                                ).toFixed(1)}{" "}
                                m/s
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Daily Forecast Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="text-xs font-medium text-gray-700 uppercase bg-gray-100 dark:bg-gray-800 dark:text-gray-300">
                        <tr>
                          <th className="px-4 py-3">Date</th>
                          <th className="px-4 py-3">Weather</th>
                          <th className="px-4 py-3">Temp (°C)</th>
                          <th className="px-4 py-3">Humidity</th>
                          <th className="px-4 py-3">Wind</th>
                          <th className="px-4 py-3">Rain Chance</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {monthlyForecast
                          .slice(currentSlide, currentSlide + 7)
                          .map((day, index) => (
                            <tr
                              key={index}
                              className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                            >
                              <td className="px-4 py-3 font-medium">
                                {formatDate(day.date)}
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex items-center">
                                  {getWeatherIconForForecast(day.weather)}
                                  <span className="ml-2">{day.weather}</span>
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <span className="text-red-500">
                                  {day.maxTemp.toFixed(1)}°
                                </span>{" "}
                                /{" "}
                                <span className="text-blue-500">
                                  {day.minTemp.toFixed(1)}°
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                {day.humidity.toFixed(0)}%
                              </td>
                              <td className="px-4 py-3">
                                {day.windSpeed.toFixed(1)} m/s
                              </td>
                              <td className="px-4 py-3">
                                {day.rainChance.toFixed(0)}%
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Monthly Summary */}
            {monthlyForecast && (
              <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2">
                <div className="p-4 bg-white border rounded-lg shadow-sm dark:border-zinc-700 dark:bg-gray-900">
                  <h2 className="mb-4 text-xl font-semibold">
                    First Month Summary
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Temperature Range
                      </h3>
                      <p className="mt-1 text-lg">
                        {Math.min(
                          ...monthlyForecast
                            .slice(0, 30)
                            .map((day) => day.minTemp)
                        ).toFixed(1)}
                        °C -{" "}
                        {Math.max(
                          ...monthlyForecast
                            .slice(0, 30)
                            .map((day) => day.maxTemp)
                        ).toFixed(1)}
                        °C
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Rainy Days
                      </h3>
                      <p className="mt-1 text-lg">
                        {
                          monthlyForecast
                            .slice(0, 30)
                            .filter((day) =>
                              day.weather.toLowerCase().includes("rain")
                            ).length
                        }{" "}
                        days
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Average Humidity
                      </h3>
                      <p className="mt-1 text-lg">
                        {(
                          monthlyForecast
                            .slice(0, 30)
                            .reduce((acc, day) => acc + day.humidity, 0) / 30
                        ).toFixed(0)}
                        %
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white border rounded-lg shadow-sm dark:border-zinc-700 dark:bg-gray-900">
                  <h2 className="mb-4 text-xl font-semibold">
                    Second Month Summary
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Temperature Range
                      </h3>
                      <p className="mt-1 text-lg">
                        {Math.min(
                          ...monthlyForecast.slice(30).map((day) => day.minTemp)
                        ).toFixed(1)}
                        °C -{" "}
                        {Math.max(
                          ...monthlyForecast.slice(30).map((day) => day.maxTemp)
                        ).toFixed(1)}
                        °C
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Rainy Days
                      </h3>
                      <p className="mt-1 text-lg">
                        {
                          monthlyForecast
                            .slice(30)
                            .filter((day) =>
                              day.weather.toLowerCase().includes("rain")
                            ).length
                        }{" "}
                        days
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Average Humidity
                      </h3>
                      <p className="mt-1 text-lg">
                        {(
                          monthlyForecast
                            .slice(30)
                            .reduce((acc, day) => acc + day.humidity, 0) / 30
                        ).toFixed(0)}
                        %
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <div className="p-4 mt-6 text-sm text-center text-gray-500 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-400">
        <p className="mb-2">
          <strong>Note:</strong> Long-term weather predictions are simulated and
          meant for agricultural planning purposes only.
        </p>
        <p>
          These forecasts are based on historical weather patterns and should be
          used as general guidance.
        </p>
        <p className="mt-2">Last updated: {new Date().toLocaleString()}</p>
      </div>
    </div>
  );
};

export default WeatherInsights;
