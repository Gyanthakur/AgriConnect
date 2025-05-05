import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CloudSun,
  Leaf,
  PlusSquare,
  BadgeDollarSign,
  Tractor,
  Users,
  Newspaper,
  Info,
  Phone,
  Layout,
  Settings,
  ShoppingBag,
  ShoppingBagIcon,
  ShoppingCart,
  Calendar,
  InfoIcon,
  Bot,
  WashingMachineIcon,
} from "lucide-react";
import { AppContext } from "../../context/AppContext";

export default function Sidebar() {
  const { pathname } = useLocation();
  const { user: loggedInUser } = useContext(AppContext);

  const sidebarItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      id: "myOrders",
      label: "My Orders",
      icon: ShoppingCart,
      href: "/dashboard/my-orders",
    },
    {
      id: "orders",
      label: "Manage Orders",
      icon: ShoppingBag,
      href: "/dashboard/seller/orders",
    },
    {
      id: "crops",
      label: "My Crops",
      icon: Leaf,
      href: "/dashboard/crops",
    },
    {
      id: "addCrop",
      label: "Add Crop",
      icon: PlusSquare,
      href: "/dashboard/crops/add",
    },

    {
      id: "myEquipments",
      label: "My Equipments",
      icon: WashingMachineIcon,
      href: "/dashboard/equipments",
    },
    {
      id: "addEquipment",
      label: "Add Equipment",
      icon: PlusSquare,
      href: "/dashboard/equipments/add",
    },
    {
      id: "manageEquipmentRentals",
      label: "Manage Equipments REnatls",
      icon: ShoppingBagIcon,
      href: "/dashboard/equipments/rentals/manage",
    },
    {
      id: "manageMyRentals",
      label: "Manage My Rentals",
      icon: ShoppingBagIcon,
      href: "/dashboard/equipments/rentals/my",
    },
    {
      id: "information-resources",
      label: "Information Resources",
      icon: Info,
      href: "/information-resources",
    },
    {
      id: "sustainable-farming",
      label: "Sustainable Farming",
      icon: Leaf,
      href: "/sustainable-farming",
    },
    {
      id: "chatbot",
      label: "Chatbot",
      icon: Bot,
      href: "/chatbot",
    },
    {
      id: "planting-calculator",
      label: "Planting Calendar",
      icon: Calendar,
      href: "/planting-calculator",
    },
    {
      id: "crop-advisory",
      label: "Crop Advisory",
      icon: InfoIcon,
      href: "/crop-database",
    },
    {
      id: "weather",
      label: "Weather Forecast",
      icon: CloudSun,
      href: "/dashboard/weather",
    },

    {
      id: "marketPrice",
      label: "Market Price",
      icon: BadgeDollarSign,
      href: "/dashboard/market-price",
    },
    {
      id: "rentEquipment",
      label: "Rent Equipment",
      icon: Tractor,
      href: "/dashboard/equipment",
    },

    {
      id: "community",
      label: "Community",
      icon: Users,
      href: "/dashboard/community",
    },
    {
      id: "news",
      label: "Agri News",
      icon: Newspaper,
      href: "/dashboard/news",
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
    },
  ];

  return (
    <aside className=" hidden lg:flex flex-col w-[300px] bg-white border-r shadow-sm dark:bg-gray-900 dark:border-gray-800">
      {/* Logo */}
      <div className="flex items-center p-4 text-white bg-green-600 border-b h-14 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <Leaf className="w-6 h-6 " />
          <span className="text-xl font-bold text-white">Dashboard</span>
        </div>
      </div>
      <nav className="flex-1 p-4 overflow-y-auto no-scrollbar">
        <ul className="space-y-1">
          {sidebarItems.map(({ id, label, icon: Icon, href }) => {
            const isActive = pathname === href || pathname.endsWith(`${href}/`);
            return (
              <li key={id}>
                <Link
                  to={href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-normal transition-colors ${
                    isActive
                      ? "bg-green-100 dark:bg-blue-900 text-green-600 dark:text-blue-300"
                      : "text-gray-600 hover:bg-green-50 dark:text-gray-300 dark:hover:bg-gray-800"
                  }`}
                >
                  <Icon className="w-5 h-5 text-green-500" />
                  <span>{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer with User Info and Settings */}
      <div className="flex items-center gap-3 p-4 border-t w- dark:border-gray-800">
        <Link
          to="/dashboard/settings"
          className={`p-2 rounded-md transition ${
            pathname === "/settings"
              ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
              : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          }`}
        >
          <Settings className="w-5 h-5" />
        </Link>
        <div className="flex flex-col flex-1">
          <span className="text-sm font-medium text-gray-800 dark:text-white">
            {loggedInUser?.firstName}
          </span>
          <span className="max-w-full text-xs text-gray-500 truncate dark:text-gray-400">
            {loggedInUser?.email}
          </span>
        </div>
      </div>
    </aside>
  );
}
