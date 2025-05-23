import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext"; 
import { cropSchema, sampleCrops } from "../assets/assets";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MerchantDashboard = ({ isDarkMode }) => {
	const { mtoken, logout, backendUrl, token } = useContext(AppContext); 
	// const [crops, setCrops] = useState(sampleCrops); 
	const [salesData, setSalesData] = useState({
		totalSales: 0,
		orders: 0,
		products: 0,
	});

	const [crops, setCrops] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const [merchantData, setMerchantData] = useState(false);
	const [farmers, setFarmers] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		if (mtoken) {
			const fetchMerchantData = async () => {
				try {
					const { data } = await axios.get(
						backendUrl + "/api/merchant/get-profile",
						{ headers: { mtoken } }
					);

					console.log("get data m", data.merchantData);
					if (data.success) {
						setMerchantData(data.merchantData);
					}

					// Fetch sales data
					// const salesResponse = await fetch('https://api.example.com/sales', {
					//   headers: {
					//     Authorization: `Bearer ${mtoken}`,
					//   },
					// });
					// const salesData = await salesResponse.json();
					// setSalesData(salesData);
				} catch (error) {
					console.error("Error fetching data:", error);
				}
			};

			fetchMerchantData();
		}
	}, [mtoken]);

	// fetch all crops
	useEffect(() => {
		const fetchCrops = async () => {
			try {
				const response = await axios.get(`${backendUrl}/api/farmer/crop/all`, {
					headers: {
						token,
					},
				});

				if (response.data.success) {
					setCrops(response.data.crops);
					
				} else {
					setError("Failed to fetch crops.");
				}
			} catch (err) {
				setError("Error fetching crops. Please try again.");
			}
			setLoading(false);
		};

		fetchCrops();
	}, [backendUrl, token]);

	// Fetch all farmers
	useEffect(() => {
		const getAllFarmers = async () => {
			try {
				const { data } = await axios.get(
					backendUrl + "/api/farmer/all-farmer",
					{
						headers: { mtoken },
					}
				);
				if (data.success) {
					setFarmers(data.farmers);
				}
			} catch (error) {
				console.error("Error fetching farmers:", error);
			}
		};
		getAllFarmers();
	}, [mtoken]);

	const handleLogout = () => {
		logout();
	};

	if (!mtoken) {
		return (
			<div
				className={`min-h-screen flex items-center justify-center ${
					isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-800"
				}`}
			>
				<p className="text-xl">Please log in to access the dashboard.</p>
			</div>
		);
	}

	return (
		<div
			className={`flex flex-col md:flex-row min-h-screen ${
				isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-800"
			}`}
		>
			<main className="flex-1 p-4 sm:p-6">
				<header className="mb-6">
					<h2 className="text-2xl sm:text-3xl font-bold">
						Welcome, {merchantData?.name || "Merchant"}!
					</h2>
					<p className="text-gray-600 dark:text-gray-400">
						Here’s what’s happening today:
					</p>
				</header>

				{/* Merchant Profile */}
				<section className="mb-6">
					<div
						className={`p-6 rounded-lg shadow ${
							isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white"
						}`}
					>
						<h3 className="text-xl font-semibold mb-4">Your Profile</h3>
						<div className="space-y-4">
							<p>
								<strong>Name:</strong> {merchantData?.name || "Loading..."}
							</p>
							<p>
								<strong>Email:</strong> {merchantData?.email || "Loading..."}
							</p>
							<p>
								<strong>Phone:</strong> {merchantData?.phone || "Not Set"}
							</p>
							<p>
								<strong>Gender:</strong> {merchantData?.gender || "Not Set"}
							</p>
						</div>
					</div>
				</section>

				{/* Dashboard Widgets */}
				<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{[
						{ title: "Sales", value: `$${salesData.totalSales}` },
						{ title: "Orders", value: salesData.orders },
						{ title: "Products", value: salesData.products },
					].map(({ title, value }, index) => (
						<div
							key={index}
							className={`p-4 rounded-lg shadow ${
								isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white"
							}`}
						>
							<h3 className="text-xl font-semibold mb-2">{title}</h3>
							<p className="text-2xl font-bold">{value}</p>
						</div>
					))}
				</section>

				{/* Farmers Section */}
				<section className="mt-6">
					<h3 className="text-2xl font-semibold mb-4">All Farmers</h3>
					{farmers.length > 0 ? (
						<div className="overflow-x-auto">
							<table
								className={`w-full border-collapse border ${
									isDarkMode
										? "bg-gray-800 text-gray-100 border-gray-700"
										: "bg-white text-gray-800 border-gray-200"
								}`}
							>
								<thead>
									<tr className={isDarkMode ? "bg-gray-700" : "bg-gray-300"}>
										<td className="py-3 px-7  border-b font-bold">Name</td>
										<td className="py-3 px-9 border-b font-bold">Email</td>
										<td className="py-3 px-9 border-b font-bold">Contact</td>
									</tr>
								</thead>
								<tbody>
									{farmers.map((farmer, index) => (
										<tr
											key={index}
											className={`hover:bg-gray-200 dark:hover:bg-gray-600`}
										>
											<td className="py-3 px-7 border-b">{farmer.name}</td>
											<td className="py-3 px-7 border-b">{farmer.email}</td>
											<td className="py-3 px-7 border-b">{farmer.phone}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					) : (
						<p className="text-gray-500">No farmers available.</p>
					)}
				</section>

				{/* Crops Section */}
				<section className="mt-6">
					<h3 className="text-2xl font-semibold mb-4">Available Crops</h3>
					{loading ? (
						<p>Loading crops...</p>
					) : error ? (
						<p className="text-red-500">{error}</p>
					) : crops.length === 0 ? (
						<p>No crops available.</p>
					) : (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
							{crops.map((crop) => (
								<div
									key={crop._id}
									className={`p-4 rounded-lg shadow ${
										isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white"
									}`}
								>
									<img
										src={crop.image || "/images/default-crop.jpg"}
										alt={crop.cropName}
										className="w-full h-40 object-cover rounded-lg mb-4"
									/>
									<h4 className="text-xl font-semibold">{crop.name}</h4>
									<p className="mt-2">
										<strong>Category:</strong> {crop.category}
									</p>
									<p className="mt-2">
										<strong>Quantity:</strong> {crop.quantity} Quintal
									</p>
									<p className="mt-2">
										<strong>Quantity in Kg:</strong> {crop.quantity * 100} Kg
									</p>
									<p className="mt-2">
										<strong>Price per Quintal:</strong> ₹{crop.price}
									</p>
									<p className="mt-2">
										<strong>Price per Kg:</strong> ₹{crop.price / 100}
									</p>
									<p className="mt-2">
										<strong>Total Price:</strong> ₹{crop.price * crop.quantity}
									</p>
									<p>
										<strong>Description:</strong> {crop.description}
									</p>
									<p className="flex items-center">
										<strong>Status:</strong>
										<span
											className={`ml-3 px-3 pb-1 mt-1 rounded-full text-white ${
												crop.status === "sold"
													? "bg-red-600"
													: crop.status === "pending"
													? "bg-blue-600"
													: "bg-green-500"
											}`}
										>
											{crop.status}
										</span>
									</p>
									{/* <button 
										className={`mt-4 w-full py-2 rounded-md text-white ${
											crop.status === "sold"
												? "bg-gray-400 cursor-not-allowed"
												: "bg-blue-500 hover:bg-blue-600"
										}`}
										disabled={crop.status === "sold"}
									>
										{crop.status === "sold" ? "Sold Out" : "Buy Now"}
									</button> */}
									<button
      onClick={() => {
        console.log("Navigating with Crop ID:", crop?._id); // Debugging
        if (crop?.status !== "sold" && crop?._id) {
          navigate(`/buy-crop/${crop._id}`);
        }
      }}
      className={`mt-4 w-full py-2 rounded-md text-white transition ${
        crop?.status === "sold"
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-600"
      }`}
      disabled={crop?.status === "sold"}
    >
      {crop?.status === "sold" ? "Sold Out" : "Buy Now"}
    </button>
								</div>
							))}
						</div>
					)}
				</section>
			</main>
		</div>
	);
};

export default MerchantDashboard;
