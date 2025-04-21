import React from "react";

const CommunitySupport = () => {
  // Expert data array for easier management and expansion
  const experts = [
    {
      name: "Dr. Anil Kumar",
      expertise:
        "Soil and Crop Scientist with over 20 years of experience in sustainable agriculture and organic fertilization methods.",
      specialty: "Soil Health",
    },
    {
      name: "Ms. Priya Sharma",
      expertise:
        "Specialist in organic farming and integrated pest management techniques with focus on reducing chemical inputs.",
      specialty: "Organic Farming",
    },
    {
      name: "Mr. Rakesh Singh",
      expertise:
        "Agronomist and irrigation expert known for innovative water management solutions and drought-resistant farming.",
      specialty: "Water Management",
    },
    {
      name: "Dr. Lakshmi Narayanan",
      expertise:
        "Agricultural economist specializing in market trends and helping farmers maximize profits through strategic crop selection.",
      specialty: "Agricultural Economics",
    },
    {
      name: "Mrs. Anjali Deshmukh",
      expertise:
        "Expert in post-harvest technology and food processing who helps farmers reduce waste and add value to their produce.",
      specialty: "Post-Harvest",
    },
    {
      name: "Mr. Vikram Patel",
      expertise:
        "Specialist in agricultural technology integration and precision farming using IoT sensors and data analytics.",
      specialty: "Agri-Tech",
    },
    {
      name: "Dr. Sunita Reddy",
      expertise:
        "Plant pathologist with extensive knowledge of disease management in tropical and subtropical crops.",
      specialty: "Plant Health",
    },
    {
      name: "Mr. Harpreet Singh",
      expertise:
        "Expert in sustainable livestock management and integration of animal husbandry with crop farming systems.",
      specialty: "Livestock",
    },
    {
      name: "Prof. Rajiv Malhotra",
      expertise:
        "Agricultural education specialist focused on training the next generation of farmers in modern sustainable practices.",
      specialty: "Education",
    },
    {
      name: "Prof. Sanjeev Singh",
      expertise:
        "Agricultural education specialist focused on training the next generation of farmers in modern sustainable practices.",
      specialty: "Education",
    },
  ];

  const getSpecialtyIcon = (specialty) => {
    switch (specialty) {
      case "Soil Health":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        );
      case "Organic Farming":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
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
        );
      case "Water Management":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
        );
      case "Agricultural Economics":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "Post-Harvest":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        );
      case "Agri-Tech":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
            />
          </svg>
        );
      case "Plant Health":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
        );
      case "Livestock":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        );
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        );
    }
  };

  return (
    <div className="max-w-6xl min-h-screen mx-auto text-gray-800 dark:text-gray-100">
      <div className="container px-6 py-16 mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-green-600 dark:text-green-400">
            Community Support
          </h1>
          <p className="max-w-2xl mx-auto mt-4 text-lg">
            Connect with a network of experienced farmers, agricultural experts,
            and supportive communities to share knowledge, get answers, and grow
            together.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-semibold text-green-600 dark:text-green-400">
            Connect with Experts
          </h2>
          <p className="mb-6 text-lg">
            Reach out to agricultural experts for advice on crop health, soil
            management, and best practices. Get insights to improve your farm's
            productivity.
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full dark:bg-green-900 dark:text-green-300">
              All Experts
            </span>
            <span className="px-3 py-1 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-full cursor-pointer dark:bg-gray-800 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900">
              Soil Health
            </span>
            <span className="px-3 py-1 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-full cursor-pointer dark:bg-gray-800 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900">
              Water Management
            </span>
            <span className="px-3 py-1 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-full cursor-pointer dark:bg-gray-800 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900">
              Organic Farming
            </span>
            <span className="px-3 py-1 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-full cursor-pointer dark:bg-gray-800 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900">
              Agri-Tech
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {experts.map((expert, index) => (
              <div
                key={index}
                className="p-4 transition-all duration-300 bg-gray-100 border border-gray-100 rounded-lg shadow-sm dark:border-gray-700 dark:bg-zinc-800 hover:shadow-md"
              >
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center w-12 h-12 mr-4 text-green-600 bg-green-100 rounded-full dark:bg-green-900 dark:text-green-300">
                    {getSpecialtyIcon(expert.specialty)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{expert.name}</h3>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      {expert.specialty}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {expert.expertise}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <button className="flex items-center font-medium text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300">
                    Connect
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
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </button>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Available now
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* View More Button */}
        <div className="mt-8 mb-16 text-center">
          <button className="px-6 py-3 font-medium text-white transition-colors bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
            View All Experts
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunitySupport;
