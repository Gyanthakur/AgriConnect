import React, { useState, useEffect } from "react";
import {
  Search,
  Calendar,
  Info,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  ArrowRight,
} from "lucide-react";

export default function CropDatabaseAndPlantingCalculator({ section }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [zone, setZone] = useState("7b");
  const [expandedSection, setExpandedSection] = useState("basics");
  const [calculatedDates, setCalculatedDates] = useState(null);
  const [viewMode, setViewMode] = useState(section); // "database" or "calculator"
  const cropDatabase = [
    {
      id: 1,
      name: "Tomato",
      category: "Fruit Vegetables",
      image: "🍅",
      basics: {
        latinName: "Solanum lycopersicum",
        growthHabit: "Annual vine/bush",
        height: "2-6 feet depending on variety",
        spacing: "18-36 inches between plants",
        yield: "10-15 pounds per plant (indeterminate)",
      },
      growingInfo: {
        sunlight: "Full sun (6-8 hours)",
        soil: "Well-draining, slightly acidic (pH 6.0-6.8)",
        waterNeeds: "Consistent moisture, 1-2 inches per week",
        fertilizer: "Balanced fertilizer with higher phosphorus when fruiting",
        companions: "Basil, marigolds, nasturtiums, onions",
        avoid: "Potatoes, corn, brassicas",
      },
      plantingDates: {
        "5a": { start: "Apr 15", end: "May 30", harvest: "Jul 15 - Oct 1" },
        "5b": { start: "Apr 10", end: "May 30", harvest: "Jul 10 - Oct 5" },
        "6a": { start: "Apr 1", end: "Jun 10", harvest: "Jul 1 - Oct 15" },
        "6b": { start: "Mar 25", end: "Jun 15", harvest: "Jun 25 - Oct 20" },
        "7a": { start: "Mar 15", end: "Jun 30", harvest: "Jun 15 - Oct 30" },
        "7b": { start: "Mar 10", end: "Jul 10", harvest: "Jun 10 - Nov 5" },
        "8a": { start: "Mar 1", end: "Jul 20", harvest: "Jun 1 - Nov 15" },
        "8b": { start: "Feb 20", end: "Aug 1", harvest: "May 20 - Nov 30" },
        "9a": { start: "Feb 1", end: "Aug 15", harvest: "May 1 - Dec 15" },
        "9b": { start: "Jan 15", end: "Sep 1", harvest: "Apr 15 - Dec 30" },
      },
      careInstructions: {
        pruning:
          "Remove suckers for indeterminate varieties, trim lower leaves as plant grows",
        pests: "Watch for hornworms, aphids, whiteflies, and stink bugs",
        diseases: "Susceptible to blight, wilt, and virus diseases",
        tips: "Stake or cage plants, mulch soil to retain moisture, avoid wetting foliage",
      },
      harvestStorage: {
        whenToHarvest: "When fully colored but still firm",
        howToHarvest: "Twist gently or cut with pruners",
        storage: "Room temperature for best flavor, up to 5 days",
        preservation: "Can be frozen, dried, or canned",
      },
      varieties: [
        "Roma (paste)",
        "Beefsteak (large slicing)",
        "Cherry (small)",
        "Brandywine (heirloom)",
        "Early Girl (early producer)",
      ],
    },
    {
      id: 2,
      name: "Lettuce",
      category: "Leafy Greens",
      image: "🥬",
      basics: {
        latinName: "Lactuca sativa",
        growthHabit: "Annual, rosette",
        height: "6-12 inches",
        spacing: "8-12 inches between plants",
        yield: "1 head per plant or multiple cuttings for leaf types",
      },
      growingInfo: {
        sunlight: "Partial shade to full sun (cooler climates)",
        soil: "Rich, well-draining soil, pH 6.0-7.0",
        waterNeeds: "Regular watering, keep soil moist",
        fertilizer: "Light nitrogen fertilizer before planting",
        companions: "Carrots, radishes, cucumbers, strawberries",
        avoid: "Brassicas, celery",
      },
      plantingDates: {
        "5a": {
          start: "Apr 1",
          end: "May 15",
          harvest: "May 15 - Jun 30",
          fall: "Aug 1 - Sep 1",
        },
        "5b": {
          start: "Mar 25",
          end: "May 20",
          harvest: "May 10 - Jul 5",
          fall: "Aug 1 - Sep 10",
        },
        "6a": {
          start: "Mar 15",
          end: "May 25",
          harvest: "May 5 - Jul 10",
          fall: "Aug 1 - Sep 15",
        },
        "6b": {
          start: "Mar 10",
          end: "May 30",
          harvest: "Apr 25 - Jul 15",
          fall: "Aug 1 - Sep 20",
        },
        "7a": {
          start: "Mar 1",
          end: "Jun 1",
          harvest: "Apr 15 - Jul 20",
          fall: "Aug 15 - Oct 1",
        },
        "7b": {
          start: "Feb 20",
          end: "Jun 10",
          harvest: "Apr 10 - Jul 25",
          fall: "Aug 20 - Oct 10",
        },
        "8a": {
          start: "Feb 10",
          end: "Jun 15",
          harvest: "Apr 1 - Jul 25",
          fall: "Sep 1 - Nov 1",
        },
        "8b": {
          start: "Feb 1",
          end: "Jun 20",
          harvest: "Mar 20 - Jul 30",
          fall: "Sep 15 - Nov 15",
        },
        "9a": {
          start: "Jan 15",
          end: "Mar 15",
          harvest: "Mar 1 - May 15",
          fall: "Oct 1 - Dec 1",
        },
        "9b": {
          start: "Jan 1",
          end: "Mar 1",
          harvest: "Feb 15 - Apr 30",
          fall: "Oct 15 - Dec 30",
        },
      },
      careInstructions: {
        pruning: "Harvest outer leaves for leaf varieties to extend harvest",
        pests: "Watch for aphids, slugs, and snails",
        diseases:
          "Susceptible to downy mildew and bottom rot in humid conditions",
        tips: "Plant in succession every 2-3 weeks for continuous harvest",
      },
      harvestStorage: {
        whenToHarvest: "When leaves are tender and before bolting",
        howToHarvest: "Cut whole head or harvest outer leaves",
        storage: "Refrigerate unwashed in plastic bag for up to 1 week",
        preservation: "Best fresh, not suitable for freezing or canning",
      },
      varieties: [
        "Butterhead (Boston, Bibb)",
        "Romaine (Cos)",
        "Loose-leaf",
        "Iceberg (Crisphead)",
        "Batavian (Summer Crisp)",
      ],
    },
    {
      id: 3,
      name: "Carrot",
      category: "Root Vegetables",
      image: "🥕",
      basics: {
        latinName: "Daucus carota",
        growthHabit: "Biennial grown as annual",
        height: "8-12 inches above ground",
        spacing: "2-3 inches between plants",
        yield: "8-10 carrots per foot of row",
      },
      growingInfo: {
        sunlight: "Full sun to partial shade",
        soil: "Deep, loose, well-draining soil, pH 6.0-6.8",
        waterNeeds: "Consistent moisture, 1 inch per week",
        fertilizer: "Low nitrogen, higher potassium and phosphorus",
        companions: "Tomatoes, onions, leeks, rosemary, sage",
        avoid: "Dill, parsnips, and other root vegetables",
      },
      plantingDates: {
        "5a": {
          start: "Apr 15",
          end: "Jun 15",
          harvest: "Jul 1 - Oct 15",
          fall: "Jul 15 - Aug 1",
        },
        "5b": {
          start: "Apr 10",
          end: "Jun 20",
          harvest: "Jun 25 - Oct 20",
          fall: "Jul 15 - Aug 10",
        },
        "6a": {
          start: "Apr 1",
          end: "Jun 30",
          harvest: "Jun 15 - Oct 30",
          fall: "Jul 20 - Aug 15",
        },
        "6b": {
          start: "Mar 25",
          end: "Jul 10",
          harvest: "Jun 10 - Nov 10",
          fall: "Jul 25 - Aug 20",
        },
        "7a": {
          start: "Mar 15",
          end: "Jul 20",
          harvest: "Jun 1 - Nov 20",
          fall: "Aug 1 - Sep 1",
        },
        "7b": {
          start: "Mar 1",
          end: "Aug 1",
          harvest: "May 25 - Nov 30",
          fall: "Aug 15 - Sep 15",
        },
        "8a": {
          start: "Feb 20",
          end: "Aug 15",
          harvest: "May 15 - Dec 1",
          fall: "Aug 25 - Sep 30",
        },
        "8b": {
          start: "Feb 10",
          end: "Aug 25",
          harvest: "May 1 - Dec 5",
          fall: "Sep 1 - Oct 1",
        },
        "9a": {
          start: "Feb 1",
          end: "Sep 1",
          harvest: "Apr 15 - Dec 10",
          fall: "Sep 10 - Oct 10",
        },
        "9b": {
          start: "Jan 15",
          end: "Sep 15",
          harvest: "Apr 1 - Dec 20",
          fall: "Sep 15 - Oct 15",
        },
      },
      careInstructions: {
        pruning: "Thin plants to prevent crowding and ensure root growth",
        pests: "Watch for carrot flies, aphids, and root maggots",
        diseases: "Root rot in waterlogged soil, fungal infections",
        tips: "Plant in deep, loose soil; avoid stony ground",
      },
      harvestStorage: {
        whenToHarvest:
          "When the roots reach the desired size, generally 6-8 inches",
        howToHarvest: "Pull gently or use a fork to loosen soil",
        storage: "Store in a cool, dry place, or refrigerate",
        preservation: "Can be frozen or stored in root cellar for months",
      },
      varieties: ["Nantes", "Danvers", "Imperator", "Chantenay", "Purple Haze"],
    },
    {
      id: 4,
      name: "Wheat",
      category: "Cereal Grains",
      image: "🌾",
      basics: {
        latinName: "Triticum aestivum",
        growthHabit: "Annual grass",
        height: "2-4 feet",
        spacing: "6-8 inches between rows",
        yield: "50-100 bushels per acre",
      },
      growingInfo: {
        sunlight: "Full sun",
        soil: "Well-draining soil, pH 6.0-7.0",
        waterNeeds: "Moderate, 1 inch per week",
        fertilizer: "Balanced nitrogen, phosphorus, and potassium",
        companions: "Peas, beans, mustard",
        avoid: "Corn, barley",
      },
      plantingDates: {
        "5a": { start: "Apr 1", end: "Apr 15", harvest: "Jul 15 - Aug 15" },
        "5b": { start: "Mar 25", end: "Apr 5", harvest: "Jul 10 - Aug 10" },
        "6a": { start: "Mar 15", end: "Mar 30", harvest: "Jul 1 - Aug 1" },
        "6b": { start: "Mar 10", end: "Mar 25", harvest: "Jun 20 - Jul 20" },
        "7a": { start: "Mar 1", end: "Mar 15", harvest: "Jun 10 - Jul 10" },
        "7b": { start: "Feb 20", end: "Mar 10", harvest: "Jun 1 - Jul 1" },
      },
      careInstructions: {
        pests: "Watch for aphids, wheat rust, and armyworms",
        diseases: "Powdery mildew, wheat blight",
        tips: "Avoid heavy watering, ensure soil is well-drained",
      },
      harvestStorage: {
        whenToHarvest: "When heads are golden-brown and grains are hard",
        howToHarvest: "Cut with a sickle or harvest mechanically",
        storage: "Store in a cool, dry place, or use silos",
        preservation: "Can be stored for months if kept dry",
      },
      varieties: ["Hard Red Winter", "Soft White", "Durum"],
    },
    {
      id: 5,
      name: "Rice",
      category: "Cereal Grains",
      image: "🍚",
      basics: {
        latinName: "Oryza sativa",
        growthHabit: "Annual grass",
        height: "2-3 feet",
        spacing: "6-12 inches between plants",
        yield: "6-8 tons per hectare",
      },
      growingInfo: {
        sunlight: "Full sun",
        soil: "Well-drained, fertile soil with pH 5.5-6.5",
        waterNeeds: "Consistent water, can tolerate wet conditions",
        fertilizer: "High nitrogen",
        companions: "Water-loving plants like taro, lotus",
        avoid: "Plants with deep roots, like trees",
      },
      plantingDates: {
        "5a": { start: "Apr 15", end: "May 15", harvest: "Sep 15 - Oct 15" },
        "5b": { start: "Apr 5", end: "May 10", harvest: "Sep 5 - Oct 5" },
        "6a": { start: "Mar 20", end: "May 1", harvest: "Aug 20 - Sep 20" },
        "6b": { start: "Mar 10", end: "Apr 20", harvest: "Aug 10 - Sep 10" },
        "7a": { start: "Mar 1", end: "Apr 10", harvest: "Aug 1 - Sep 1" },
        "7b": { start: "Feb 20", end: "Apr 1", harvest: "Jul 25 - Aug 25" },
      },
      careInstructions: {
        pests: "Watch for rice stem borers, brown planthoppers",
        diseases: "Rice blast, sheath blight",
        tips: "Plant in flooded paddies or wet conditions",
      },
      harvestStorage: {
        whenToHarvest: "When grains are firm and the plant turns golden",
        howToHarvest: "Cut using sickle or mechanical harvester",
        storage: "Store in cool, dry, and well-ventilated area",
        preservation: "Can be stored for long periods in airtight containers",
      },
      varieties: ["Indica", "Japonica", "Basmati"],
    },
  ];

  const months = [
    { name: "January", days: 31, abbr: "Jan" },
    { name: "February", days: 28, abbr: "Feb" },
    { name: "March", days: 31, abbr: "Mar" },
    { name: "April", days: 30, abbr: "Apr" },
    { name: "May", days: 31, abbr: "May" },
    { name: "June", days: 30, abbr: "Jun" },
    { name: "July", days: 31, abbr: "Jul" },
    { name: "August", days: 31, abbr: "Aug" },
    { name: "September", days: 30, abbr: "Sep" },
    { name: "October", days: 31, abbr: "Oct" },
    { name: "November", days: 30, abbr: "Nov" },
    { name: "December", days: 31, abbr: "Dec" },
  ];

  const filteredCrops = cropDatabase.filter(
    (crop) =>
      crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crop.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const parseDate = (dateStr) => {
    try {
      const [monthStr, dayStr] = dateStr.split(" ");
      const monthIndex = months.findIndex((m) => m.abbr === monthStr);
      const day = parseInt(dayStr);
      return { monthIndex, day };
    } catch (error) {
      return { monthIndex: 0, day: 1 };
    }
  };

  const formatDate = (date) => {
    if (!date) return "";
    const month = months[date.getMonth()].name;
    return `${month} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const calculateDates = () => {
    if (!selectedCrop || !zone) return;

    const plantingInfo = selectedCrop.plantingDates[zone];
    if (!plantingInfo) {
      setCalculatedDates({
        error: `No specific planting information available for Zone ${zone}. Please consult local extension office for more accurate dates.`,
      });
      return;
    }

    const currentYear = new Date().getFullYear();

    // Parse start and end dates
    const startInfo = parseDate(plantingInfo.start);
    const endInfo = parseDate(plantingInfo.end);

    // Create date objects
    const startDate = new Date(
      currentYear,
      startInfo.monthIndex,
      startInfo.day
    );
    const endDate = new Date(currentYear, endInfo.monthIndex, endInfo.day);

    // For harvest dates
    const harvestDates = plantingInfo.harvest.split(" - ");
    const harvestStartInfo = parseDate(harvestDates[0]);
    const harvestEndInfo = parseDate(harvestDates[1]);

    const harvestStartDate = new Date(
      currentYear,
      harvestStartInfo.monthIndex,
      harvestStartInfo.day
    );
    const harvestEndDate = new Date(
      currentYear,
      harvestEndInfo.monthIndex,
      harvestEndInfo.day
    );

    // Fall planting if available
    let fallStartDate = null;
    let fallEndDate = null;

    if (plantingInfo.fall) {
      const fallDates = plantingInfo.fall.split(" - ");
      const fallStartInfo = parseDate(fallDates[0]);
      const fallEndInfo = parseDate(fallDates[1]);

      fallStartDate = new Date(
        currentYear,
        fallStartInfo.monthIndex,
        fallStartInfo.day
      );
      fallEndDate = new Date(
        currentYear,
        fallEndInfo.monthIndex,
        fallEndInfo.day
      );
    }

    setCalculatedDates({
      startDate,
      endDate,
      harvestStartDate,
      harvestEndDate,
      fallStartDate,
      fallEndDate,
    });
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  useEffect(() => {
    if (selectedCrop && zone) {
      calculateDates();
    }
  }, [selectedCrop, zone]);

  const getSeasonalTimeline = () => {
    if (!calculatedDates || calculatedDates.error) return null;
    const timeline = [];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const isPlantingTimeNow =
      currentDate >= calculatedDates.startDate &&
      currentDate <= calculatedDates.endDate;

    const isHarvestTimeNow =
      currentDate >= calculatedDates.harvestStartDate &&
      currentDate <= calculatedDates.harvestEndDate;

    const isFallPlantingTimeNow =
      calculatedDates.fallStartDate &&
      currentDate >= calculatedDates.fallStartDate &&
      currentDate <= calculatedDates.fallEndDate;

    return (
      <div className="mt-4">
        <div className="mb-2 text-sm font-medium">Seasonal Calendar</div>
        <div className="flex flex-wrap gap-1">
          {months.map((month, idx) => {
            const isPlantingMonth =
              idx >= calculatedDates.startDate.getMonth() &&
              idx <= calculatedDates.endDate.getMonth();

            const isHarvestMonth =
              idx >= calculatedDates.harvestStartDate.getMonth() &&
              idx <= calculatedDates.harvestEndDate.getMonth();

            const isFallPlantingMonth =
              calculatedDates.fallStartDate &&
              idx >= calculatedDates.fallStartDate.getMonth() &&
              idx <= calculatedDates.fallEndDate.getMonth();

            let bgColor = "bg-gray-100";
            let textColor = "text-gray-600";

            if (isPlantingMonth) {
              bgColor = "bg-green-100";
              textColor = "text-green-800";
            }

            if (isHarvestMonth) {
              bgColor = "bg-amber-100";
              textColor = "text-amber-800";
            }

            if (isFallPlantingMonth) {
              bgColor = "bg-indigo-100";
              textColor = "text-indigo-800";
            }

            if (idx === currentMonth) {
              bgColor = bgColor.replace("100", "200");
              textColor = textColor.replace("800", "900");
            }

            return (
              <div
                key={idx}
                className={`${bgColor} ${textColor} px-2 py-1 text-xs rounded flex flex-1 items-center justify-center font-medium`}
              >
                {month.abbr}
              </div>
            );
          })}
        </div>
        <div className="flex gap-4 mt-2 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-100 rounded"></div>
            <span>Plant</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-amber-100"></div>
            <span>Harvest</span>
          </div>
          {calculatedDates.fallStartDate && (
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-indigo-100 rounded"></div>
              <span>Fall Plant</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-2 mt-4 text-sm">
          {isPlantingTimeNow && (
            <div className="flex items-center gap-2 p-2 text-green-700 border border-green-200 rounded bg-green-50">
              <Calendar size={16} className="text-green-600" />
              <span>
                <b>It's planting time now!</b> Good season to start planting.
              </span>
            </div>
          )}

          {isHarvestTimeNow && (
            <div className="flex items-center gap-2 p-2 border rounded bg-amber-50 text-amber-700 border-amber-200">
              <Calendar size={16} className="text-amber-600" />
              <span>
                <b>Harvest season!</b> Your crops should be ready for harvest
                now.
              </span>
            </div>
          )}

          {isFallPlantingTimeNow && (
            <div className="flex items-center gap-2 p-2 text-indigo-700 border border-indigo-200 rounded bg-indigo-50">
              <Calendar size={16} className="text-indigo-600" />
              <span>
                <b>Fall planting time!</b> Good time for a second crop.
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col overflow-y-auto bg-gray-50">
      <header className="p-4 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              {viewMode === "database"
                ? " Crop Database"
                : "Planting Calculator"}
            </h1>
            <p className="text-sm text-gray-500">
              Find information and optimal planting times for your crops
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setViewMode("database");
                window.history.replaceState(
                  null,
                  "Crop Database",
                  "/crop-database"
                );
              }}
              className={`px-3 py-1 rounded-md text-sm ${
                viewMode === "database"
                  ? "bg-green-600 text-white"
                  : "bg-white border border-gray-300 text-gray-700"
              }`}
            >
              Database
            </button>
            <button
              onClick={() => {
                setViewMode("calculator");
                window.history.replaceState(
                  null,
                  "Planting Calculator",
                  "/planting-calculator"
                );
              }}
              className={`px-3 py-1 rounded-md text-sm ${
                viewMode === "calculator"
                  ? "bg-green-600 text-white"
                  : "bg-white border border-gray-300 text-gray-700"
              }`}
            >
              Calculator
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 p-4 min-h-[70vh] overflow-auto">
        {viewMode === "database" ? (
          <div className="flex flex-col h-full">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Search crops by name or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCrops.map((crop) => (
                <div
                  key={crop.id}
                  className={`p-4 bg-white rounded-lg border hover:shadow-md cursor-pointer transition-all ${
                    selectedCrop?.id === crop.id
                      ? "border-green-500 ring-2 ring-green-200"
                      : "border-gray-200"
                  }`}
                  onClick={() => setSelectedCrop(crop)}
                >
                  <div className="flex items-center">
                    <div className="mr-3 text-3xl">{crop.image}</div>
                    <div>
                      <h3 className="font-medium text-gray-900">{crop.name}</h3>
                      <p className="text-sm text-gray-500">{crop.category}</p>
                    </div>
                  </div>
                </div>
              ))}

              {filteredCrops.length === 0 && (
                <div className="p-8 text-center text-gray-500 col-span-full">
                  <div className="mb-2">🔍</div>
                  <h3 className="mb-1 text-lg font-medium">No crops found</h3>
                  <p>Try adjusting your search terms</p>
                </div>
              )}
            </div>

            {selectedCrop && (
              <div className="flex-1 overflow-hidden bg-white border border-gray-200 rounded-lg">
                <div className="p-4 text-white bg-gradient-to-r from-green-700 to-green-600">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-3 text-4xl">{selectedCrop.image}</div>
                      <div>
                        <h2 className="text-xl font-semibold">
                          {selectedCrop.name}
                        </h2>
                        <p className="text-sm text-green-100">
                          {selectedCrop.basics.latinName}
                        </p>
                      </div>
                    </div>
                    <button
                      className="p-2 bg-white rounded-full bg-opacity-20 hover:bg-opacity-30"
                      onClick={() => setSelectedCrop(null)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="p-4 overflow-y-auto">
                  <div className="mb-4">
                    <div
                      className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer bg-gray-50"
                      onClick={() => toggleSection("basics")}
                    >
                      <h3 className="font-medium text-gray-900">
                        Basic Information
                      </h3>
                      {expandedSection === "basics" ? (
                        <ChevronUp size={18} className="text-gray-500" />
                      ) : (
                        <ChevronDown size={18} className="text-gray-500" />
                      )}
                    </div>

                    {expandedSection === "basics" && (
                      <div className="px-3 mt-2">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <p className="text-sm text-gray-500">
                              Growth Habit
                            </p>
                            <p className="text-gray-800">
                              {selectedCrop.basics.growthHabit}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Height</p>
                            <p className="text-gray-800">
                              {selectedCrop.basics.height}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Spacing</p>
                            <p className="text-gray-800">
                              {selectedCrop.basics.spacing}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Yield</p>
                            <p className="text-gray-800">
                              {selectedCrop.basics.yield}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <div
                      className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer bg-gray-50"
                      onClick={() => toggleSection("growing")}
                    >
                      <h3 className="font-medium text-gray-900">
                        Growing Information
                      </h3>
                      {expandedSection === "growing" ? (
                        <ChevronUp size={18} className="text-gray-500" />
                      ) : (
                        <ChevronDown size={18} className="text-gray-500" />
                      )}
                    </div>

                    {expandedSection === "growing" && (
                      <div className="px-3 mt-2">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <p className="text-sm text-gray-500">Sunlight</p>
                            <p className="text-gray-800">
                              {selectedCrop.growingInfo.sunlight}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Soil</p>
                            <p className="text-gray-800">
                              {selectedCrop.growingInfo.soil}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Water Needs</p>
                            <p className="text-gray-800">
                              {selectedCrop.growingInfo.waterNeeds}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Fertilizer</p>
                            <p className="text-gray-800">
                              {selectedCrop.growingInfo.fertilizer}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              Companion Plants
                            </p>
                            <p className="text-gray-800">
                              {selectedCrop.growingInfo.companions}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              Plants to Avoid
                            </p>
                            <p className="text-gray-800">
                              {selectedCrop.growingInfo.avoid}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <div
                      className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer bg-gray-50"
                      onClick={() => toggleSection("planting")}
                    >
                      <h3 className="font-medium text-gray-900">
                        Planting Information
                      </h3>
                      {expandedSection === "planting" ? (
                        <ChevronUp size={18} className="text-gray-500" />
                      ) : (
                        <ChevronDown size={18} className="text-gray-500" />
                      )}
                    </div>

                    {expandedSection === "planting" && (
                      <div className="px-3 mt-2">
                        <div className="mb-3">
                          <label className="block mb-1 text-sm text-gray-500">
                            USDA Hardiness Zone
                          </label>
                          <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            value={zone}
                            onChange={(e) => setZone(e.target.value)}
                          >
                            {Object.keys(selectedCrop.plantingDates).map(
                              (zoneOption) => (
                                <option key={zoneOption} value={zoneOption}>
                                  Zone {zoneOption}
                                </option>
                              )
                            )}
                          </select>
                        </div>

                        {selectedCrop.plantingDates[zone] ? (
                          <div className="p-3 rounded-lg bg-green-50">
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                              <div>
                                <p className="text-sm text-gray-500">
                                  Spring Planting Window
                                </p>
                                <p className="font-medium text-green-700">
                                  {selectedCrop.plantingDates[zone].start} to{" "}
                                  {selectedCrop.plantingDates[zone].end}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">
                                  Harvest Period
                                </p>
                                <p className="font-medium text-amber-700">
                                  {selectedCrop.plantingDates[zone].harvest}
                                </p>
                              </div>
                              {selectedCrop.plantingDates[zone].fall && (
                                <div>
                                  <p className="text-sm text-gray-500">
                                    Fall Planting Window
                                  </p>
                                  <p className="font-medium text-indigo-700">
                                    {selectedCrop.plantingDates[zone].fall}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="py-4 text-center text-gray-500">
                            No planting information available for selected zone
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <div
                      className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer bg-gray-50"
                      onClick={() => toggleSection("care")}
                    >
                      <h3 className="font-medium text-gray-900">
                        Care Instructions
                      </h3>
                      {expandedSection === "care" ? (
                        <ChevronUp size={18} className="text-gray-500" />
                      ) : (
                        <ChevronDown size={18} className="text-gray-500" />
                      )}
                    </div>

                    {expandedSection === "care" && (
                      <div className="px-3 mt-2">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <p className="text-sm text-gray-500">Pruning</p>
                            <p className="text-gray-800">
                              {selectedCrop.careInstructions.pruning}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Pests</p>
                            <p className="text-gray-800">
                              {selectedCrop.careInstructions.pests}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Diseases</p>
                            <p className="text-gray-800">
                              {selectedCrop.careInstructions.diseases}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Tips</p>
                            <p className="text-gray-800">
                              {selectedCrop.careInstructions.tips}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <div
                      className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer bg-gray-50"
                      onClick={() => toggleSection("harvest")}
                    >
                      <h3 className="font-medium text-gray-900">
                        Harvest & Storage
                      </h3>
                      {expandedSection === "harvest" ? (
                        <ChevronUp size={18} className="text-gray-500" />
                      ) : (
                        <ChevronDown size={18} className="text-gray-500" />
                      )}
                    </div>

                    {expandedSection === "harvest" && (
                      <div className="px-3 mt-2">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <p className="text-sm text-gray-500">
                              When to Harvest
                            </p>
                            <p className="text-gray-800">
                              {selectedCrop.harvestStorage.whenToHarvest}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              How to Harvest
                            </p>
                            <p className="text-gray-800">
                              {selectedCrop.harvestStorage.howToHarvest}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Storage</p>
                            <p className="text-gray-800">
                              {selectedCrop.harvestStorage.storage}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              Preservation
                            </p>
                            <p className="text-gray-800">
                              {selectedCrop.harvestStorage.preservation}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <div
                      className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer bg-gray-50"
                      onClick={() => toggleSection("varieties")}
                    >
                      <h3 className="font-medium text-gray-900">
                        Popular Varieties
                      </h3>
                      {expandedSection === "varieties" ? (
                        <ChevronUp size={18} className="text-gray-500" />
                      ) : (
                        <ChevronDown size={18} className="text-gray-500" />
                      )}
                    </div>

                    {expandedSection === "varieties" && (
                      <div className="px-3 mt-2">
                        <div className="flex flex-wrap gap-2">
                          {selectedCrop.varieties.map((variety, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 text-sm text-green-700 rounded-full bg-green-50"
                            >
                              {variety}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="p-4 bg-white border border-gray-200 rounded-lg">
            <h2 className="mb-4 text-lg font-semibold">
              Planting Date Calculator
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Select a Crop
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={selectedCrop ? selectedCrop.id : ""}
                  onChange={(e) => {
                    const cropId = parseInt(e.target.value);
                    const crop = cropDatabase.find((c) => c.id === cropId);
                    setSelectedCrop(crop);
                  }}
                >
                  <option value="">-- Select a crop --</option>
                  {cropDatabase.map((crop) => (
                    <option key={crop.id} value={crop.id}>
                      {crop.name}
                    </option>
                  ))}
                </select>

                <div className="mt-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Your Hardiness Zone
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={zone}
                    onChange={(e) => setZone(e.target.value)}
                  >
                    <option value="5a">Zone 5a</option>
                    <option value="5b">Zone 5b</option>
                    <option value="6a">Zone 6a</option>
                    <option value="6b">Zone 6b</option>
                    <option value="7a">Zone 7a</option>
                    <option value="7b">Zone 7b</option>
                    <option value="8a">Zone 8a</option>
                    <option value="8b">Zone 8b</option>
                    <option value="9a">Zone 9a</option>
                    <option value="9b">Zone 9b</option>
                  </select>
                </div>

                {selectedCrop && (
                  <div className="flex items-center p-3 mt-4 rounded-lg bg-green-50">
                    <div className="mr-3 text-3xl">{selectedCrop.image}</div>
                    <div>
                      <h3 className="font-medium">{selectedCrop.name}</h3>
                      <p className="text-sm text-gray-600">
                        {selectedCrop.basics.latinName}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div>
                {selectedCrop && calculatedDates ? (
                  <>
                    {calculatedDates.error ? (
                      <div className="p-4 text-yellow-700 border border-yellow-200 rounded-lg bg-yellow-50">
                        <div className="flex items-center gap-2 mb-2">
                          <Info size={18} />
                          <span className="font-medium">Note</span>
                        </div>
                        <p>{calculatedDates.error}</p>
                      </div>
                    ) : (
                      <div>
                        <h3 className="mb-3 font-medium text-gray-900">
                          Recommended Dates for {selectedCrop.name} in Zone{" "}
                          {zone}
                        </h3>

                        <div className="space-y-3">
                          <div className="p-3 border border-green-100 rounded-md bg-green-50">
                            <p className="text-sm text-gray-500">
                              Spring Planting Period
                            </p>
                            <p className="font-medium">
                              {formatDate(calculatedDates.startDate)} to{" "}
                              {formatDate(calculatedDates.endDate)}
                            </p>
                          </div>

                          <div className="p-3 border rounded-md bg-amber-50 border-amber-100">
                            <p className="text-sm text-gray-500">
                              Expected Harvest Period
                            </p>
                            <p className="font-medium">
                              {formatDate(calculatedDates.harvestStartDate)} to{" "}
                              {formatDate(calculatedDates.harvestEndDate)}
                            </p>
                          </div>

                          {calculatedDates.fallStartDate && (
                            <div className="p-3 border border-indigo-100 rounded-md bg-indigo-50">
                              <p className="text-sm text-gray-500">
                                Fall Planting Period (Second Crop)
                              </p>
                              <p className="font-medium">
                                {formatDate(calculatedDates.fallStartDate)} to{" "}
                                {formatDate(calculatedDates.fallEndDate)}
                              </p>
                            </div>
                          )}
                        </div>

                        {getSeasonalTimeline()}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full p-8 text-center text-gray-500">
                    <HelpCircle size={48} className="mb-3 text-gray-300" />
                    <h3 className="mb-1 text-lg font-medium">
                      Planting Calculator
                    </h3>
                    <p>
                      Select a crop and your zone to calculate optimal planting
                      dates
                    </p>
                  </div>
                )}
              </div>
            </div>

            {selectedCrop && !calculatedDates?.error && (
              <div className="pt-4 mt-6 border-t border-gray-200">
                <h3 className="mb-3 font-medium text-gray-900">
                  Growing Tips for {selectedCrop.name}
                </h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="p-3 border border-blue-100 rounded-md bg-blue-50">
                    <p className="mb-1 text-sm font-medium text-blue-800">
                      Growing Conditions
                    </p>
                    <p className="text-sm">
                      {selectedCrop.growingInfo.sunlight}
                    </p>
                    <p className="text-sm">{selectedCrop.growingInfo.soil}</p>
                  </div>

                  <div className="p-3 border border-purple-100 rounded-md bg-purple-50">
                    <p className="mb-1 text-sm font-medium text-purple-800">
                      Care Tips
                    </p>
                    <p className="text-sm">
                      {selectedCrop.careInstructions.tips}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-center mt-4">
                  <button
                    className="flex items-center gap-1 text-green-600 hover:text-green-800"
                    onClick={() => {
                      setViewMode("database");
                      window.history.replaceState(
                        null,
                        "Crop Database",
                        "/crop-database"
                      );
                      setExpandedSection("growing");
                    }}
                  >
                    <span>View full growing information</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <footer className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Data based on USDA hardiness zones
          </p>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Info size={14} />
            <span>Results may vary based on local microclimate</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
