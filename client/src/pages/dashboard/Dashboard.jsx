import React from "react";
import {
  LayoutDashboard,
  Leaf,
  PlusSquare,
  ShoppingCart,
  CloudSun,
  BadgeDollarSign,
  Tractor,
  Users,
  Newspaper,
  Info,
  Phone,
  Settings,
  WashingMachine,
} from "lucide-react";

const Dashboard = () => {
  const services = [
    {
      id: "crops",
      label: "My Crops",
      icon: Leaf,
      href: "/dashboard/crops",
      description:
        "Manage your current crop inventory and track growth progress of all your active plantings.",
    },
    {
      id: "addCrop",
      label: "Add Crop",
      icon: PlusSquare,
      href: "/dashboard/crops/add",
      description:
        "Register new crops and plantings with detailed information to optimize your harvests.",
    },
    {
      id: "buyCrop",
      label: "Buy Crop",
      icon: ShoppingCart,
      href: "/shop",
      description:
        "Purchase high-quality seeds, saplings and other crop varieties from trusted suppliers.",
    },
    {
      id: "myEquipments",
      label: "My Equipments",
      icon: WashingMachine,
      href: "/dashboard/equipments",
      description:
        "Manage your equipment inventory, including rentals and purchases, for efficient farming operations.",
    },
    {
      id: "addEquipment",
      label: "Add Equipment",
      icon: PlusSquare,
      href: "/dashboard/equipments/add",
      description:
        "Register new equipment and tools to keep track of your farming assets.",
    },
    {
      id: "rentEquipment",
      label: "Rent Equipment",
      icon: Tractor,
      href: "/rental",
      description:
        "Find and rent essential farming equipment at competitive rates from nearby providers.",
    },
    {
      id: "weather",
      label: "Weather Forecast",
      icon: CloudSun,
      href: "/dashboard/weather",
      description:
        "Access accurate local weather predictions to plan your farming activities effectively.",
    },
    {
      id: "marketPrice",
      label: "Market Price",
      icon: BadgeDollarSign,
      href: "/dashboard/market-price",
      description:
        "Track current agricultural commodity prices to maximize profits when selling your produce.",
    },

    {
      id: "community",
      label: "Community",
      icon: Users,
      href: "/dashboard/community",
      description:
        "Connect with fellow farmers to share knowledge, experiences, and build valuable relationships.",
    },
    {
      id: "news",
      label: "Agri News",
      icon: Newspaper,
      href: "/dashboard/news",
      description:
        "Stay updated with the latest agricultural news, trends, policies, and innovations.",
    },
    {
      id: "contact-us",
      label: "Contact Us",
      icon: Phone,
      href: "/contact-us",
      description:
        "Reach out to our support team for assistance with any queries or technical issues.",
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
      description:
        "Customize your account preferences and notification settings to suit your needs.",
    },
  ];

  return (
    <div className="">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
        <p className="mt-2 text-slate-600">
          Welcome to your comprehensive farming platform. Access all services to
          optimize your agricultural operations.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const IconComponent = service.icon;

          return (
            <div
              key={service.id}
              className="overflow-hidden transition-shadow duration-300 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg"
            >
              <div className="p-4 bg-green-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <IconComponent className="w-6 h-6 text-green-700" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {service.label}
                  </h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-slate-600">{service.description}</p>
              </div>
              <div className="px-4 py-3 bg-white border-t border-gray-100">
                <a
                  href={service.href}
                  className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-800"
                >
                  Access {service.label}
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
