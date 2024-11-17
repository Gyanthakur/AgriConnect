import React from 'react';

const Home = ({isDarkMode}) => {
  return (
    
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      <hr className='border-spacing-1' />
      {/* Main Heading */}
      <header className="text-center py-16">
        <h1 className="text-5xl font-extrabold leading-normal text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-400">
          Welcome to Agriconnect
        </h1>
        <p className="mt-4 text-lg max-w-xl mx-auto">
          Your trusted platform for connecting farmers, suppliers, and agricultural enthusiasts with the latest tools, resources, and innovations in the agriculture industry.
        </p>
      </header>

      {/* Services Section */}
      <section className={`py-12 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-6">Our Services</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className={`max-w-xs p-6 ${isDarkMode ? 'bg-gray-700' : 'bg-green-100'} rounded-lg shadow-md`}>
              <h3 className="text-xl font-bold">Crop Management</h3>
              <p className="mt-2">Tools and resources to help you manage and track crop growth efficiently.</p>
            </div>
            <div className={`max-w-xs p-6 ${isDarkMode ? 'bg-gray-700' : 'bg-green-100'} rounded-lg shadow-md`}>
              <h3 className="text-xl font-bold">Market Prices</h3>
              <p className="mt-2">Stay updated with the latest market prices to make informed selling decisions.</p>
            </div>
            <div className={`max-w-xs p-6 ${isDarkMode ? 'bg-gray-700' : 'bg-green-100'} rounded-lg shadow-md`}>
              <h3 className="text-xl font-bold">Weather Forecasting</h3>
              <p className="mt-2">Get accurate weather forecasts to plan your farming activities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-12 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-6">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className={`p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-green-50'} rounded-lg shadow-md`}>
              <h3 className="text-xl font-bold">Farmer Community</h3>
              <p className="mt-2">Connect with other farmers to share experiences, knowledge, and resources.</p>
            </div>
            <div className={`p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-green-50'} rounded-lg shadow-md`}>
              <h3 className="text-xl font-bold">Agricultural News</h3>
              <p className="mt-2">Get the latest news and updates in the agriculture sector.</p>
            </div>
            <div className={`p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-green-50'} rounded-lg shadow-md`}>
              <h3 className="text-xl font-bold">Resource Library</h3>
              <p className="mt-2">Access a wide range of resources, including tutorials and guides.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className={`py-12 m-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'}` }>
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-6">Contact Us</h2>
          <p className="mb-6">Have any questions? Reach out to us!</p>
          <a href="/contact-us" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg">
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
