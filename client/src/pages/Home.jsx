import React from "react";
import {
  SunIcon,
  CloudRainIcon,
  LeafIcon,
  UsersIcon,
  NewspaperIcon,
  BookOpenIcon,
  MapPinIcon,
  PhoneIcon,
  CalendarIcon,
  TrendingUpIcon,
  BarChartIcon,
  SettingsIcon,
  SendIcon,
  ShieldIcon,
  DropletIcon,
  HelpCircleIcon,
  GlobeIcon,
  ClockIcon,
  WalletIcon,
  TractorIcon,
  CloudIcon,
  PlaneTakeoffIcon,
} from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen text-gray-800 bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800 dark:text-white">
      {/* Hero Section */}
      <header className="relative py-20 overflow-hidden md:py-32">
        <div className="absolute inset-0 -z-10 opacity-20 dark:opacity-10">
          <div className="absolute inset-0 bg-[url('/api/placeholder/1400/800')] bg-cover bg-center"></div>
        </div>
        <div className="container px-6 mx-auto text-center">
          <h1 className="text-5xl font-extrabold leading-normal text-transparent md:text-6xl bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500 dark:from-green-400 dark:to-teal-300">
            Agriconnect
          </h1>
          <p className="max-w-2xl mx-auto mt-6 text-lg font-medium text-gray-700 md:text-xl dark:text-gray-300">
            Your complete agriculture management platform for modern farmers
            seeking sustainable growth and professional support
          </p>

          <div className="inline-block px-6 py-4 mt-8 rounded-lg shadow-md bg-white/80 dark:bg-gray-800/80">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Trusted by over 50,000+ farmers across 30+ countries
            </p>
          </div>
        </div>
      </header>

      {/* Alert Banner */}
      <div className="bg-amber-50 dark:bg-amber-900/30 border-y border-amber-200 dark:border-amber-700">
        <div className="container flex flex-col items-center justify-between px-6 py-3 mx-auto md:flex-row">
          <div className="flex items-center">
            <CalendarIcon className="w-5 h-5 mr-2 text-amber-600 dark:text-amber-400" />
            <p className="font-medium text-amber-800 dark:text-amber-300">
              Spring Planting Workshop: Join our experts on April 15th
            </p>
          </div>
          <a
            href="#"
            className="mt-2 font-medium md:mt-0 text-amber-800 dark:text-amber-300 hover:underline"
          >
            Register Now →
          </a>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container px-6 mx-auto">
          <div className="mb-12 text-center">
            <h2 className="relative inline-block text-3xl font-bold">
              <span className="relative z-10">Our Services</span>
              <span className="absolute left-0 w-full h-3 bg-green-200 bottom-1 dark:bg-green-900 -z-10 opacity-60"></span>
            </h2>
            <p className="max-w-2xl mx-auto mt-4 text-gray-600 dark:text-gray-300">
              Complete agricultural solutions to help farmers thrive in every
              aspect of their operations
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 transition-all duration-300 shadow-lg bg-green-50 dark:bg-gray-700 rounded-xl hover:shadow-xl hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <CloudIcon className="w-10 h-10 mr-3 text-green-600 dark:text-green-400" />
                <h3 className="text-xl font-bold">Weather Insights</h3>
              </div>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Access real-time weather forecasts and updates tailored to your
                region, helping you plan farming activities.
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mt-0.5 mr-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-600 dark:bg-green-400"></div>
                  </div>
                  7-day forecast for your fields
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mt-0.5 mr-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-600 dark:bg-green-400"></div>
                  </div>
                  Extreme weather alerts
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mt-0.5 mr-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-600 dark:bg-green-400"></div>
                  </div>
                  Seasonal climate predictions
                </li>
              </ul>
              <div className="mt-6">
                <a
                  href="#"
                  className="font-medium text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
                >
                  View weather updates
                </a>
              </div>
            </div>
            <div className="p-6 transition-all duration-300 shadow-lg bg-green-50 dark:bg-gray-700 rounded-xl hover:shadow-xl hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <TractorIcon className="w-10 h-10 mr-3 text-green-600 dark:text-green-400" />
                <h3 className="text-xl font-bold">Farm Equipment Rentals</h3>
              </div>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Easily rent the latest farming equipment without the cost of
                ownership, available near your area.
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mt-0.5 mr-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-600 dark:bg-green-400"></div>
                  </div>
                  Wide range of modern equipment
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mt-0.5 mr-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-600 dark:bg-green-400"></div>
                  </div>
                  Flexible rental periods
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mt-0.5 mr-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-600 dark:bg-green-400"></div>
                  </div>
                  Technical support included
                </li>
              </ul>
              <div className="mt-6">
                <a
                  href="#"
                  className="font-medium text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
                >
                  Browse equipment
                </a>
              </div>
            </div>
            <div className="p-6 transition-all duration-300 shadow-lg bg-green-50 dark:bg-gray-700 rounded-xl hover:shadow-xl hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <NewspaperIcon className="w-10 h-10 mr-3 text-green-600 dark:text-green-400" />
                <h3 className="text-xl font-bold">Agritech News</h3>
              </div>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Stay updated on the latest technological advancements, industry
                trends, and innovations in agriculture.
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mt-0.5 mr-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-600 dark:bg-green-400"></div>
                  </div>
                  Daily industry updates
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mt-0.5 mr-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-600 dark:bg-green-400"></div>
                  </div>
                  Innovation spotlights
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mt-0.5 mr-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-600 dark:bg-green-400"></div>
                  </div>
                  Expert analysis and insights
                </li>
              </ul>
              <div className="mt-6">
                <a
                  href="#"
                  className="font-medium text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
                >
                  Read more
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 text-center">
            <a
              href="/services"
              className="inline-flex items-center font-semibold text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
            >
              View All Services
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-16 overflow-hidden bg-green-50 dark:bg-gray-800">
        <div className="container px-6 mx-auto">
          <div className="flex flex-col items-center lg:flex-row">
            <div className="mb-12 lg:w-1/2 lg:pr-12 lg:mb-0">
              <h2 className="mb-6 text-3xl font-bold">
                Professional Dashboard
              </h2>
              <p className="mb-6 text-gray-600 dark:text-gray-300">
                Our comprehensive farm management dashboard gives you a complete
                overview of your operation in one place, with real-time
                analytics and actionable insights.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mt-0.5 mr-3">
                    <TrendingUpIcon className="w-3 h-3 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Real-time Monitoring</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Track field conditions, equipment status, and crop health
                      in real time
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mt-0.5 mr-3">
                    <BarChartIcon className="w-3 h-3 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Financial Analytics</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Comprehensive financial reports, expense tracking, and
                      profit forecasting
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mt-0.5 mr-3">
                    <ClockIcon className="w-3 h-3 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Task Management</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Organize work schedules, assign tasks, and track
                      completion status
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative lg:w-1/2">
              <div className="p-2 transform scale-105 bg-gray-100 shadow-2xl dark:bg-gray-700 rounded-xl rotate-1">
                <div className="p-4 bg-white rounded-lg shadow-inner dark:bg-gray-800">
                  <div className="w-full h-64 bg-[url('/dashboard.png')] bg-cover bg-center rounded-lg"></div>
                </div>
              </div>
              <div className="absolute p-4 bg-green-100 rounded-lg shadow-lg -bottom-6 -left-6 dark:bg-green-900">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-10 h-10 text-white bg-green-600 rounded-full">
                    <TrendingUpIcon className="w-5 h-5" />
                  </div>
                  <div className="ml-3">
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      Crop Yield Forecast
                    </p>
                    <p className="font-bold text-green-600 dark:text-green-400">
                      ↑ 12% vs. Last Season
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Support */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container px-6 mx-auto">
          <div className="mb-12 text-center">
            <h2 className="relative inline-block text-3xl font-bold">
              <span className="relative z-10">Expert Support</span>
              <span className="absolute left-0 w-full h-3 bg-green-200 bottom-1 dark:bg-green-900 -z-10 opacity-60"></span>
            </h2>
            <p className="max-w-2xl mx-auto mt-4 text-gray-600 dark:text-gray-300">
              Get personalized guidance from certified agricultural specialists
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="p-6 bg-white shadow-lg dark:bg-gray-800 rounded-xl">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full dark:bg-green-900">
                <HelpCircleIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="mb-4 text-xl font-bold text-center">
                24/7 Support
              </h3>
              <p className="mb-4 text-center text-gray-600 dark:text-gray-300">
                Round-the-clock assistance for urgent farming issues and
                questions.
              </p>
              <div className="mt-6 text-center">
                <a
                  href="#"
                  className="inline-flex items-center justify-center w-full px-4 py-3 font-medium text-green-600 transition border border-green-600 rounded-lg dark:border-green-500 dark:text-green-400 hover:bg-green-600 hover:text-white dark:hover:bg-green-600"
                >
                  <PhoneIcon className="w-4 h-4 mr-2" />
                  Contact Support
                </a>
              </div>
            </div>
            <div className="p-6 bg-white shadow-lg dark:bg-gray-800 rounded-xl">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full dark:bg-green-900">
                <UsersIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="mb-4 text-xl font-bold text-center">
                Agronomist Consultation
              </h3>
              <p className="mb-4 text-center text-gray-600 dark:text-gray-300">
                Schedule one-on-one consultations with certified agricultural
                specialists.
              </p>
              <div className="mt-6 text-center">
                <a
                  href="#"
                  className="inline-flex items-center justify-center w-full px-4 py-3 font-medium text-green-600 transition border border-green-600 rounded-lg dark:border-green-500 dark:text-green-400 hover:bg-green-600 hover:text-white dark:hover:bg-green-600"
                >
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Book Session
                </a>
              </div>
            </div>
            <div className="p-6 bg-white shadow-lg dark:bg-gray-800 rounded-xl">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full dark:bg-green-900">
                <GlobeIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="mb-4 text-xl font-bold text-center">
                Knowledge Base
              </h3>
              <p className="mb-4 text-center text-gray-600 dark:text-gray-300">
                Chat with our AI-powered chatbot for instant answers to your
                farming questions
              </p>
              <div className="mt-6 text-center">
                <a
                  href="/chatbot"
                  className="inline-flex items-center justify-center w-full px-4 py-3 font-medium text-green-600 transition border border-green-600 rounded-lg dark:border-green-500 dark:text-green-400 hover:bg-green-600 hover:text-white dark:hover:bg-green-600"
                >
                  <BookOpenIcon className="w-4 h-4 mr-2" />
                  Chat with Bot
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-green-50 dark:bg-gray-800">
        <div className="container px-6 mx-auto">
          <div className="mb-12 text-center">
            <h2 className="relative inline-block text-3xl font-bold">
              <span className="relative z-10">Farmer Success Stories</span>
              <span className="absolute left-0 w-full h-3 bg-green-200 bottom-1 dark:bg-green-900 -z-10 opacity-60"></span>
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="p-6 shadow-lg bg-green-50 dark:bg-gray-700 rounded-xl">
              <p className="mb-4 italic text-gray-600 dark:text-gray-300">
                "Agriconnect has transformed the way I manage my farm. The crop
                monitoring tools helped me increase my yield by 30% while using
                fewer resources."
              </p>
              <div className="flex items-center">
                <div className="flex items-center justify-center w-12 h-12 mr-4 font-bold text-green-800 bg-green-200 rounded-full dark:bg-green-800 dark:text-green-200">
                  RS
                </div>
                <div>
                  <h4 className="font-semibold">Rajeev Singh</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Organic Vegetables Seller, UP
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 shadow-lg bg-green-50 dark:bg-gray-700 rounded-xl">
              <p className="mb-4 italic text-gray-600 dark:text-gray-300">
                "The market access feature connected me directly with organic
                food distributors, eliminating middlemen and increasing my
                profits substantially."
              </p>
              <div className="flex items-center">
                <div className="flex items-center justify-center w-12 h-12 mr-4 font-bold text-green-800 bg-green-200 rounded-full dark:bg-green-800 dark:text-green-200">
                  HS
                </div>
                <div>
                  <h4 className="font-semibold">Harman Singh</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Wheat Seller, Punjab
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
