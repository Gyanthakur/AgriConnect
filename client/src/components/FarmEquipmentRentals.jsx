import React, { useState } from "react";
import { Search } from "lucide-react";

const FarmEquipmentRentals = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const equipmentList = [
    {
      id: 1,
      name: "Tractor",
      image:
        "https://4.imimg.com/data4/KJ/BY/MY-14831048/john-deere-5050d-tractor-1000x1000.jpg",
      location: "Lucknow",
      price: "₹1,500/day",
      description: "Powerful tractor for plowing and harvesting.",
      category: "Heavy Equipment",
    },
    {
      id: 2,
      name: "Rotavator",
      image:
        "https://international.sonalika.com/wp-content/uploads/2020/09/smart-series-img-1.jpg",
      location: "Kanpur",
      price: "₹1,200/day",
      description: "Ideal for soil preparation and weed control.",
      category: "Tillage",
    },
    {
      id: 3,
      name: "Harvester",
      image:
        "https://5.imimg.com/data5/SELLER/Default/2021/2/TI/KI/AZ/61782129/standard-tractor-mounted-combine-harvester-1000x1000.jpg",
      location: "Varanasi",
      price: "₹2,500/day",
      description: "Efficient combine harvester for large-scale farms.",
      category: "Heavy Equipment",
    },
    {
      id: 4,
      name: "Seed Drill",
      image:
        "https://5.imimg.com/data5/SELLER/Default/2023/12/367520477/YP/SG/PW/2497808/seed-drills-9-tyne-1000x1000.jpg",
      location: "Sultanpur",
      price: "₹900/day",
      description: "Perfect for uniform seed distribution.",
      category: "Planting",
    },
    {
      id: 5,
      name: "Plough",
      image:
        "https://www.masseyferguson.com/content/dam/public/masseyfergusonglobal/markets/en/assets/implements/mf-fixed-disc-ploughs/features/mf-disc-ploughs-lfd-1400x933.jpg",
      location: "Prayagraj",
      price: "₹1,100/day",
      description: "Used for primary tillage to break up soil.",
      category: "Tillage",
    },
    {
      id: 6,
      name: "Power Tiller",
      image:
        "https://international.sonalika.com/wp-content/uploads/2023/04/5-min-12.png",
      location: "Raebareli",
      price: "₹2,000/day",
      description: "Versatile machine for land cultivation.",
      category: "Tillage",
    },
    {
      id: 7,
      name: "Baler",
      image:
        "https://www.deere.co.in/assets/images/region-1/implements/compact-round-baler/Round_Baler_John_Deere_India__large_70dbbfa73362de5df2fb99e9f729699ff72ca86f.png",
      location: "Gorakhpur",
      price: "₹3,000/day",
      description: "Compact machine for collecting and baling hay.",
      category: "Harvesting",
    },
    {
      id: 8,
      name: "Sprayer",
      image:
        "https://www.rajagro.in/wp-content/uploads/2024/03/aspee-gardenia-battery-sprayer-agr001-8ahbr-agr001-12ahbr-xe.png",
      location: "Faizabad",
      price: "₹700/day",
      description: "Essential for spraying fertilizers and pesticides.",
      category: "Crop Care",
    },
    {
      id: 9,
      name: "Disc Harrow",
      image:
        "https://5.imimg.com/data5/SELLER/Default/2023/5/306622941/ZV/WL/JA/53496462/disc-harrow-min-1536x828-1000x1000.png",
      location: "Mirzapur",
      price: "₹1,300/day",
      description: "Breaks up soil and removes weeds before planting.",
      category: "Tillage",
    },
    {
      id: 10,
      name: "Chisel Plough",
      image:
        "https://amjagro.pl/wp-content/uploads/2024/12/plug-dlutowy-darta-4.jpg",
      location: "Bareilly",
      price: "₹1,800/day",
      description: "Deep tillage plough for breaking compacted soil layers.",
      category: "Tillage",
    },
    {
      id: 11,
      name: "Fertilizer Spreader",
      image:
        "https://www.fieldking.com/images/crop-protection/fertilizer-spreader/lg/fertilizer-spreader.png",
      location: "Agra",
      price: "₹1,000/day",
      description: "Ensures uniform fertilizer application across the field.",
      category: "Crop Care",
    },
    {
      id: 12,
      name: "Water Pump",
      image:
        "https://www.hondaindiapower.com/admin/public/uploads/Products/Q12r1yyfTb.jpeg?img=70",
      location: "Mathura",
      price: "₹850/day",
      description: "Used for irrigation and draining excess water.",
      category: "Irrigation",
    },
    {
      id: 13,
      name: "Post Hole Digger",
      image:
        "https://shaktimanagro.com/wp-content/uploads/2024/08/Shaktiman_Applications_Post_Hole_Digger_2.jpg",
      location: "Jhansi",
      price: "₹1,400/day",
      description: "Ideal for digging deep holes for fencing and plantations.",
      category: "Specialty",
    },
    {
      id: 14,
      name: "Mulcher",
      image:
        "https://shaktimanagro.com/wp-content/uploads/2024/08/Shaktiman_Mulcher_Image_1.png",
      location: "Basti",
      price: "₹2,200/day",
      description: "Shreds and spreads crop residues as mulch.",
      category: "Crop Care",
    },
    {
      id: 15,
      name: "Threshing Machine",
      image:
        "https://5.imimg.com/data5/SELLER/Default/2023/4/303093889/HP/SO/HQ/12830884/paddy-thresher-machine-1000x1000.jpg",
      location: "Ballia",
      price: "₹2,700/day",
      description: "Separates grains from harvested crops efficiently.",
      category: "Harvesting",
    },
  ];

  // Get unique categories
  const categories = [
    "All",
    ...new Set(equipmentList.map((item) => item.category)),
  ];

  // Filter equipment based on search query and category
  const filteredEquipment = equipmentList.filter((equipment) => {
    const matchesSearch =
      equipment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      equipment.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || equipment.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen text-gray-900 bg-gray-50 dark:bg-gray-900 dark:text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-600 to-blue-600">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative px-6 py-12 mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Farm Equipment Rentals
            </h1>
            <p className="max-w-2xl mx-auto mt-6 text-xl text-gray-100">
              Access premium farming equipment without ownership costs. Find
              what you need in your local area.
            </p>

            {/* Search Bar */}
            <div className="flex items-center justify-center max-w-md p-1 mx-auto mt-8 bg-white rounded-full">
              <div className="flex items-center justify-center w-10 h-10 text-gray-500">
                <Search size={20} />
              </div>
              <input
                type="text"
                placeholder="Search equipment or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 pl-2 pr-4 text-gray-900 bg-transparent border-none rounded-r-full focus:outline-none focus:ring-0"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12 mx-auto md:px-6 max-w-7xl">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                selectedCategory === category
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="mb-6 text-sm font-medium">
          <span>{filteredEquipment.length} items found</span>
        </div>

        {/* Equipment Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEquipment.length > 0 ? (
            filteredEquipment.map((equipment) => (
              <div
                key={equipment.id}
                className="overflow-hidden transition-all duration-300 transform bg-white shadow-lg rounded-xl hover:shadow-xl hover:-translate-y-1 dark:bg-gray-800"
              >
                <div className="relative">
                  <img
                    src={equipment.image}
                    alt={equipment.name}
                    className="object-cover w-full h-48"
                  />
                  <div className="absolute px-3 py-1 text-xs font-semibold text-white bg-green-500 rounded-full top-4 right-4">
                    {equipment.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">{equipment.name}</h2>
                    <p className="text-lg font-bold text-green-500">
                      {equipment.price}
                    </p>
                  </div>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path>
                    </svg>
                    {equipment.location}
                  </div>
                  <p className="mt-3 text-sm">{equipment.description}</p>
                  <div className="flex gap-2 mt-6">
                    <button className="flex-1 px-4 py-2 font-medium text-white transition bg-green-500 rounded-lg hover:bg-green-600">
                      Rent Now
                    </button>
                    <button className="px-4 py-2 font-medium text-gray-700 transition bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 p-12 text-center">
              <div className="mx-auto text-6xl text-gray-400">🔍</div>
              <h3 className="mt-4 text-xl font-medium">No equipment found</h3>
              <p className="mt-2 text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmEquipmentRentals;
