import React from 'react';
import { Link } from 'react-router-dom';

const About = ({isDarkMode}) => {
  return (
    <div className={`min-h-screen  ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      <hr />
      <div className="container mx-auto py-16 px-6">
        {/* Main Heading */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold leading-normal text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-400">
            About Agriconnect
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg">
            Agriconnect is your go-to digital platform designed to revolutionize agriculture. With cutting-edge tools, a supportive community, and resources at your fingertips, we help you cultivate, connect, and thrive in the modern agricultural world.
          </p>
        </header>

        {/* Our Mission Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-green-600">Our Mission</h2>
          <p className="text-lg">
            At Agriconnect, our mission is to use technology to empower farmers, suppliers, and agriculture enthusiasts. We aim to bridge the gap between traditional agriculture and modern technology, offering support, resources, and a community that promotes sustainable farming and economic growth.
          </p>
          <p className="text-lg mt-4">
            We believe that every farmer should have access to the knowledge and tools needed to succeed in today’s fast-evolving agricultural landscape. By connecting individuals and sharing information, we work to make farming more efficient, profitable, and environmentally friendly.
          </p>
        </section>

        {/* Key Features Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-green-600">Key Features</h2>
          <ul className="list-disc list-inside space-y-4 text-lg">
            <li><strong>Crop Management Tools:</strong> Track crop growth stages, monitor soil health, and improve crop yield with precision agriculture tools.</li>
            <li><strong>Market Insights:</strong> Get real-time market prices to make informed sales decisions, ensuring you get the best value for your produce.</li>
            <li><strong>Weather Forecasting:</strong> Plan your farming activities with our reliable, location-based weather forecasts.</li>
            <li><strong>Farmer Community:</strong> Connect, share experiences, and find support from other farmers within our global community.</li>
            <li><strong>Resource Library:</strong> Access our extensive collection of articles, video tutorials, and research papers on the latest agricultural practices and innovations.</li>
          </ul>
        </section>

        {/* Benefits Section with Links */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-green-600">Why Choose Agriconnect?</h2>
          <p className="text-lg">
            Agriconnect is designed to help you maximize productivity, enhance sustainability, and stay connected with the agriculture community. Here are some of the top benefits of using Agriconnect:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            <div className={`p-6  rounded-lg shadow-md ${isDarkMode ? 'bg-gray-700' : 'bg-green-50'} `}>
              <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-black' : ''}`}>Easy Access to Information</h3>
              <p>
                Stay updated with the latest market prices, tips on crop health, and daily weather updates, all available in one place.
              </p>
              <Link
                to="/information-resources"
                
                rel="noopener noreferrer"
                className={`  underline ${isDarkMode? 'hover:text-green-500 text-green-300' : 'text-green-500 hover:text-green-700'}`}
              >
                Explore Information Resources
              </Link>
            </div>
            <div className={`p-6  rounded-lg shadow-md ${isDarkMode ? 'bg-gray-700' : 'bg-green-50'} `}>
              <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-black' : ''}`}>Community Support</h3>
              <p>
                Join a community of farmers, agronomists, and agriculture enthusiasts where you can share knowledge, get advice, and find inspiration.
              </p>
              <Link
                to="/community-support"
                
                rel="noopener noreferrer"
                className={`  underline ${isDarkMode? 'hover:text-green-500 text-green-300' : 'text-green-500 hover:text-green-700'}`}
              >
                Join the Community
              </Link>
            </div>
            <div className={`p-6  rounded-lg shadow-md ${isDarkMode ? 'bg-gray-700' : 'bg-green-50'} `}>
              <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-black' : ''}`}>Sustainable Farming</h3>
              <p>
                Discover sustainable farming methods that enhance productivity while protecting natural resources. Learn how to adopt eco-friendly practices and contribute to a healthier planet.
              </p>
              <Link
                to="/sustainable-farming"
                
                rel="noopener noreferrer"
                className={`  underline ${isDarkMode? 'hover:text-green-500 text-green-300' : 'text-green-500 hover:text-green-700'}`}
              >
                Learn About Sustainability
              </Link>
            </div>
            <div className={`p-6  rounded-lg shadow-md ${isDarkMode ? 'bg-gray-700' : 'bg-green-50'} `}>
              <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-black' : ''}`}>Latest News & Trends</h3>
              <p>
                Stay informed on the latest agricultural trends, technologies, and policies affecting the industry. Gain insights to stay ahead in your field.
              </p>
              <Link
                to="/news"
                rel="noopener noreferrer"
                className={`  underline ${isDarkMode? 'hover:text-green-500 text-green-300' : 'text-green-500 hover:text-green-700'}`}
              >
                Read Latest News
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section className="text-center mt-16">
          <h2 className="text-3xl font-semibold mb-4 text-green-600">Get In Touch</h2>
          <p className="text-lg max-w-2xl mx-auto mb-6">
            Have questions or want to learn more about Agriconnect? We're here to help. Reach out to us through our contact page, and let us know how we can assist you.
          </p>
          <Link
            to="/contact-us"
            
            rel="noopener noreferrer"
            className={`  underline ${isDarkMode? 'hover:text-green-500 text-green-300' : 'text-green-500 hover:text-green-700'}`}
          >
            Contact Us
          </Link>
        </section>
      </div>
    </div>
  );
};

export default About;
