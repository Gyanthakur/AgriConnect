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
      name: "Wheat (Gehun)",
      category: "Cereal Grain",
      image: "🌾",
      basics: {
        latinName: "Triticum aestivum",
        growthHabit: "Annual crop",
        height: "2-4 feet",
        spacing: "20-25 cm between rows",
        yield: "3-5 tonnes per hectare",
      },
      growingInfo: {
        sunlight: "Full sun",
        soil: "Loamy to clayey soil, well-drained",
        waterNeeds: "Moderate, 4-6 irrigations during growing season",
        fertilizer: "NPK mixture with higher nitrogen during early growth",
        companions: "Gram, mustard, coriander",
        avoid: "Rice fields recently harvested without proper preparation",
      },
      plantingDates: {
        "North India": {
          start: "Late October",
          end: "Mid November",
          harvest: "March - April",
        },
        "Central India": {
          start: "Early November",
          end: "Late November",
          harvest: "February - March",
        },
        "South India": {
          start: "Mid November",
          end: "Mid December",
          harvest: "February - March",
        },
      },
      careInstructions: {
        pruning: "Not required",
        pests: "Watch for aphids, termites, and stem borers",
        diseases: "Rust, powdery mildew, and leaf blight",
        tips: "First irrigation should be light, subsequent ones heavier. Control weeds during first 30-40 days",
      },
      harvestStorage: {
        whenToHarvest: "When heads turn golden-brown and grains become hard",
        howToHarvest: "Cut with sickle or use combine harvester",
        storage: "Store in clean, dry gunny bags in cool, dry place",
        preservation:
          "Treat with neem leaves or use approved storage pesticides to prevent weevils",
      },
      varieties: [
        "HD-2967 (high yield)",
        "PBW-343 (disease resistant)",
        "WH-542 (early maturing)",
        "Lokwan (good quality)",
        "Sharbati (premium quality)",
      ],
    },
    {
      id: 2,
      name: "Rice (Chawal/Dhan)",
      category: "Cereal Grain",
      image: "🍚",
      basics: {
        latinName: "Oryza sativa",
        growthHabit: "Annual grass",
        height: "2-3 feet",
        spacing: "20 cm between plants in rows 20 cm apart",
        yield: "4-6 tonnes per hectare",
      },
      growingInfo: {
        sunlight: "Full sun",
        soil: "Clayey soil that retains water well",
        waterNeeds: "High - standing water for most of growing period",
        fertilizer: "NPK with emphasis on nitrogen during vegetative growth",
        companions: "Azolla (water fern), fish in paddy fields",
        avoid: "Plants that require well-drained soil",
      },
      plantingDates: {
        "Kharif (Monsoon)": {
          start: "June",
          end: "July",
          harvest: "October - November",
        },
        "Rabi (Winter)": {
          start: "November",
          end: "December",
          harvest: "March - April",
        },
        "Summer (Zaid)": {
          start: "February",
          end: "March",
          harvest: "June - July",
        },
      },
      careInstructions: {
        pruning: "Not required",
        pests: "Stem borers, leaf folders, gall midge, brown planthoppers",
        diseases: "Blast, bacterial leaf blight, sheath blight",
        tips: "Maintain 2-5 cm water level in field during growth, drain before harvest",
      },
      harvestStorage: {
        whenToHarvest: "When 80-85% of grains turn golden yellow",
        howToHarvest: "Cut using sickle or mechanical harvester",
        storage: "Dry properly to 12-14% moisture before storing in jute bags",
        preservation:
          "Keep in dry place free from rodents, use neem leaves to repel insects",
      },
      varieties: [
        "Basmati (aromatic)",
        "IR-36 (high yield)",
        "Swarna (disease resistant)",
        "Pusa Basmati (premium quality)",
        "MTU-7029 (popular in eastern India)",
      ],
    },
    {
      id: 3,
      name: "Gram (Chana)",
      category: "Pulse/Legume",
      image: "🌱",
      basics: {
        latinName: "Cicer arietinum",
        growthHabit: "Annual bush",
        height: "1-2 feet",
        spacing: "30 cm between rows, 10 cm between plants",
        yield: "1-2 tonnes per hectare",
      },
      growingInfo: {
        sunlight: "Full sun",
        soil: "Sandy loam to medium black soil, well-drained",
        waterNeeds: "Low to moderate, 2-3 irrigations during entire season",
        fertilizer:
          "Low nitrogen, higher phosphorus. Often inoculated with rhizobium bacteria",
        companions: "Wheat, mustard, coriander",
        avoid: "Other pulses, onion, garlic",
      },
      plantingDates: {
        "North India": {
          start: "Mid October",
          end: "Mid November",
          harvest: "March - April",
        },
        "Central India": {
          start: "Late October",
          end: "Late November",
          harvest: "February - March",
        },
        "South India": {
          start: "November",
          end: "Early December",
          harvest: "February - March",
        },
      },
      careInstructions: {
        pruning: "Not required",
        pests: "Pod borer, aphids, cutworm",
        diseases: "Wilt, root rot, Ascochyta blight",
        tips: "Avoid overwatering as it promotes diseases, best grown in residual moisture",
      },
      harvestStorage: {
        whenToHarvest: "When plants turn yellowish-brown and pods are dry",
        howToHarvest: "Uproot entire plants or cut at base with sickle",
        storage:
          "Dry properly in sun before storing in gunny bags or clay/metal containers",
        preservation: "Mix with neem leaves or ash to prevent pest infestation",
      },
      varieties: [
        "Desi (small, dark)",
        "Kabuli (large, light colored)",
        "JG-11 (drought resistant)",
        "Vijay (wilt resistant)",
        "JAKI-9218 (high yielding)",
      ],
    },
    {
      id: 4,
      name: "Mustard (Sarson)",
      category: "Oilseed",
      image: "🌼",
      basics: {
        latinName: "Brassica juncea",
        growthHabit: "Annual erect herb",
        height: "3-5 feet",
        spacing: "30-45 cm between rows, 10-15 cm between plants",
        yield: "1-1.5 tonnes per hectare",
      },
      growingInfo: {
        sunlight: "Full sun",
        soil: "Loamy soil, well-drained",
        waterNeeds: "Low to moderate, 2-3 irrigations",
        fertilizer: "NPK with emphasis on nitrogen and sulfur",
        companions: "Wheat, gram, coriander",
        avoid: "Other brassica family crops",
      },
      plantingDates: {
        "North India": {
          start: "Mid October",
          end: "Early November",
          harvest: "February - March",
        },
        "Central India": {
          start: "Late October",
          end: "Mid November",
          harvest: "February",
        },
        "Eastern India": {
          start: "Early October",
          end: "Late October",
          harvest: "January - February",
        },
      },
      careInstructions: {
        pruning: "Not required",
        pests: "Aphids, painted bug, sawfly",
        diseases: "White rust, downy mildew, Alternaria blight",
        tips: "First irrigation 30-35 days after sowing, critical for good yield",
      },
      harvestStorage: {
        whenToHarvest: "When 75-80% of pods turn yellow",
        howToHarvest: "Cut plants at base with sickle",
        storage:
          "Dry properly to reduce moisture content before threshing and storing",
        preservation: "Store in dry gunny bags or traditional containers",
      },
      varieties: [
        "Pusa Bold (high yield)",
        "Varuna (widely adapted)",
        "PM-26 (early maturing)",
        "RH-749 (disease resistant)",
        "Kranti (drought tolerant)",
      ],
    },
    {
      id: 5,
      name: "Cotton (Kapas)",
      category: "Fiber Crop",
      image: "🧶",
      basics: {
        latinName: "Gossypium hirsutum",
        growthHabit: "Annual shrub",
        height: "3-5 feet",
        spacing: "60-75 cm between rows, 30-45 cm between plants",
        yield: "15-20 quintals per hectare",
      },
      growingInfo: {
        sunlight: "Full sun",
        soil: "Black cotton soil or deep loamy soil",
        waterNeeds: "Moderate, 5-6 irrigations during growing season",
        fertilizer: "NPK with higher nitrogen during vegetative phase",
        companions: "Pulses, coriander, marigold",
        avoid: "Other cotton fields (to reduce pest pressure)",
      },
      plantingDates: {
        "North India": {
          start: "April",
          end: "May",
          harvest: "October - December",
        },
        "Central India": {
          start: "June",
          end: "July",
          harvest: "November - February",
        },
        "South India": {
          start: "July",
          end: "August",
          harvest: "January - March",
        },
      },
      careInstructions: {
        pruning:
          "Topping may be required to control height and promote branching",
        pests: "Bollworms, whitefly, jassids, aphids",
        diseases: "Bacterial blight, root rot, leaf curl virus",
        tips: "Proper spacing important, remove weeds early, practice integrated pest management",
      },
      harvestStorage: {
        whenToHarvest: "When bolls crack open exposing white cotton",
        howToHarvest: "Hand picking in 3-4 rounds as bolls mature",
        storage: "Store in clean, dry place away from moisture",
        preservation: "Avoid storing wet cotton to prevent yellowing",
      },
      varieties: [
        "Bt Cotton hybrids (pest resistant)",
        "Desi Cotton (indigenous)",
        "DCH-32 (long staple)",
        "MCU-5 (medium staple)",
        "LRA-5166 (disease resistant)",
      ],
    },
    {
      id: 6,
      name: "Sugarcane (Ganna)",
      category: "Cash Crop",
      image: "🍯",
      basics: {
        latinName: "Saccharum officinarum",
        growthHabit: "Perennial tall grass",
        height: "8-15 feet",
        spacing: "75-90 cm between rows",
        yield: "70-100 tonnes per hectare",
      },
      growingInfo: {
        sunlight: "Full sun",
        soil: "Deep, rich loamy soil with good drainage",
        waterNeeds: "High, regular irrigation every 10-15 days",
        fertilizer: "High nitrogen with balanced phosphorus and potassium",
        companions: "Potato, onion, garlic (as intercrops in early stage)",
        avoid: "Tall crops that would shade sugarcane",
      },
      plantingDates: {
        "North India": {
          start: "February",
          end: "March",
          harvest: "December - March (after 10-12 months)",
        },
        "Central India": {
          start: "October",
          end: "November",
          harvest: "November - February (after 12-14 months)",
        },
        "South India": {
          start: "December",
          end: "January",
          harvest: "December - March (after 12 months)",
        },
      },
      careInstructions: {
        pruning: "Detrashing (removing dry leaves) may be beneficial",
        pests: "Borers, pyrilla, termites, whitefly",
        diseases: "Red rot, smut, wilt, ratoon stunting",
        tips: "Trench planting recommended, practice earthing up after 5-6 months",
      },
      harvestStorage: {
        whenToHarvest:
          "When canes are mature and sugar content is high (brix reading)",
        howToHarvest: "Cut at base with sharp knife or sickle",
        storage: "Process quickly after harvesting, can't be stored long",
        preservation:
          "Transport to sugar mill within 24-48 hours of harvesting",
      },
      varieties: [
        "Co-0238 (high sugar content)",
        "CoJ-64 (early maturing)",
        "Co-86032 (high yield)",
        "CoC-671 (drought resistant)",
        "BO-130 (disease resistant)",
      ],
    },
    {
      id: 7,
      name: "Potato (Aloo)",
      category: "Root Vegetable",
      image: "🥔",
      basics: {
        latinName: "Solanum tuberosum",
        growthHabit: "Herbaceous annual",
        height: "1.5-2 feet above ground",
        spacing: "60 cm between rows, 20 cm between plants",
        yield: "20-25 tonnes per hectare",
      },
      growingInfo: {
        sunlight: "Full sun",
        soil: "Sandy loam to loamy soil, well-drained",
        waterNeeds: "Moderate, consistent moisture important",
        fertilizer: "Balanced NPK with higher phosphorus and potassium",
        companions: "Marigold, beans, corn, cabbage",
        avoid: "Tomato, eggplant (same family, share diseases)",
      },
      plantingDates: {
        "North India": {
          start: "October",
          end: "November",
          harvest: "January - February",
        },
        Hills: {
          start: "March",
          end: "April",
          harvest: "August - September",
        },
        "Plateau Region": {
          start: "September",
          end: "October",
          harvest: "December - January",
        },
      },
      careInstructions: {
        pruning: "Not required",
        pests: "Potato tuber moth, aphids, whitefly",
        diseases: "Late blight, early blight, bacterial wilt",
        tips: "Earth up soil around plants when they reach 6 inches tall, repeat after 2-3 weeks",
      },
      harvestStorage: {
        whenToHarvest: "When plant tops begin to yellow and die back",
        howToHarvest: "Dig carefully with spade or khurpi (trowel)",
        storage: "Store in cool, dark place with good ventilation",
        preservation:
          "Can be stored 2-4 months in well-ventilated cool storage",
      },
      varieties: [
        "Kufri Jyoti (widely adapted)",
        "Kufri Sindhuri (red skin)",
        "Kufri Chandramukhi (early harvest)",
        "Kufri Lauvkar (short duration)",
        "Kufri Bahar (heat tolerant)",
      ],
    },
    {
      id: 8,
      name: "Turmeric (Haldi)",
      category: "Spice Crop",
      image: "🧡",
      basics: {
        latinName: "Curcuma longa",
        growthHabit: "Herbaceous perennial",
        height: "2-3 feet",
        spacing: "30 cm between rows, 15-20 cm between plants",
        yield: "20-25 tonnes per hectare (fresh rhizomes)",
      },
      growingInfo: {
        sunlight: "Partial shade to full sun",
        soil: "Loamy soil rich in organic matter",
        waterNeeds: "Moderate to high, well-distributed rainfall/irrigation",
        fertilizer: "Organic manure and balanced NPK",
        companions: "Chili, onion, marigold",
        avoid: "Root crops that compete for space",
      },
      plantingDates: {
        Plains: {
          start: "April",
          end: "June",
          harvest: "January - March (after 9 months)",
        },
        Hills: {
          start: "February",
          end: "March",
          harvest: "December - January (after 9-10 months)",
        },
        "South India": {
          start: "May",
          end: "June",
          harvest: "February - April (after 9 months)",
        },
      },
      careInstructions: {
        pruning: "Not required",
        pests: "Shoot borer, rhizome scale, thrips",
        diseases: "Rhizome rot, leaf spot, leaf blotch",
        tips: "Mulch after planting, maintain soil moisture but avoid waterlogging",
      },
      harvestStorage: {
        whenToHarvest:
          "When leaves turn yellow and start drying (8-9 months after planting)",
        howToHarvest: "Dig carefully with spade to avoid damage to rhizomes",
        storage: "Clean, boil, and dry rhizomes before storage",
        preservation: "Store dried turmeric in airtight containers",
      },
      varieties: [
        "Salem (high curcumin)",
        "Alleppey (deep yellow)",
        "Roma (disease resistant)",
        "Krishna (high yield)",
        "Suguna (early maturing)",
      ],
    },
    {
      id: 9,
      name: "Tomato (Tamatar)",
      category: "Fruit Vegetable",
      image: "🍅",
      basics: {
        latinName: "Solanum lycopersicum",
        growthHabit: "Annual vine/bush",
        height: "2-6 feet depending on variety",
        spacing: "60 cm between rows, 45 cm between plants",
        yield: "20-25 tonnes per hectare",
      },
      growingInfo: {
        sunlight: "Full sun (6-8 hours)",
        soil: "Well-draining loamy soil",
        waterNeeds: "Consistent moisture, avoid wetting foliage",
        fertilizer: "Balanced fertilizer with higher phosphorus when fruiting",
        companions: "Basil, marigold, onion, garlic",
        avoid: "Potato, fennel, cabbage family",
      },
      plantingDates: {
        "North India": {
          start: "October",
          end: "November",
          harvest: "February - April",
        },
        "Central India": {
          start: "July",
          end: "August",
          harvest: "November - January",
        },
        "South India": {
          start: "June",
          end: "July",
          harvest: "October - December",
        },
      },
      careInstructions: {
        pruning: "Remove suckers for indeterminate varieties",
        pests: "Fruit borer, whitefly, leaf miner, aphids",
        diseases: "Early blight, late blight, leaf curl virus",
        tips: "Stake or cage plants, mulch soil to retain moisture",
      },
      harvestStorage: {
        whenToHarvest: "When fully colored but still firm",
        howToHarvest: "Twist gently or cut with scissors",
        storage: "Room temperature for best flavor, up to 5 days",
        preservation: "Can be sun-dried or made into puree for longer storage",
      },
      varieties: [
        "Pusa Ruby (common variety)",
        "Arka Vikas (high yield)",
        "Pusa Hybrid-8 (disease resistant)",
        "Punjab Chhuhara (processing type)",
        "Arka Saurabh (suited for rainy season)",
      ],
    },
    {
      id: 10,
      name: "Onion (Pyaaz)",
      category: "Bulb Vegetable",
      image: "🧅",
      basics: {
        latinName: "Allium cepa",
        growthHabit: "Biennial grown as annual",
        height: "1-2 feet",
        spacing: "15 cm between plants in rows 20 cm apart",
        yield: "25-30 tonnes per hectare",
      },
      growingInfo: {
        sunlight: "Full sun",
        soil: "Sandy loam to loamy soil, well-drained",
        waterNeeds: "Moderate, regular but not excessive",
        fertilizer: "NPK with higher potassium during bulb formation",
        companions: "Carrots, tomatoes, marigold",
        avoid: "Beans, peas, asparagus",
      },
      plantingDates: {
        "Kharif (Monsoon)": {
          start: "May",
          end: "June",
          harvest: "November - December",
        },
        "Rabi (Winter)": {
          start: "October",
          end: "November",
          harvest: "March - April",
        },
        Summer: {
          start: "January",
          end: "February",
          harvest: "May - June",
        },
      },
      careInstructions: {
        pruning: "Not required",
        pests: "Thrips, onion fly, mites",
        diseases: "Purple blotch, downy mildew, basal rot",
        tips: "Stop watering when tops begin to fall over near maturity",
      },
      harvestStorage: {
        whenToHarvest:
          "When tops fall over and begin to dry (70-80% tops down)",
        howToHarvest:
          "Pull or dig carefully, leave in field to dry for 2-3 days",
        storage: "Cure properly by drying tops and outer skins",
        preservation:
          "Store in mesh bags in cool, dry place with good ventilation",
      },
      varieties: [
        "Nasik Red (common red variety)",
        "Pusa Red (good storage)",
        "Agrifound Light Red (high yield)",
        "Pusa White Round (white variety)",
        "N-53 (suited for kharif season)",
      ],
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
                    {[
                      ...new Set(
                        cropDatabase
                          .map((t) => Object.keys(t.plantingDates || {}))
                          .flat()
                      ),
                    ].map((zone) => (
                      <option key={zone} value={zone}>
                        {zone}
                      </option>
                    ))}
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
