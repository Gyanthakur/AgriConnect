import React from 'react'
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
const App = () => {
  return (
    <div className='min-h-screen bg-green-100'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about-us' element={<About/>} />
        <Route path='/services' element={<Services/>} />
        <Route path='/contact-us' element={<Contact/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/sign-up' element={<Signup/>} />
        <Route path='/information-resources' element={<InformationResources/>} />
        <Route path='/community-support' element={<CommunitySupport/>} />
        <Route path='/sustainable-farming' element={<SustainableFarming/>} />
        <Route path='/news' element={<LiveAgriNews/>} />
        <Route path='/market-price' element={<MarketPrice/>} />
        
        

        

        <Route path="*" element={<ErrorPage />} />

      </Routes>
      <Footer/>
    </div>
  )
}

export default App
