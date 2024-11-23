import React from 'react'
import  { useState, useEffect } from 'react';
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Login from './pages/Login'
import Signup from './pages/Signup'
import InformationResources from './components/InformationRresources'
import CommunitySupport from './components/CommunitySupport'
import ErrorPage from './pages/ErrorPage'
import Contact from './pages/Contact'
import Footer from './components/Footer'
import SustainableFarming from './components/SustainableFarming'
import LiveAgriNews from './components/LiveAgriNews'
import MarketPrice from './components/MarketPrice'

import MerchantLogin from './pages/MerchantLogin';
import MerchantDashboard from './components/MerchantDashboard';
import FarmerDashboard from './components/FarmerDashboard';
import FarmerLogin from './pages/FarmerLogin';
import FarmerSignup from './pages/FarmerSignup';
import MerchantSignup from './pages/MerchantSignup';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle dark mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  // Ensure theme is in light mode on first load
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme}/>
      <Routes>
        <Route path='/' element={<Home isDarkMode={isDarkMode}/>} />
        <Route path='/about-us' element={<About isDarkMode = {isDarkMode}/>} />
        <Route path='/services' element={<Services isDarkMode={isDarkMode} />} />
        <Route path='/contact-us' element={<Contact isDarkMode={isDarkMode}/>} />
        {/* <Route path='/login' element={<Login/>} /> */}
        {/* <Route path='/sign-up' element={<Signup/>} /> */}
        <Route path='/information-resources' element={<InformationResources isDarkMode={isDarkMode}/>} />
        <Route path='/community-support' element={<CommunitySupport isDarkMode={isDarkMode}/>} />
        <Route path='/sustainable-farming' element={<SustainableFarming isDarkMode={isDarkMode}/>} />
        <Route path='/news' element={<LiveAgriNews isDarkMode = {isDarkMode} />} />
        <Route path='/market-price' element={<MarketPrice isDarkMode={isDarkMode}/>} />
        <Route path='/farmer-login' element={<FarmerLogin isDarkMode={isDarkMode}/>} />
        <Route path='/farmer-signup' element={<FarmerSignup isDarkMode={isDarkMode}/>} />

        <Route path='/farmer-dashboard' element={<FarmerDashboard isDarkMode={isDarkMode}/>} />
        <Route path='/merchant-login' element={<MerchantLogin isDarkMode={isDarkMode}/>} />
        <Route path='/merchant-signup' element={<MerchantSignup isDarkMode={isDarkMode}/>} />
        <Route path='/merchant-dashboard' element={<MerchantDashboard isDarkMode={isDarkMode}/>} />
        
        

        

        <Route path="*" element={<ErrorPage />} />

      </Routes>
      <Footer isDarkMode = {isDarkMode} />
    </div>
  )
}

export default App
