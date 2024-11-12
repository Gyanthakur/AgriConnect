import React from 'react';

const CommunitySupport = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="container mx-auto py-16 px-6">
        
        {/* Page Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-400">
            Community Support
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg">
            Connect with a network of experienced farmers, agricultural experts, and supportive communities to share knowledge, get answers, and grow together.
          </p>
        </header>

        {/* Connect with Experts Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-green-600">Connect with Experts</h2>
          <p className="text-lg mb-4">
            Reach out to agricultural experts for advice on crop health, soil management, and best practices. Get insights to improve your farm’s productivity.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-green-50 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">Dr. Anil Kumar</h3>
              <p>Soil and Crop Scientist with over 20 years of experience in sustainable agriculture.</p>
            </div>
            <div className="p-6 bg-green-50 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">Ms. Priya Sharma</h3>
              <p>Specialist in organic farming and pest control techniques.</p>
            </div>
            <div className="p-6 bg-green-50 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">Mr. Rakesh Singh</h3>
              <p>Agronomist and irrigation expert known for innovative water management solutions.</p>
            </div>
          </div>
        </section>

        {/* Farmer Forum Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-green-600">Farmer Forum</h2>
          <p className="text-lg mb-4">
            Join discussions on our forum to ask questions, share experiences, and exchange knowledge with fellow farmers from around the world.
          </p>
          <a
            href="/forum"
            
            rel="noopener noreferrer"
            className="text-green-500 hover:text-green-700 underline text-lg"
          >
            Visit the Agriconnect Forum
          </a>
        </section>

        {/* Success Stories Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-green-600">Success Stories</h2>
          <p className="text-lg mb-4">
            Get inspired by real-life success stories from farmers who have overcome challenges and achieved remarkable results.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-green-50 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">Farmer Rajesh's Story</h3>
              <p>Learn how Rajesh improved crop yield by adopting organic methods and water-saving techniques.</p>
            </div>
            <div className="p-6 bg-green-50 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">Priya's Organic Success</h3>
              <p>Priya transformed her farm using organic fertilizers and sustainable practices, leading to a 30% increase in produce.</p>
            </div>
          </div>
        </section>

        {/* Resource Links Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-green-600">Resource Links</h2>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li>
              <a
                href="/guide-to-organic-farming"
                
                rel="noopener noreferrer"
                className="text-green-500 hover:text-green-700 underline"
              >
                Guide to Organic Farming
              </a>: A comprehensive guide on organic farming practices for sustainable growth.
            </li>
            <li>
              <a
                href="/soil-health-tips"
                
                rel="noopener noreferrer"
                className="text-green-500 hover:text-green-700 underline"
              >
                Soil Health Tips
              </a>: Tips and techniques for maintaining healthy, fertile soil.
            </li>
            <li>
              <a
                href="/climate-smart-agriculture"
                
                rel="noopener noreferrer"
                className="text-green-500 hover:text-green-700 underline"
              >
                Climate-Smart Agriculture
              </a>: Learn how to adapt farming practices to changing climate conditions.
            </li>
          </ul>
        </section>

        {/* Contact Support Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-green-600">Contact Support</h2>
          <p className="text-lg mb-4">
            Need assistance? Our support team is here to help with any questions or technical issues you may have.
          </p>
          <a
            href="mailto:support@agriconnect.com"
            className="text-green-500 hover:text-green-700 underline text-lg"
          >
            support@agriconnect.com
          </a>
        </section>
      </div>
    </div>
  );
};

export default CommunitySupport;
