import React, { useState, useEffect } from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Filter,
  Search,
  Calendar,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
} from "lucide-react";

// Sample market price data for Indian crops
const marketPrices = [
  {
    name: "Rice - Basmati",
    price: "₹9500",
    numericPrice: 9500,
    region: "Punjab",
    timestamp: "2024-11-15T08:30:00Z",
    trend: "up",
    predictedPrice: "₹9800",
    predictedNumeric: 9800,
    priceHistory: [
      { date: "2024-06-15", price: 8700 },
      { date: "2024-07-15", price: 8900 },
      { date: "2024-08-15", price: 9100 },
      { date: "2024-09-15", price: 9200 },
      { date: "2024-10-15", price: 9300 },
      { date: "2024-11-15", price: 9500 },
    ],
  },
  {
    name: "Rice - Basmati",
    price: "₹9800",
    numericPrice: 9800,
    region: "Tamil Nadu",
    timestamp: "2024-11-15T08:30:00Z",
    trend: "up",
    predictedPrice: "₹10200",
    predictedNumeric: 10200,
    priceHistory: [
      { date: "2024-06-15", price: 9000 },
      { date: "2024-07-15", price: 9200 },
      { date: "2024-08-15", price: 9400 },
      { date: "2024-09-15", price: 9500 },
      { date: "2024-10-15", price: 9600 },
      { date: "2024-11-15", price: 9800 },
    ],
  },
  {
    name: "Rice - Basmati",
    price: "₹9650",
    numericPrice: 9650,
    region: "Haryana",
    timestamp: "2024-11-15T08:45:00Z",
    trend: "up",
    predictedPrice: "₹9900",
    predictedNumeric: 9900,
    priceHistory: [
      { date: "2024-06-15", price: 8850 },
      { date: "2024-07-15", price: 9050 },
      { date: "2024-08-15", price: 9250 },
      { date: "2024-09-15", price: 9350 },
      { date: "2024-10-15", price: 9500 },
      { date: "2024-11-15", price: 9650 },
    ],
  },
  {
    name: "Rice - Sona Masoori",
    price: "₹6200",
    numericPrice: 6200,
    region: "Andhra Pradesh",
    timestamp: "2024-11-15T09:15:00Z",
    trend: "up",
    predictedPrice: "₹6500",
    predictedNumeric: 6500,
    priceHistory: [
      { date: "2024-06-15", price: 5600 },
      { date: "2024-07-15", price: 5750 },
      { date: "2024-08-15", price: 5900 },
      { date: "2024-09-15", price: 6000 },
      { date: "2024-10-15", price: 6100 },
      { date: "2024-11-15", price: 6200 },
    ],
  },
  {
    name: "Rice - Sona Masoori",
    price: "₹6150",
    numericPrice: 6150,
    region: "Telangana",
    timestamp: "2024-11-15T09:20:00Z",
    trend: "up",
    predictedPrice: "₹6400",
    predictedNumeric: 6400,
    priceHistory: [
      { date: "2024-06-15", price: 5550 },
      { date: "2024-07-15", price: 5700 },
      { date: "2024-08-15", price: 5850 },
      { date: "2024-09-15", price: 5950 },
      { date: "2024-10-15", price: 6050 },
      { date: "2024-11-15", price: 6150 },
    ],
  },
  {
    name: "Wheat",
    price: "₹2200",
    numericPrice: 2200,
    region: "Madhya Pradesh",
    timestamp: "2024-11-14T10:15:00Z",
    trend: "down",
    predictedPrice: "₹2100",
    predictedNumeric: 2100,
    priceHistory: [
      { date: "2024-06-15", price: 2400 },
      { date: "2024-07-15", price: 2350 },
      { date: "2024-08-15", price: 2300 },
      { date: "2024-09-15", price: 2250 },
      { date: "2024-10-15", price: 2220 },
      { date: "2024-11-15", price: 2200 },
    ],
  },
  {
    name: "Wheat",
    price: "₹2150",
    numericPrice: 2150,
    region: "Uttar Pradesh",
    timestamp: "2024-11-14T09:45:00Z",
    trend: "down",
    predictedPrice: "₹2050",
    predictedNumeric: 2050,
    priceHistory: [
      { date: "2024-06-15", price: 2350 },
      { date: "2024-07-15", price: 2300 },
      { date: "2024-08-15", price: 2250 },
      { date: "2024-09-15", price: 2200 },
      { date: "2024-10-15", price: 2170 },
      { date: "2024-11-15", price: 2150 },
    ],
  },
  {
    name: "Wheat",
    price: "₹2250",
    numericPrice: 2250,
    region: "Punjab",
    timestamp: "2024-11-14T10:30:00Z",
    trend: "down",
    predictedPrice: "₹2180",
    predictedNumeric: 2180,
    priceHistory: [
      { date: "2024-06-15", price: 2450 },
      { date: "2024-07-15", price: 2400 },
      { date: "2024-08-15", price: 2350 },
      { date: "2024-09-15", price: 2320 },
      { date: "2024-10-15", price: 2280 },
      { date: "2024-11-15", price: 2250 },
    ],
  },
  {
    name: "Cotton",
    price: "₹6500",
    numericPrice: 6500,
    region: "Gujarat",
    timestamp: "2024-11-15T07:20:00Z",
    trend: "up",
    predictedPrice: "₹6800",
    predictedNumeric: 6800,
    priceHistory: [
      { date: "2024-06-15", price: 5900 },
      { date: "2024-07-15", price: 6000 },
      { date: "2024-08-15", price: 6200 },
      { date: "2024-09-15", price: 6300 },
      { date: "2024-10-15", price: 6400 },
      { date: "2024-11-15", price: 6500 },
    ],
  },
  {
    name: "Cotton",
    price: "₹6350",
    numericPrice: 6350,
    region: "Maharashtra",
    timestamp: "2024-11-15T08:00:00Z",
    trend: "stable",
    predictedPrice: "₹6400",
    predictedNumeric: 6400,
    priceHistory: [
      { date: "2024-06-15", price: 6300 },
      { date: "2024-07-15", price: 6320 },
      { date: "2024-08-15", price: 6340 },
      { date: "2024-09-15", price: 6330 },
      { date: "2024-10-15", price: 6340 },
      { date: "2024-11-15", price: 6350 },
    ],
  },
  {
    name: "Cotton",
    price: "₹6420",
    numericPrice: 6420,
    region: "Telangana",
    timestamp: "2024-11-15T07:45:00Z",
    trend: "up",
    predictedPrice: "₹6650",
    predictedNumeric: 6650,
    priceHistory: [
      { date: "2024-06-15", price: 5950 },
      { date: "2024-07-15", price: 6050 },
      { date: "2024-08-15", price: 6150 },
      { date: "2024-09-15", price: 6250 },
      { date: "2024-10-15", price: 6350 },
      { date: "2024-11-15", price: 6420 },
    ],
  },
  {
    name: "Sugarcane",
    price: "₹3200",
    numericPrice: 3200,
    region: "Uttar Pradesh",
    timestamp: "2024-11-14T11:30:00Z",
    trend: "up",
    predictedPrice: "₹3400",
    predictedNumeric: 3400,
    priceHistory: [
      { date: "2024-06-15", price: 2900 },
      { date: "2024-07-15", price: 3000 },
      { date: "2024-08-15", price: 3050 },
      { date: "2024-09-15", price: 3100 },
      { date: "2024-10-15", price: 3150 },
      { date: "2024-11-15", price: 3200 },
    ],
  },
  {
    name: "Sugarcane",
    price: "₹3150",
    numericPrice: 3150,
    region: "Karnataka",
    timestamp: "2024-11-14T12:00:00Z",
    trend: "up",
    predictedPrice: "₹3300",
    predictedNumeric: 3300,
    priceHistory: [
      { date: "2024-06-15", price: 2850 },
      { date: "2024-07-15", price: 2900 },
      { date: "2024-08-15", price: 3000 },
      { date: "2024-09-15", price: 3050 },
      { date: "2024-10-15", price: 3100 },
      { date: "2024-11-15", price: 3150 },
    ],
  },
  {
    name: "Sugarcane",
    price: "₹3180",
    numericPrice: 3180,
    region: "Maharashtra",
    timestamp: "2024-11-14T11:45:00Z",
    trend: "up",
    predictedPrice: "₹3350",
    predictedNumeric: 3350,
    priceHistory: [
      { date: "2024-06-15", price: 2880 },
      { date: "2024-07-15", price: 2950 },
      { date: "2024-08-15", price: 3020 },
      { date: "2024-09-15", price: 3080 },
      { date: "2024-10-15", price: 3130 },
      { date: "2024-11-15", price: 3180 },
    ],
  },
  {
    name: "Onion",
    price: "₹2800",
    numericPrice: 2800,
    region: "Maharashtra",
    timestamp: "2024-11-15T06:45:00Z",
    trend: "up",
    predictedPrice: "₹3100",
    predictedNumeric: 3100,
    priceHistory: [
      { date: "2024-06-15", price: 2000 },
      { date: "2024-07-15", price: 2200 },
      { date: "2024-08-15", price: 2400 },
      { date: "2024-09-15", price: 2500 },
      { date: "2024-10-15", price: 2650 },
      { date: "2024-11-15", price: 2800 },
    ],
  },
  {
    name: "Onion",
    price: "₹2650",
    numericPrice: 2650,
    region: "Karnataka",
    timestamp: "2024-11-15T07:00:00Z",
    trend: "up",
    predictedPrice: "₹2900",
    predictedNumeric: 2900,
    priceHistory: [
      { date: "2024-06-15", price: 1900 },
      { date: "2024-07-15", price: 2100 },
      { date: "2024-08-15", price: 2300 },
      { date: "2024-09-15", price: 2400 },
      { date: "2024-10-15", price: 2550 },
      { date: "2024-11-15", price: 2650 },
    ],
  },
  {
    name: "Onion",
    price: "₹2720",
    numericPrice: 2720,
    region: "Gujarat",
    timestamp: "2024-11-15T07:15:00Z",
    trend: "up",
    predictedPrice: "₹3000",
    predictedNumeric: 3000,
    priceHistory: [
      { date: "2024-06-15", price: 1950 },
      { date: "2024-07-15", price: 2150 },
      { date: "2024-08-15", price: 2350 },
      { date: "2024-09-15", price: 2450 },
      { date: "2024-10-15", price: 2600 },
      { date: "2024-11-15", price: 2720 },
    ],
  },
  {
    name: "Potato",
    price: "₹1800",
    numericPrice: 1800,
    region: "Uttar Pradesh",
    timestamp: "2024-11-14T14:20:00Z",
    trend: "down",
    predictedPrice: "₹1750",
    predictedNumeric: 1750,
    priceHistory: [
      { date: "2024-06-15", price: 2000 },
      { date: "2024-07-15", price: 1950 },
      { date: "2024-08-15", price: 1900 },
      { date: "2024-09-15", price: 1850 },
      { date: "2024-10-15", price: 1820 },
      { date: "2024-11-15", price: 1800 },
    ],
  },
  {
    name: "Potato",
    price: "₹1900",
    numericPrice: 1900,
    region: "West Bengal",
    timestamp: "2024-11-14T13:55:00Z",
    trend: "stable",
    predictedPrice: "₹1950",
    predictedNumeric: 1950,
    priceHistory: [
      { date: "2024-06-15", price: 1880 },
      { date: "2024-07-15", price: 1890 },
      { date: "2024-08-15", price: 1900 },
      { date: "2024-09-15", price: 1880 },
      { date: "2024-10-15", price: 1890 },
      { date: "2024-11-15", price: 1900 },
    ],
  },
  {
    name: "Potato",
    price: "₹1850",
    numericPrice: 1850,
    region: "Punjab",
    timestamp: "2024-11-14T14:10:00Z",
    trend: "down",
    predictedPrice: "₹1800",
    predictedNumeric: 1800,
    priceHistory: [
      { date: "2024-06-15", price: 2050 },
      { date: "2024-07-15", price: 2000 },
      { date: "2024-08-15", price: 1950 },
      { date: "2024-09-15", price: 1920 },
      { date: "2024-10-15", price: 1880 },
      { date: "2024-11-15", price: 1850 },
    ],
  },
  {
    name: "Soybean",
    price: "₹4200",
    numericPrice: 4200,
    region: "Madhya Pradesh",
    timestamp: "2024-11-15T09:10:00Z",
    trend: "up",
    predictedPrice: "₹4450",
    predictedNumeric: 4450,
    priceHistory: [
      { date: "2024-06-15", price: 3800 },
      { date: "2024-07-15", price: 3900 },
      { date: "2024-08-15", price: 4000 },
      { date: "2024-09-15", price: 4050 },
      { date: "2024-10-15", price: 4150 },
      { date: "2024-11-15", price: 4200 },
    ],
  },
  {
    name: "Soybean",
    price: "₹4150",
    numericPrice: 4150,
    region: "Maharashtra",
    timestamp: "2024-11-15T09:30:00Z",
    trend: "up",
    predictedPrice: "₹4400",
    predictedNumeric: 4400,
    priceHistory: [
      { date: "2024-06-15", price: 3750 },
      { date: "2024-07-15", price: 3850 },
      { date: "2024-08-15", price: 3950 },
      { date: "2024-09-15", price: 4000 },
      { date: "2024-10-15", price: 4100 },
      { date: "2024-11-15", price: 4150 },
    ],
  },
  {
    name: "Soybean",
    price: "₹4180",
    numericPrice: 4180,
    region: "Rajasthan",
    timestamp: "2024-11-15T09:45:00Z",
    trend: "up",
    predictedPrice: "₹4420",
    predictedNumeric: 4420,
    priceHistory: [
      { date: "2024-06-15", price: 3780 },
      { date: "2024-07-15", price: 3880 },
      { date: "2024-08-15", price: 3980 },
      { date: "2024-09-15", price: 4030 },
      { date: "2024-10-15", price: 4120 },
      { date: "2024-11-15", price: 4180 },
    ],
  },
  {
    name: "Tomato",
    price: "₹2500",
    numericPrice: 2500,
    region: "Karnataka",
    timestamp: "2024-11-15T05:15:00Z",
    trend: "up",
    predictedPrice: "₹2800",
    predictedNumeric: 2800,
    priceHistory: [
      { date: "2024-06-15", price: 1800 },
      { date: "2024-07-15", price: 2000 },
      { date: "2024-08-15", price: 2200 },
      { date: "2024-09-15", price: 2300 },
      { date: "2024-10-15", price: 2400 },
      { date: "2024-11-15", price: 2500 },
    ],
  },
  {
    name: "Tomato",
    price: "₹2400",
    numericPrice: 2400,
    region: "Maharashtra",
    timestamp: "2024-11-15T05:30:00Z",
    trend: "up",
    predictedPrice: "₹2700",
    predictedNumeric: 2700,
    priceHistory: [
      { date: "2024-06-15", price: 1700 },
      { date: "2024-07-15", price: 1900 },
      { date: "2024-08-15", price: 2100 },
      { date: "2024-09-15", price: 2200 },
      { date: "2024-10-15", price: 2300 },
      { date: "2024-11-15", price: 2400 },
    ],
  },
  {
    name: "Tomato",
    price: "₹2450",
    numericPrice: 2450,
    region: "Andhra Pradesh",
    timestamp: "2024-11-15T05:45:00Z",
    trend: "up",
    predictedPrice: "₹2750",
    predictedNumeric: 2750,
    priceHistory: [
      { date: "2024-06-15", price: 1750 },
      { date: "2024-07-15", price: 1950 },
      { date: "2024-08-15", price: 2150 },
      { date: "2024-09-15", price: 2250 },
      { date: "2024-10-15", price: 2350 },
      { date: "2024-11-15", price: 2450 },
    ],
  },
  // New commodities added below
  {
    name: "Mustard",
    price: "₹5100",
    numericPrice: 5100,
    region: "Rajasthan",
    timestamp: "2024-11-15T10:15:00Z",
    trend: "up",
    predictedPrice: "₹5350",
    predictedNumeric: 5350,
    priceHistory: [
      { date: "2024-06-15", price: 4700 },
      { date: "2024-07-15", price: 4800 },
      { date: "2024-08-15", price: 4900 },
      { date: "2024-09-15", price: 4950 },
      { date: "2024-10-15", price: 5020 },
      { date: "2024-11-15", price: 5100 },
    ],
  },
  {
    name: "Mustard",
    price: "₹5050",
    numericPrice: 5050,
    region: "Haryana",
    timestamp: "2024-11-15T10:30:00Z",
    trend: "up",
    predictedPrice: "₹5300",
    predictedNumeric: 5300,
    priceHistory: [
      { date: "2024-06-15", price: 4650 },
      { date: "2024-07-15", price: 4750 },
      { date: "2024-08-15", price: 4850 },
      { date: "2024-09-15", price: 4900 },
      { date: "2024-10-15", price: 4980 },
      { date: "2024-11-15", price: 5050 },
    ],
  },
  {
    name: "Groundnut",
    price: "₹5800",
    numericPrice: 5800,
    region: "Gujarat",
    timestamp: "2024-11-15T09:50:00Z",
    trend: "up",
    predictedPrice: "₹6050",
    predictedNumeric: 6050,
    priceHistory: [
      { date: "2024-06-15", price: 5300 },
      { date: "2024-07-15", price: 5400 },
      { date: "2024-08-15", price: 5550 },
      { date: "2024-09-15", price: 5650 },
      { date: "2024-10-15", price: 5750 },
      { date: "2024-11-15", price: 5800 },
    ],
  },
  {
    name: "Groundnut",
    price: "₹5750",
    numericPrice: 5750,
    region: "Andhra Pradesh",
    timestamp: "2024-11-15T10:00:00Z",
    trend: "up",
    predictedPrice: "₹6000",
    predictedNumeric: 6000,
    priceHistory: [
      { date: "2024-06-15", price: 5250 },
      { date: "2024-07-15", price: 5350 },
      { date: "2024-08-15", price: 5500 },
      { date: "2024-09-15", price: 5600 },
      { date: "2024-10-15", price: 5700 },
      { date: "2024-11-15", price: 5750 },
    ],
  },
  {
    name: "Maize",
    price: "₹2050",
    numericPrice: 2050,
    region: "Karnataka",
    timestamp: "2024-11-14T13:00:00Z",
    trend: "stable",
    predictedPrice: "₹2100",
    predictedNumeric: 2100,
    priceHistory: [
      { date: "2024-06-15", price: 2020 },
      { date: "2024-07-15", price: 2040 },
      { date: "2024-08-15", price: 2060 },
      { date: "2024-09-15", price: 2050 },
      { date: "2024-10-15", price: 2040 },
      { date: "2024-11-15", price: 2050 },
    ],
  },
  {
    name: "Maize",
    price: "₹2100",
    numericPrice: 2100,
    region: "Bihar",
    timestamp: "2024-11-14T13:20:00Z",
    trend: "up",
    predictedPrice: "₹2200",
    predictedNumeric: 2200,
    priceHistory: [
      { date: "2024-06-15", price: 1900 },
      { date: "2024-07-15", price: 1950 },
      { date: "2024-08-15", price: 2000 },
      { date: "2024-09-15", price: 2040 },
      { date: "2024-10-15", price: 2070 },
      { date: "2024-11-15", price: 2100 },
    ],
  },
  {
    name: "Chilli",
    price: "₹12500",
    numericPrice: 12500,
    region: "Andhra Pradesh",
    timestamp: "2024-11-15T08:50:00Z",
    trend: "up",
    predictedPrice: "₹13200",
    predictedNumeric: 13200,
    priceHistory: [
      { date: "2024-06-15", price: 10800 },
      { date: "2024-07-15", price: 11200 },
      { date: "2024-08-15", price: 11600 },
      { date: "2024-09-15", price: 11900 },
      { date: "2024-10-15", price: 12200 },
      { date: "2024-11-15", price: 12500 },
    ],
  },
  {
    name: "Chilli",
    price: "₹12300",
    numericPrice: 12300,
    region: "Telangana",
    timestamp: "2024-11-15T09:00:00Z",
    trend: "up",
    predictedPrice: "₹13000",
    predictedNumeric: 13000,
    priceHistory: [
      { date: "2024-06-15", price: 10600 },
      { date: "2024-07-15", price: 11000 },
      { date: "2024-08-15", price: 11400 },
      { date: "2024-09-15", price: 11700 },
      { date: "2024-10-15", price: 12000 },
      { date: "2024-11-15", price: 12300 },
    ],
  },
  {
    name: "Turmeric",
    price: "₹9200",
    numericPrice: 9200,
    region: "Tamil Nadu",
    timestamp: "2024-11-15T10:45:00Z",
    trend: "up",
    predictedPrice: "₹9600",
    predictedNumeric: 9600,
    priceHistory: [
      { date: "2024-06-15", price: 8400 },
      { date: "2024-07-15", price: 8600 },
      { date: "2024-08-15", price: 8800 },
      { date: "2024-09-15", price: 8900 },
      { date: "2024-10-15", price: 9050 },
      { date: "2024-11-15", price: 9200 },
    ],
  },
  {
    name: "Turmeric",
    price: "₹9150",
    numericPrice: 9150,
    region: "Andhra Pradesh",
    timestamp: "2024-11-15T11:00:00Z",
    trend: "up",
    predictedPrice: "₹9550",
    predictedNumeric: 9550,
    priceHistory: [
      { date: "2024-06-15", price: 8350 },
      { date: "2024-07-15", price: 8550 },
      { date: "2024-08-15", price: 8750 },
      { date: "2024-09-15", price: 8850 },
      { date: "2024-10-15", price: 9000 },
      { date: "2024-11-15", price: 9150 },
    ],
  },
];

// List of Indian states
const statesList = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Lakshadweep",
  "Puducherry",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Jammu and Kashmir",
  "Ladakh",
];

// Get unique crop names
const uniqueCrops = [...new Set(marketPrices.map((item) => item.name))];

const MarketPriceTracker = () => {
  const [prices, setPrices] = useState([]);
  const [filteredPrices, setFilteredPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("table"); // cards or table
  const [sortConfig, setSortConfig] = useState({
    key: "timestamp",
    direction: "desc",
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const [showPredictions, setShowPredictions] = useState(false);

  // Filter prices based on state, crop, and search term
  const filterPrices = (state, crop, search) => {
    let filtered = marketPrices;

    if (state) {
      filtered = filtered.filter((price) => price.region === state);
    }

    if (crop) {
      filtered = filtered.filter((price) => price.name === crop);
    }

    if (search) {
      filtered = filtered.filter(
        (price) =>
          price.name.toLowerCase().includes(search.toLowerCase()) ||
          price.price.toLowerCase().includes(search.toLowerCase()) ||
          price.region.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply sorting
    if (sortConfig !== null) {
      filtered = [...filtered].sort((a, b) => {
        if (sortConfig.key === "price" || sortConfig.key === "predictedPrice") {
          // Extract numeric values for price sorting
          const aValue =
            a[sortConfig.key === "price" ? "numericPrice" : "predictedNumeric"];
          const bValue =
            b[sortConfig.key === "price" ? "numericPrice" : "predictedNumeric"];

          if (sortConfig.direction === "asc") {
            return aValue - bValue;
          } else {
            return bValue - aValue;
          }
        } else {
          // For non-price fields
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "asc" ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "asc" ? 1 : -1;
          }
          return 0;
        }
      });
    }

    setFilteredPrices(filtered);
  };

  // Handle sorting
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Handle state filter change
  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    filterPrices(state, selectedCrop, searchTerm);
  };

  // Handle crop filter change
  const handleCropChange = (e) => {
    const crop = e.target.value;
    setSelectedCrop(crop);
    filterPrices(selectedState, crop, searchTerm);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterPrices(selectedState, selectedCrop, term);
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedState("");
    setSelectedCrop("");
    setSearchTerm("");
    filterPrices("", "", "");
  };

  // Toggle view mode (cards/table)
  const toggleViewMode = () => {
    setViewMode(viewMode === "cards" ? "table" : "cards");
  };

  // Toggle show predictions
  const togglePredictions = () => {
    setShowPredictions(!showPredictions);
  };

  // Open detail view for an item
  const openDetailView = (item) => {
    setSelectedItem(item);
  };

  // Close detail view
  const closeDetailView = () => {
    setSelectedItem(null);
  };

  // Initialize prices on component mount
  useEffect(() => {
    setPrices(marketPrices);
    setFilteredPrices(marketPrices);
    setLoading(false);

    // Apply initial sorting
    filterPrices(selectedState, selectedCrop, searchTerm);
  }, []);

  // Re-filter when sort config changes
  useEffect(() => {
    filterPrices(selectedState, selectedCrop, searchTerm);
  }, [sortConfig]);

  // Calculate price change percentage
  const calculatePriceChange = (item) => {
    if (item.priceHistory && item.priceHistory.length >= 2) {
      const currentPrice =
        item.priceHistory[item.priceHistory.length - 1].price;
      const previousPrice =
        item.priceHistory[item.priceHistory.length - 2].price;
      const change = ((currentPrice - previousPrice) / previousPrice) * 100;
      return change.toFixed(1);
    }
    return "0.0";
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-green-600 dark:text-green-400">
            Agricultural Market Price Tracker
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Live market prices and predictions for crops across India
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
          <div className="p-6 bg-white border border-gray-200 shadow-md dark:bg-gray-800 rounded-xl dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total Crops Tracked
                </h3>
                <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                  {uniqueCrops.length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full dark:bg-green-900">
                <BarChart3 className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div className="p-6 bg-white border border-gray-200 shadow-md dark:bg-gray-800 rounded-xl dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Price Trends
                </h3>
                <div className="flex items-center mt-2 space-x-4">
                  <div className="flex items-center">
                    <ArrowUpRight className="w-5 h-5 mr-1 text-green-500" />
                    <span className="text-lg font-bold text-gray-800 dark:text-gray-100">
                      {
                        marketPrices.filter((item) => item.trend === "up")
                          .length
                      }
                    </span>
                  </div>
                  <div className="flex items-center">
                    <ArrowDownRight className="w-5 h-5 mr-1 text-red-500" />
                    <span className="text-lg font-bold text-gray-800 dark:text-gray-100">
                      {
                        marketPrices.filter((item) => item.trend === "down")
                          .length
                      }
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-full dark:bg-blue-900">
                <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="p-6 bg-white border border-gray-200 shadow-md dark:bg-gray-800 rounded-xl dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Last Updated
                </h3>
                <p className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  {new Date().toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full dark:bg-purple-900">
                <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 mb-8 bg-white border border-gray-200 shadow-md dark:bg-gray-800 rounded-xl dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="flex items-center text-xl font-semibold text-gray-800 dark:text-gray-200">
              <Filter className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
              Filters
            </h2>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleViewMode}
                className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
              >
                <span className="mr-1">
                  {viewMode === "cards" ? "Table View" : "Card View"}
                </span>
              </button>
              <button
                onClick={togglePredictions}
                className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
              >
                <span className="mr-1">
                  {showPredictions ? "Hide Predictions" : "Show Predictions"}
                </span>
              </button>
              <button
                onClick={clearFilters}
                className="px-3 py-1 text-sm font-medium text-white transition-colors duration-200 bg-green-600 rounded-md hover:bg-green-700"
              >
                Clear Filters
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label
                htmlFor="search"
                className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Search:
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  id="search"
                  type="text"
                  className="w-full px-4 py-2 pl-10 text-gray-800 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 dark:bg-gray-700 dark:text-white"
                  placeholder="Search crops, prices..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="state-select"
                className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                State:
              </label>
              <select
                id="state-select"
                className="w-full px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 dark:bg-gray-700 dark:text-white"
                value={selectedState}
                onChange={handleStateChange}
              >
                <option value="">All States</option>
                {statesList.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="crop-select"
                className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Crop:
              </label>
              <select
                id="crop-select"
                className="w-full px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 dark:bg-gray-700 dark:text-white"
                value={selectedCrop}
                onChange={handleCropChange}
              >
                <option value="">All Crops</option>
                {uniqueCrops.map((crop, index) => (
                  <option key={index} value={crop}>
                    {crop}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto border-b-2 border-green-500 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                Loading market prices...
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-start p-4 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/20 dark:border-red-800">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3" />
            <p className="text-red-700 dark:text-red-400">{error}</p>
          </div>
        ) : (
          <>
            {/* Results count */}
            <div className="mb-4 text-gray-600 dark:text-gray-300">
              Showing {filteredPrices.length} results
              {selectedState && ` in ${selectedState}`}
              {selectedCrop && ` for ${selectedCrop}`}
            </div>

            {/* Cards View */}
            {viewMode === "cards" && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredPrices.length > 0 ? (
                  filteredPrices.map((item, index) => {
                    const priceChange = calculatePriceChange(item);
                    const priceChangeDirection =
                      parseFloat(priceChange) >= 0 ? "up" : "down";

                    return (
                      <div
                        key={index}
                        className="overflow-hidden transition-all duration-300 bg-white border border-gray-200 shadow-md cursor-pointer dark:bg-gray-800 rounded-xl hover:shadow-lg dark:border-gray-700"
                        onClick={() => openDetailView(item)}
                      >
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                              {item.name}
                            </h3>
                            <span
                              className={`text-sm font-medium px-2.5 py-0.5 rounded-full ${
                                item.trend === "up"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                  : item.trend === "down"
                                  ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                  : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                              }`}
                            >
                              {item.trend === "up"
                                ? "Rising"
                                : item.trend === "down"
                                ? "Falling"
                                : "Stable"}
                            </span>
                          </div>

                          <div className="flex items-baseline mb-4">
                            <span className="text-2xl font-bold text-gray-900 dark:text-white">
                              {item.price}
                            </span>
                            <span className="flex items-center ml-2 text-sm font-medium">
                              <span
                                className={`${
                                  priceChangeDirection === "up"
                                    ? "text-green-600 dark:text-green-400"
                                    : "text-red-600 dark:text-red-400"
                                }`}
                              >
                                {priceChangeDirection === "up" ? "+" : ""}
                                {priceChange}%
                              </span>
                              {priceChangeDirection === "up" ? (
                                <TrendingUp className="w-4 h-4 ml-1 text-green-600 dark:text-green-400" />
                              ) : (
                                <TrendingDown className="w-4 h-4 ml-1 text-red-600 dark:text-red-400" />
                              )}
                            </span>
                          </div>

                          <div className="mb-4">
                            <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                              Region:{" "}
                              <span className="font-medium text-gray-700 dark:text-gray-300">
                                {item.region}
                              </span>
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Updated:{" "}
                              <span className="font-medium text-gray-700 dark:text-gray-300">
                                {new Date(item.timestamp).toLocaleDateString(
                                  "en-IN",
                                  { day: "numeric", month: "short" }
                                )}
                              </span>
                            </p>
                          </div>

                          {showPredictions && (
                            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                  Predicted Price:
                                </span>
                                <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                                  {item.predictedPrice}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex items-center justify-center h-64 col-span-full">
                    <p className="text-gray-500 dark:text-gray-400">
                      No prices available for the selected filters.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Table View */}
            {viewMode === "table" && (
              <div className="overflow-hidden bg-white border border-gray-200 shadow-md dark:bg-gray-800 rounded-xl dark:border-gray-700">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase cursor-pointer dark:text-gray-400"
                          onClick={() => requestSort("name")}
                        >
                          <div className="flex items-center">
                            <span>Crop</span>
                            {sortConfig.key === "name" && (
                              <span className="ml-1">
                                {sortConfig.direction === "asc" ? "↑" : "↓"}
                              </span>
                            )}
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase cursor-pointer dark:text-gray-400"
                          onClick={() => requestSort("price")}
                        >
                          <div className="flex items-center">
                            <span>Price</span>
                            {sortConfig.key === "price" && (
                              <span className="ml-1">
                                {sortConfig.direction === "asc" ? "↑" : "↓"}
                              </span>
                            )}
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase cursor-pointer dark:text-gray-400"
                          onClick={() => requestSort("region")}
                        >
                          <div className="flex items-center">
                            <span>Region</span>
                            {sortConfig.key === "region" && (
                              <span className="ml-1">
                                {sortConfig.direction === "asc" ? "↑" : "↓"}
                              </span>
                            )}
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase cursor-pointer dark:text-gray-400"
                          onClick={() => requestSort("trend")}
                        >
                          <div className="flex items-center">
                            <span>Trend</span>
                            {sortConfig.key === "trend" && (
                              <span className="ml-1">
                                {sortConfig.direction === "asc" ? "↑" : "↓"}
                              </span>
                            )}
                          </div>
                        </th>
                        {showPredictions && (
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase cursor-pointer dark:text-gray-400"
                            onClick={() => requestSort("predictedPrice")}
                          >
                            <div className="flex items-center">
                              <span>Predicted Price</span>
                              {sortConfig.key === "predictedPrice" && (
                                <span className="ml-1">
                                  {sortConfig.direction === "asc" ? "↑" : "↓"}
                                </span>
                              )}
                            </div>
                          </th>
                        )}
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase cursor-pointer dark:text-gray-400"
                          onClick={() => requestSort("timestamp")}
                        >
                          <div className="flex items-center">
                            <span>Updated</span>
                            {sortConfig.key === "timestamp" && (
                              <span className="ml-1">
                                {sortConfig.direction === "asc" ? "↑" : "↓"}
                              </span>
                            )}
                          </div>
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Action</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                      {filteredPrices.length > 0 ? (
                        filteredPrices.map((item, index) => {
                          const priceChange = calculatePriceChange(item);
                          const priceChangeDirection =
                            parseFloat(priceChange) >= 0 ? "up" : "down";

                          return (
                            <tr
                              key={index}
                              className="transition-colors duration-200 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                              onClick={() => openDetailView(item)}
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {item.name}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                                    {item.price}
                                  </span>
                                  <span
                                    className={`ml-2 text-xs font-medium ${
                                      priceChangeDirection === "up"
                                        ? "text-green-600 dark:text-green-400"
                                        : "text-red-600 dark:text-red-400"
                                    }`}
                                  >
                                    {priceChangeDirection === "up" ? "+" : ""}
                                    {priceChange}%
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900 dark:text-white">
                                  {item.region}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`inline-flex px-2 text-xs font-semibold leading-5 rounded-full ${
                                    item.trend === "up"
                                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                      : item.trend === "down"
                                      ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                      : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                  }`}
                                >
                                  {item.trend === "up"
                                    ? "Rising"
                                    : item.trend === "down"
                                    ? "Falling"
                                    : "Stable"}
                                </span>
                              </td>
                              {showPredictions && (
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                                    {item.predictedPrice}
                                  </div>
                                </td>
                              )}
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {new Date(item.timestamp).toLocaleDateString(
                                    "en-IN",
                                    { day: "numeric", month: "short" }
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                <button
                                  className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openDetailView(item);
                                  }}
                                >
                                  Details
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td
                            colSpan={showPredictions ? 7 : 6}
                            className="px-6 py-4 text-sm text-center text-gray-500 dark:text-gray-400"
                          >
                            No prices available for the selected filters.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

        {/* Detailed View Modal */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-4xl p-6 mx-4 bg-white rounded-lg shadow-xl dark:bg-gray-800">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {selectedItem.name} - {selectedItem.region}
                </h2>
                <button
                  onClick={closeDetailView}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                  <div className="p-4 mb-6 bg-gray-100 rounded-lg dark:bg-gray-700">
                    <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
                      Price Information
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Current Price
                        </p>
                        <p className="text-2xl font-bold text-gray-800 dark:text-white">
                          {selectedItem.price}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Predicted Price
                        </p>
                        <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                          {selectedItem.predictedPrice}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Price Trend
                      </p>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 mt-1 text-sm font-medium rounded-full ${
                          selectedItem.trend === "up"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : selectedItem.trend === "down"
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                        }`}
                      >
                        {selectedItem.trend === "up" ? (
                          <TrendingUp className="w-4 h-4 mr-1" />
                        ) : selectedItem.trend === "down" ? (
                          <TrendingDown className="w-4 h-4 mr-1" />
                        ) : null}
                        {selectedItem.trend === "up"
                          ? "Rising"
                          : selectedItem.trend === "down"
                          ? "Falling"
                          : "Stable"}
                      </span>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Last Updated
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white">
                        {new Date(selectedItem.timestamp).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-100 rounded-lg dark:bg-gray-700">
                    <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
                      Additional Information
                    </h3>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Region
                        </p>
                        <p className="text-sm font-medium text-gray-800 dark:text-white">
                          {selectedItem.region}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Historical Range
                        </p>
                        <p className="text-sm font-medium text-gray-800 dark:text-white">
                          {selectedItem.priceHistory &&
                            `₹${Math.min(
                              ...selectedItem.priceHistory.map(
                                (item) => item.price
                              )
                            )} - ₹${Math.max(
                              ...selectedItem.priceHistory.map(
                                (item) => item.price
                              )
                            )}`}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Monthly Change
                        </p>
                        <p
                          className={`text-sm font-medium ${
                            calculatePriceChange(selectedItem) >= 0
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {calculatePriceChange(selectedItem)}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-100 rounded-lg dark:bg-gray-700">
                  <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
                    Price History (6 Months)
                  </h3>

                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={selectedItem.priceHistory}
                        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis
                          dataKey="date"
                          tick={{ fill: "#9CA3AF" }}
                          tickFormatter={(value) => {
                            const date = new Date(value);
                            return date.toLocaleDateString("en-IN", {
                              month: "short",
                            });
                          }}
                        />
                        <YAxis tick={{ fill: "#9CA3AF" }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1F2937",
                            border: "none",
                            borderRadius: "0.375rem",
                            boxShadow:
                              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                            color: "#F9FAFB",
                          }}
                          formatter={(value) => [`₹${value}`, "Price"]}
                          labelFormatter={(value) => {
                            const date = new Date(value);
                            return date.toLocaleDateString("en-IN", {
                              month: "long",
                              year: "numeric",
                            });
                          }}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="price"
                          name="Price"
                          stroke="#10B981"
                          activeDot={{ r: 8 }}
                          dot={{
                            stroke: "#10B981",
                            strokeWidth: 2,
                            r: 4,
                            fill: "#10B981",
                          }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="mt-4">
                    <h4 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Price Forecast
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Based on historical data and market trends, prices are
                      expected to
                      {selectedItem.predictedNumeric > selectedItem.numericPrice
                        ? " increase"
                        : " decrease"}{" "}
                      in the coming weeks. The predicted price for next month is{" "}
                      <span className="font-medium text-indigo-600 dark:text-indigo-400">
                        {selectedItem.predictedPrice}
                      </span>
                      .
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={closeDetailView}
                  className="px-4 py-2 font-medium text-white transition-colors duration-200 bg-green-600 rounded-md hover:bg-green-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketPriceTracker;
