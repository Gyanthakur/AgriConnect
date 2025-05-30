import React, { useState } from "react";
import {
  Routes,
  Route,
  useLocation,
  useParams,
  Outlet,
} from "react-router-dom";
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
import EquipmentLayout from "./pages/dashboard/EquipmentLayout";
import MyEquipments from "./pages/dashboard/MyEquipments";
import AddEquipment from "./pages/dashboard/AddEquipment";

// Shop pages
import ShopLayout from "./pages/shop/ShopLayout";
import CropDetail from "./pages/shop/CropDetail";
import CropsListing from "./pages/shop/CropListing";
import ChatPage from "./pages/ChatPage";
import PlantingCalendarPage from "./pages/PlantingCalendarPage";
import CropDatabasePage from "./pages/CropDatabasePage";
import EditEquipment from "./pages/dashboard/EditEquipment";

import RentalLayout from "./pages/rental/RentalLayout";
import EquipmentDetail from "./pages/rental/EquipmentDetail";
import OrderPage from "./components/OrderPage";
import MyOrdersPage from "./components/MyOrdersPage";
import ManageOrdersPage from "./components/ManageOrdersPage";
import OrderDetail from "./components/OrderDetail";
import ManageOrderPage from "./components/ManageOrderPage";
import RentalOrderPage from "./components/RentalOrderPage";
import ManageEquipmentsRentals from "./components/ManageEquipmentRentals";
import MyRentalOrdersPage from "./components/ManageMyEqupmentRentals";
import ManageMyEquipmentRental from "./components/ManageEqupmentRental";
import ManageEquipmentRental from "./components/ManageEquipmentRental";

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
            <Route path="equipments" element={<EquipmentLayout />}>
              <Route path="" element={<MyEquipments />} />
              <Route path="add" element={<AddEquipment />} />
              <Route path="edit/:equipmentId" element={<EditEquipment />} />
              <Route
                path="rentals/manage"
                element={<ManageEquipmentsRentals />}
              />
              <Route
                path="rental/manage/:rentalId"
                element={<ManageEquipmentRental />}
              />

              <Route path="rentals/my" element={<MyRentalOrdersPage />} />
              <Route
                path="rental/my/manage/:rentalId"
                element={<ManageMyEquipmentRental />}
              />
            </Route>
            <Route path="crops" element={<CropsLayout />}>
              <Route path="" element={<MyCrops />} />
              <Route path="add" element={<AddCrop />} />
              <Route path="edit/:cropId" element={<EditCrop />} />
            </Route>
            <Route path="my-orders" element={<Outlet />}>
              <Route path="" element={<MyOrdersPage />} />
              <Route path=":orderId" element={<OrderDetail />} />
            </Route>
            <Route path="seller" element={<Outlet />}>
              <Route path="orders" element={<ManageOrdersPage />} />
              <Route path="order/:orderId" element={<ManageOrderPage />} />
            </Route>
            <Route path="settings" element={<MyProfile />} />
          </Route>
          <Route path="/services" element={<Services />} />
          <Route path="/" element={<Home />} />
          <Route path="/rental" element={<RentalLayout />}>
            <Route path="" element={<FarmEquipmentRentals />} />
            <Route path=":equipmentId" element={<EquipmentDetail />} />
            <Route path="order/:orderId" element={<RentalOrderPage />} />
          </Route>
          <Route path="/shop" element={<ShopLayout />}>
            <Route path="" element={<CropsListing />} />
            <Route path=":cropId" element={<CropDetail />} />
            <Route path="order/:orderId" element={<OrderPage />} />
          </Route>
          <Route path="/chatbot" element={<ChatPage />} />
          <Route
            path="/planting-calculator"
            element={<PlantingCalendarPage />}
          />
          <Route path="/order/:orderId" element={<OrderPage />} />
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
