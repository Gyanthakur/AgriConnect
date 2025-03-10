import React, { useState } from "react";

const FarmEquipmentRentals = ({ isDarkMode }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Sample equipment data
  const equipmentList = [
    {
      id: 1,
      name: "Tractor",
      image: "https://4.imimg.com/data4/KJ/BY/MY-14831048/john-deere-5050d-tractor-1000x1000.jpg",
      location: "Lucknow",
      price: "₹1,500/day",
      description: "Powerful tractor for plowing and harvesting.",
    },
    {
      id: 2,
      name: "Rotavator",
      image: "https://international.sonalika.com/wp-content/uploads/2020/09/smart-series-img-1.jpg",
      location: "Kanpur",
      price: "₹1,200/day",
      description: "Ideal for soil preparation and weed control.",
    },
    {
      id: 3,
      name: "Harvester",
      image: "https://5.imimg.com/data5/SELLER/Default/2021/2/TI/KI/AZ/61782129/standard-tractor-mounted-combine-harvester-1000x1000.jpg",
      location: "Varanasi",
      price: "₹2,500/day",
      description: "Efficient combine harvester for large-scale farms.",
    },
    {
      id: 4,
      name: "Seed Drill",
      image: "https://5.imimg.com/data5/SELLER/Default/2023/12/367520477/YP/SG/PW/2497808/seed-drills-9-tyne-1000x1000.jpg",
      location: "Sultanpur",
      price: "₹900/day",
      description: "Perfect for uniform seed distribution.",
    },
    {
        id: 5,
        name: "Plough",
        image: "https://www.masseyferguson.com/content/dam/public/masseyfergusonglobal/markets/en/assets/implements/mf-fixed-disc-ploughs/features/mf-disc-ploughs-lfd-1400x933.jpg",
        location: "Prayagraj",
        price: "₹1,100/day",
        description: "Used for primary tillage to break up soil.",
      },
      {
        id: 6,
        name: "Power Tiller",
        image: "https://international.sonalika.com/wp-content/uploads/2023/04/5-min-12.png",
        location: "Raebareli",
        price: "₹2,000/day",
        description: "Versatile machine for land cultivation.",
      },
      {
        id: 7,
        name: "Baler",
        image: "https://www.deere.co.in/assets/images/region-1/implements/compact-round-baler/Round_Baler_John_Deere_India__large_70dbbfa73362de5df2fb99e9f729699ff72ca86f.png",
        location: "Gorakhpur",
        price: "₹3,000/day",
        description: "Compact machine for collecting and baling hay.",
      },
      {
        id: 8,
        name: "Sprayer",
        image: "https://www.rajagro.in/wp-content/uploads/2024/03/aspee-gardenia-battery-sprayer-agr001-8ahbr-agr001-12ahbr-xe.png",
        location: "Faizabad",
        price: "₹700/day",
        description: "Essential for spraying fertilizers and pesticides.",
      },
      {
        id: 9,
        name: "Disc Harrow",
        image: "https://5.imimg.com/data5/SELLER/Default/2023/5/306622941/ZV/WL/JA/53496462/disc-harrow-min-1536x828-1000x1000.png",
        location: "Mirzapur",
        price: "₹1,300/day",
        description: "Breaks up soil and removes weeds before planting.",
      },
      {
        id: 10,
        name: "Chisel Plough",
        image: "https://amjagro.pl/wp-content/uploads/2024/12/plug-dlutowy-darta-4.jpg",
        location: "Bareilly",
        price: "₹1,800/day",
        description: "Deep tillage plough for breaking compacted soil layers.",
      },
      {
        id: 11,
        name: "Fertilizer Spreader",
        image: "https://www.fieldking.com/images/crop-protection/fertilizer-spreader/lg/fertilizer-spreader.png",
        location: "Agra",
        price: "₹1,000/day",
        description: "Ensures uniform fertilizer application across the field.",
      },
      {
        id: 12,
        name: "Water Pump",
        image: "https://www.hondaindiapower.com/admin/public/uploads/Products/Q12r1yyfTb.jpeg?img=70",
        location: "Mathura",
        price: "₹850/day",
        description: "Used for irrigation and draining excess water.",
      },
      {
        id: 13,
        name: "Post Hole Digger",
        image: "https://shaktimanagro.com/wp-content/uploads/2024/08/Shaktiman_Applications_Post_Hole_Digger_2.jpg",
        location: "Jhansi",
        price: "₹1,400/day",
        description: "Ideal for digging deep holes for fencing and plantations.",
      },
      {
        id: 14,
        name: "Mulcher",
        image: "https://shaktimanagro.com/wp-content/uploads/2024/08/Shaktiman_Mulcher_Image_1.png",
        location: "Basti",
        price: "₹2,200/day",
        description: "Shreds and spreads crop residues as mulch.",
      },
      {
        id: 15,
        name: "Threshing Machine",
        image: "https://5.imimg.com/data5/SELLER/Default/2023/4/303093889/HP/SO/HQ/12830884/paddy-thresher-machine-1000x1000.jpg",
        location: "Ballia",
        price: "₹2,700/day",
        description: "Separates grains from harvested crops efficiently.",
      },
  ];

  // Filter equipment based on search query
  const filteredEquipment = equipmentList.filter((equipment) =>
    equipment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    equipment.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`min-h-screen p-6 ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <header className="text-center mb-6">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text">
          Farm Equipment Rentals
        </h1>
        <p className="mt-2 text-lg">
          Easily rent the latest farming equipment without the cost of ownership, available near your area.
        </p>
      </header>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search equipment or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`p-3 w-full max-w-md border ${isDarkMode ? 'text-black' : ''} rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none`}
        />
      </div>

      {/* Equipment Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEquipment.length > 0 ? (
          filteredEquipment.map((equipment) => (
            <div key={equipment.id} className={`p-4 rounded-lg shadow-md ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
              <img src={equipment.image} alt={equipment.name} className="w-full h-40 object-cover rounded-lg" />
              <h2 className="text-xl font-semibold mt-3">{equipment.name}</h2>
              <p className="text-sm text-gray-500">{equipment.location}</p>
              <p className="mt-2">{equipment.description}</p>
              <p className="mt-2 font-bold text-green-500">{equipment.price}</p>
              <button className="mt-3 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                Rent Now
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-lg">No equipment found.</p>
        )}
      </div>
    </div>
  );
};

export default FarmEquipmentRentals;
