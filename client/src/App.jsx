import React, { useState } from "react";
import { Routes, Route, useLocation, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components and Pages
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MyProfile from "./pages/MyProfile";
import CommunitySupport from "./components/CommunitySupport";
import InformationResources from "./components/InformationRresources";
import SustainableFarming from "./components/SustainableFarming";
import LiveAgriNews from "./components/LiveAgriNews";
import MarketPrice from "./components/MarketPrice";
import WeatherInsights from "./components/WeatherInsights";
import FarmEquipmentRentals from "./components/FarmEquipmentRentals";
import CropAdvisory from "./components/CropAdvisory";

// Dashboard pages
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import MyCrops from "./pages/dashboard/MyCrops";
import AddCrop from "./pages/dashboard/AddCrop";
import EditCrop from "./pages/dashboard/EditCrop";
import CropsLayout from "./pages/dashboard/CropsLayout";

// Shop pages
import ShopLayout from "./pages/shop/ShopLayout";
import CropDetail from "./pages/shop/CropDetail";
import CropsListing from "./pages/shop/CropListing";
import ChatPage from "./pages/ChatPage";
import PlantingCalendarPage from "./pages/PlantingCalendarPage";
import CropDatabasePage from "./pages/CropDatabasePage";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation(); // Get current route

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900">
      <ToastContainer position="top-right" />
      {location.pathname !== "/chatbot" && (
        <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      )}
      <div className="w-full min-h-[92vh]">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/community-support" element={<CommunitySupport />} />
          <Route path="/weather" element={<WeatherInsights />} />
          <Route path="/market-price" element={<MarketPrice />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="" element={<Dashboard />} />
            <Route path="weather" element={<WeatherInsights />} />
            <Route path="news" element={<LiveAgriNews />} />
            <Route path="community" element={<CommunitySupport />} />
            <Route path="equipment" element={<FarmEquipmentRentals />} />
            <Route path="market-price" element={<MarketPrice />} />
            <Route path="crops" element={<CropsLayout />}>
              <Route path="" element={<MyCrops />} />
              <Route path="add" element={<AddCrop />} />
              <Route path="edit/:cropId" element={<EditCrop />} />
            </Route>
            <Route path="settings" element={<MyProfile />} />
          </Route>
          <Route path="/services" element={<Services />} />
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ShopLayout />}>
            <Route path="" element={<CropsListing />} />
            <Route path=":cropId" element={<CropDetail />} />
          </Route>
          <Route path="/chatbot" element={<ChatPage />} />
          <Route
            path="/planting-calculator"
            element={<PlantingCalendarPage />}
          />
          <Route path="/crop-database" element={<CropDatabasePage />} />
          <Route
            path="/information-resources"
            element={<InformationResources isDarkMode={isDarkMode} />}
          />
          <Route
            path="/sustainable-farming"
            element={<SustainableFarming isDarkMode={isDarkMode} />}
          />
          <Route path="/news" element={<LiveAgriNews />} />
          <Route
            path="/crop-advisory"
            element={<CropAdvisory isDarkMode={isDarkMode} />}
          />
          <Route path="/equipment-rentals" element={<FarmEquipmentRentals />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      {location.pathname !== "/chatbot" && <Footer />}
    </div>
  );
};

export default App;
