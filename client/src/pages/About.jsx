import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="max-w-5xl min-h-screen mx-auto text-gray-800 dark:text-white">
      <hr />
      <div className="container px-6 py-32 mx-auto">
        {/* Main Heading */}
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold leading-normal text-green-600 dark:text-green-500 ">
            About Agriconnect
          </h1>
          <p className="max-w-3xl mx-auto mt-4 text-lg text-justify md:text-center text-zinc-500 dark:text-zinc-400">
            Agriconnect is your go-to digital platform designed to revolutionize
            agriculture. With cutting-edge tools, a supportive community, and
            resources at your fingertips, we help you cultivate, connect, and
            thrive in the modern agricultural world.
          </p>
        </header>

        {/* Our Mission Section */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-semibold text-green-600">
            Our Mission
          </h2>
          <p className="text-lg text-justify">
            At Agriconnect, our mission is to use technology to empower farmers,
            suppliers, and agriculture enthusiasts. We aim to bridge the gap
            between traditional agriculture and modern technology, offering
            support, resources, and a community that promotes sustainable
            farming and economic growth.
          </p>
          <p className="mt-4 text-lg text-justify">
            We believe that every farmer should have access to the knowledge and
            tools needed to succeed in today's fast-evolving agricultural
            landscape. By connecting individuals and sharing information, we
            work to make farming more efficient, profitable, and environmentally
            friendly.
          </p>
        </section>

        {/* Key Features Section */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-semibold text-green-600">
            Key Features
          </h2>
          <ul className="space-y-4 text-lg list-disc list-inside">
            <li>
              <strong>Crop Management Tools:</strong> Track crop growth stages,
              monitor soil health, and improve crop yield with precision
              agriculture tools.
            </li>
            <li>
              <strong>Market Insights:</strong> Get real-time market prices to
              make informed sales decisions, ensuring you get the best value for
              your produce.
            </li>
            <li>
              <strong>Weather Forecasting:</strong> Plan your farming activities
              with our reliable, location-based weather forecasts.
            </li>
            <li>
              <strong>Farmer Community:</strong> Connect, share experiences, and
              find support from other farmers within our global community.
            </li>
            <li>
              <strong>Resource Library:</strong> Access our extensive collection
              of articles, video tutorials, and research papers on the latest
              agricultural practices and innovations.
            </li>
          </ul>
        </section>

        {/* Benefits Section with Links */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-semibold text-green-600">
            Why Choose Agriconnect?
          </h2>
          <p className="text-lg text-justify">
            Agriconnect is designed to help you maximize productivity, enhance
            sustainability, and stay connected with the agriculture community.
            Here are some of the top benefits of using Agriconnect:
          </p>
          <div className="grid grid-cols-1 gap-6 mt-10 md:grid-cols-2">
            {/* Card 1 */}
            <div className="overflow-hidden transition-all duration-300 border border-gray-100 rounded-lg shadow-sm hover:shadow-md dark:border-gray-700 dark:bg-zinc-800 group">
              <div className="p-4">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center w-10 h-10 mr-4 text-white bg-green-500 rounded-full shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold dark:text-white">
                    Easy Access to Information
                  </h3>
                </div>
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                  Stay updated with the latest market prices, tips on crop
                  health, and daily weather updates, all available in one place.
                </p>
                <Link
                  to="/information-resources"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-green-500 transition-colors hover:text-green-600 dark:text-green-400 dark:hover:text-green-300"
                >
                  Explore Information Resources
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="overflow-hidden transition-all duration-300 border border-gray-100 rounded-lg shadow-sm hover:shadow-md dark:border-gray-700 dark:bg-zinc-800 group">
              <div className="p-4">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center w-10 h-10 mr-4 text-white bg-green-500 rounded-full shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold dark:text-white">
                    Community Support
                  </h3>
                </div>
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                  Join a community of farmers, agronomists, and agriculture
                  enthusiasts where you can share knowledge, get advice, and
                  find inspiration.
                </p>
                <Link
                  to="/community-support"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-green-500 transition-colors hover:text-green-600 dark:text-green-400 dark:hover:text-green-300"
                >
                  Join the Community
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Card 3 */}
            <div className="overflow-hidden transition-all duration-300 border border-gray-100 rounded-lg shadow-sm hover:shadow-md dark:border-gray-700 dark:bg-zinc-800 group">
              <div className="p-4">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center w-10 h-10 mr-4 text-white bg-green-500 rounded-full shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold dark:text-white">
                    Sustainable Farming
                  </h3>
                </div>
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                  Discover sustainable farming methods that enhance productivity
                  while protecting natural resources. Learn how to adopt
                  eco-friendly practices and contribute to a healthier planet.
                </p>
                <Link
                  to="/sustainable-farming"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-green-500 transition-colors hover:text-green-600 dark:text-green-400 dark:hover:text-green-300"
                >
                  Learn About Sustainability
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Card 4 */}
            <div className="overflow-hidden transition-all duration-300 border border-gray-100 rounded-lg shadow-sm hover:shadow-md dark:border-gray-700 dark:bg-zinc-800 group">
              <div className="p-4">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center w-10 h-10 mr-4 text-white bg-green-500 rounded-full shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold dark:text-white">
                    Latest News & Trends
                  </h3>
                </div>
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                  Stay informed on the latest agricultural trends, technologies,
                  and policies affecting the industry. Gain insights to stay
                  ahead in your field.
                </p>
                <Link
                  to="/news"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-green-500 transition-colors hover:text-green-600 dark:text-green-400 dark:hover:text-green-300"
                >
                  Read Latest News
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section className="mt-16 text-center">
          <h2 className="mb-4 text-3xl font-semibold text-green-600">
            Get In Touch
          </h2>
          <p className="max-w-2xl mx-auto mb-6 text-lg">
            Have questions or want to learn more about Agriconnect? We're here
            to help. Reach out to us through our contact page, and let us know
            how we can assist you.
          </p>
          <Link
            to="/contact-us"
            rel="noopener noreferrer"
            className="text-green-500 underline hover:text-green-700 dark:text-green-300 dark:hover:text-green-500"
          >
            Contact Us
          </Link>
        </section>
      </div>
    </div>
  );
};

export default About;
