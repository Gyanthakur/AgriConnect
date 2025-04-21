import React, { useState, useRef, useEffect, useContext } from "react";
import {
  Send,
  Leaf,
  Loader2,
  Settings,
  Calendar,
  User,
  FileText,
  ChevronRight,
  X,
  MenuIcon,
  Layout,
} from "lucide-react";
import { AppContext } from "../context/AppContext";

export default function FarmerChatbot() {
  const { user } = useContext(AppContext);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Welcome to FarmAdvisor! I'm your personal agricultural assistant. How can I help with your farming needs today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("all");
  const [showSidebar, setShowSidebar] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const categories = [
    { id: "all", name: "All Topics", icon: "🌱" },
    { id: "crops", name: "Crop Selection", icon: "🌾" },
    { id: "soil", name: "Soil Health", icon: "🪨" },
    { id: "pests", name: "Pest Control", icon: "🐛" },
    { id: "season", name: "Seasonal Tips", icon: "🌦️" },
    { id: "water", name: "Irrigation", icon: "💧" },
    { id: "organic", name: "Organic Farming", icon: "🍃" },
  ];

  const quickSuggestions = [
    { text: "What should I plant this month?", category: "season" },
    { text: "How can I improve my soil quality naturally?", category: "soil" },
    { text: "Best practices for organic pest control", category: "pests" },
    { text: "How to rotate crops for better yield", category: "crops" },
    { text: "Water conservation tips for dry season", category: "water" },
    { text: "When should I fertilize my fields?", category: "soil" },
  ];

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const newUserMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    setLoading(true);
    setMessages((prev) => [
      ...prev,
      { role: "bot", text: "Typing...", isLoading: true },
    ]);

    try {
      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/chat/personalized",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: input,
            category: category !== "all" ? category : undefined,
          }),
        }
      );
      const data = await response.json();
      setMessages((prev) => prev.filter((msg) => !msg.isLoading));
      setMessages((prev) => [...prev, { role: "bot", text: data.message }]);
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessages((prev) => prev.filter((msg) => !msg.isLoading));
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Sorry, I couldn't fetch the response. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickSuggestion = (suggestion) => {
    setInput(suggestion.text);
    setCategory(suggestion.category);
    inputRef.current?.focus();
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <div
        className={`bg-white border-r border-gray-200 shadow-sm hidden md:flex md:flex-col ${
          showSidebar ? "md:w-64" : "md:w-16"
        } transition-all duration-300`}
      >
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-700 to-green-600">
          {showSidebar && (
            <div className="flex items-center gap-2">
              <Leaf className="w-6 h-6 text-white" />
              <h1 className="text-xl font-bold text-white">FarmAdvisor</h1>
            </div>
          )}
          {!showSidebar && <Leaf className="w-6 h-6 mx-auto text-white" />}
          <button
            onClick={toggleSidebar}
            className="p-1 text-white rounded-full hover:bg-green-800"
          >
            <ChevronRight
              className={`h-4 w-4 ${!showSidebar && "rotate-180"}`}
            />
          </button>
        </div>

        <nav className="flex-1 p-3 overflow-y-auto">
          {showSidebar && (
            <h2 className="px-2 mb-3 text-xs font-semibold text-gray-500">
              NAVIGATION
            </h2>
          )}
          <ul className="space-y-1">
            {[
              {
                icon: <Layout size={20} />,
                text: "Dashboard",
                href: "/dashboard",
              },
              {
                icon: <Calendar size={20} />,
                text: "Planting Calendar",
                href: "/planting-calculator",
              },
              {
                icon: <FileText size={20} />,
                text: "Crop Database",
                href: "/crop-database",
              },
            ].map((item, index) => (
              <li key={index}>
                <a href={item.href} key={index}>
                  <button
                    className={`flex items-center text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-md p-2 w-full ${
                      !showSidebar && "justify-center"
                    }`}
                  >
                    <span className="text-green-600">{item.icon}</span>
                    {showSidebar && (
                      <span className="ml-3 text-sm">{item.text}</span>
                    )}
                  </button>
                </a>
              </li>
            ))}
          </ul>

          {showSidebar && (
            <>
              <h2 className="px-2 mt-6 mb-3 text-xs font-semibold text-gray-500">
                CATEGORIES
              </h2>
              <ul className="space-y-1">
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => setCategory(cat.id)}
                      className={`flex items-center rounded-md p-2 w-full text-sm ${
                        category === cat.id
                          ? "bg-green-100 text-green-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span className="mr-2">{cat.icon}</span>
                      <span>{cat.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </nav>

        {showSidebar && (
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 text-white bg-green-600 rounded-full">
                <User className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-medium">{user?.firstName}</div>
                <div className="text-xs text-gray-500">{user?.email}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="fixed top-0 left-0 z-30 p-4 md:hidden">
        <button
          onClick={toggleMobileMenu}
          className="p-2 text-green-700 bg-white rounded-full shadow-md"
        >
          <MenuIcon className="w-5 h-5" />
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-20 bg-gray-800 bg-opacity-75 md:hidden">
          <div className="flex flex-col w-64 h-full p-4 bg-white">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Leaf className="w-6 h-6 text-green-600" />
                <h1 className="text-xl font-bold text-green-700">
                  FarmAdvisor
                </h1>
              </div>
              <button
                onClick={toggleMobileMenu}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto">
              <h2 className="mb-3 text-xs font-semibold text-gray-500">
                NAVIGATION
              </h2>
              <ul className="space-y-1">
                {[
                  {
                    icon: <Layout size={20} />,
                    text: "Dashboard",
                    href: "/dashboard",
                  },
                  {
                    icon: <Calendar size={20} />,
                    text: "Planting Calendar",
                    href: "/planting-calculator",
                  },
                  {
                    icon: <FileText size={20} />,
                    text: "Crop Database",
                    href: "/crop-database",
                  },
                ].map((item, index) => (
                  <li key={index}>
                    <a href={item.href} key={index}>
                      <button
                        className={`flex items-center text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-md p-2 w-full ${
                          !showSidebar && "justify-center"
                        }`}
                      >
                        <span className="text-green-600">{item.icon}</span>
                        {showSidebar && (
                          <span className="ml-3 text-sm">{item.text}</span>
                        )}
                      </button>
                    </a>
                  </li>
                ))}
              </ul>
              <h2 className="mt-4 mb-3 text-xs font-semibold text-gray-500">
                CATEGORIES
              </h2>
              <ul className="space-y-1">
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => {
                        setCategory(cat.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center rounded-md p-2 w-full text-sm ${
                        category === cat.id
                          ? "bg-green-100 text-green-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span className="mr-2">{cat.icon}</span>
                      <span>{cat.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}

      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="p-4 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-800">
                Agricultural Assistant
              </h1>
              <p className="text-sm text-gray-500">
                {category !== "all"
                  ? `Filtered by: ${
                      categories.find((c) => c.id === category)?.name
                    }`
                  : "All farming topics"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                Growing Season
              </span>
            </div>
          </div>
        </header>

        <div className="flex flex-col flex-1 overflow-hidden bg-gray-50">
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "bot" && !msg.isLoading && (
                  <div className="flex items-center justify-center w-10 h-10 mr-2 text-white rounded-full shadow-sm bg-gradient-to-br from-green-500 to-green-700">
                    <Leaf className="w-5 h-5" />
                  </div>
                )}
                <div
                  className={`px-4 py-3 rounded-lg max-w-lg ${
                    msg.role === "user"
                      ? "bg-green-600 text-white rounded-br-none shadow-sm"
                      : msg.isLoading
                      ? "bg-gray-100 text-gray-500 rounded-bl-none flex items-center space-x-2"
                      : "bg-white text-gray-800 border border-gray-200 shadow-sm rounded-bl-none"
                  }`}
                >
                  {msg.isLoading ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Analyzing farm data...</span>
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="px-4 py-3 bg-white border-t border-gray-200">
            <div className="mb-2 text-xs font-medium text-gray-500">
              SUGGESTED QUESTIONS:
            </div>
            <div className="flex flex-wrap gap-2">
              {quickSuggestions
                .filter((s) => category === "all" || s.category === category)
                .map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickSuggestion(suggestion)}
                    className="px-3 py-2 text-sm text-gray-700 transition-colors border border-gray-200 rounded-md bg-gray-50 hover:bg-green-50 hover:border-green-200 hover:text-green-700"
                  >
                    {suggestion.text}
                  </button>
                ))}
            </div>
          </div>

          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder={`Ask about ${
                  category !== "all"
                    ? categories
                        .find((c) => c.id === category)
                        ?.name.toLowerCase()
                    : "farming"
                }...`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                disabled={loading}
              />
              <button
                onClick={handleSend}
                className="p-3 text-white transition bg-green-600 rounded-full shadow-sm hover:bg-green-700 disabled:opacity-60 disabled:hover:bg-green-600"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
