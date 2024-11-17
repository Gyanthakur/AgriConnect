import React from 'react';

const CommunitySupport = ({ isDarkMode }) => {
  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'
      }`}
    >
      <hr />
      <div className="container mx-auto py-16 px-6">
        {/* Page Header */}
        <header className="text-center mb-12">
          <h1
            className={`text-4xl font-extrabold text-transparent bg-clip-text ${
              isDarkMode
                ? 'bg-gradient-to-r from-green-300 to-teal-200'
                : 'bg-gradient-to-r from-green-500 to-teal-400'
            }`}
          >
            Community Support
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg">
            Connect with a network of experienced farmers, agricultural experts,
            and supportive communities to share knowledge, get answers, and grow
            together.
          </p>
        </header>

        {/* Connect with Experts Section */}
        <section className="mb-12">
          <h2
            className={`text-3xl font-semibold mb-4 ${
              isDarkMode ? 'text-green-400' : 'text-green-600'
            }`}
          >
            Connect with Experts
          </h2>
          <p className="text-lg mb-4">
            Reach out to agricultural experts for advice on crop health, soil
            management, and best practices. Get insights to improve your farm’s
            productivity.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              className={`p-6 rounded-lg shadow-md ${
                isDarkMode ? 'bg-gray-800' : 'bg-green-50'
              }`}
            >
              <h3 className="text-xl font-bold">Dr. Anil Kumar</h3>
              <p>
                Soil and Crop Scientist with over 20 years of experience in
                sustainable agriculture.
              </p>
            </div>
            <div
              className={`p-6 rounded-lg shadow-md ${
                isDarkMode ? 'bg-gray-800' : 'bg-green-50'
              }`}
            >
              <h3 className="text-xl font-bold">Ms. Priya Sharma</h3>
              <p>
                Specialist in organic farming and pest control techniques.
              </p>
            </div>
            <div
              className={`p-6 rounded-lg shadow-md ${
                isDarkMode ? 'bg-gray-800' : 'bg-green-50'
              }`}
            >
              <h3 className="text-xl font-bold">Mr. Rakesh Singh</h3>
              <p>
                Agronomist and irrigation expert known for innovative water
                management solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Similar updates for other sections */}
        {/* Each section adjusts the background and text colors based on `isDarkMode` */}
      </div>
    </div>
  );
};

export default CommunitySupport;
