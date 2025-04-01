import React, { useContext, useEffect, useState } from "react";
import { sampleCrops } from "../assets/assets"; // Import sampleCrops from assets
import { AppContext } from "../context/AppContext";
import axios from "axios";
import Loading from "./Loading";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const FarmerDashboard = ({ isDarkMode }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const [crops, setCrops] = useState([]);
	const [error, setError] = useState("");
	const [editCrop, setEditCrop] = useState(null); // Stores crop being edited
	const [showModal, setShowModal] = useState(false);

	const totalEarnings = crops
		.filter((crop) => crop.status === "sold")
		.reduce((sum, crop) => sum + crop.price * crop.quantity, 0);

	const soldCrops = crops.filter((crop) => crop.status === "sold");

	const [merchants, setMerchants] = useState([]);

	const { token, farmerData, loadFarmerProfileData, backendUrl } =
		useContext(AppContext);

	useEffect(() => {
		// Simulate token check and user retrieval
		// const token = localStorage.getItem("authToken"); // Assuming token is stored in localStorage
		if (token) {
			// Fetch user details if token exists (simulate API call)
			setTimeout(() => {
				setUser({
					Name: farmerData.name,
					email: farmerData.email,
				});
				setLoading(false);
			}, 1000); // Simulate API response delay
		} else {
			setLoading(false); // No token, so stop loading
		}
	}, []);

	// get farmer crops
	useEffect(() => {
		const fetchCrops = async () => {
			try {
				const response = await axios.get(`${backendUrl}/api/farmer/crop/mine`, {
					headers: { token },
				});

				if (response.data.success) {
					setCrops(response.data.crops);
				} else {
					setError("Failed to fetch your crops.");
				}
			} catch (err) {
				setError("Error fetching crops. Please try again.");
			}
			setLoading(false);
		};

		fetchCrops();
	}, [backendUrl, token]);

	// Open modal and set selected crop for editing
	const handleEditClick = (crop) => {
		setEditCrop({ ...crop });
		setShowModal(true);
	};

	// Handle form input changes
	const handleInputChange = (e) => {
		setEditCrop({ ...editCrop, [e.target.name]: e.target.value });
	};

	// Submit updated crop details
	const handleUpdateCrop = async () => {
		try {
			const response = await axios.put(
				`${backendUrl}/api/farmer/crop/update/${editCrop._id}`,
				editCrop,
				{
					headers: { token },
				}
			);

			if (response.data.success) {
				setCrops(
					crops.map((crop) => (crop._id === editCrop._id ? editCrop : crop))
				);
				setShowModal(false);
			} else {
				alert("Failed to update crop.");
			}
		} catch (error) {
			alert("Error updating crop. Please try again.");
		}
	};

	// delete a crop

	const handleDeleteCrop = async (cropId) => {
		if (!window.confirm("Are you sure you want to delete this crop?")) return;

		try {
			const token = localStorage.getItem("token"); // Get the token from local storage
			const response = await axios.delete(
				`${backendUrl}/api/farmer/crop/delete/${cropId}`,
				{
					headers: {
						token,
					},
				}
			);

			if (response.data.success) {
				toast.success("Crop deleted successfully!");
				setCrops((prevCrops) =>
					prevCrops.filter((crop) => crop._id !== cropId)
				);
			} else {
				alert("Failed to delete crop: " + response.data.message);
			}
		} catch (error) {
			console.error("Error deleting crop:", error);
			toast.error("Something went wrong while deleting the crop.");
		}
	};

	// Fetch all Merchants
	useEffect(() => {
		const getAllMerchants = async () => {
			try {
				const { data } = await axios.get(
					backendUrl + "/api/merchant/all-merchant"
				);
				if (data.success) {
					setMerchants(data.merchants);
				}
			} catch (error) {
				console.error("Error fetching farmers:", error);
			}
		};
		getAllMerchants();
	}, [token]);

	// Show loading state while checking token or fetching user
	if (loading) {
		return (
			<div className="flex items-center justify-center mt-10">
				<Loading />
			</div>
		);
	}

	// If no user data is available
	if (!user) {
		return (
			<div className={`${isDarkMode ? "text-white" : "text-black"}`}>
				No user data available. Please log in.
			</div>
		);
	}



	return (
		<div
			className={`min-h-screen   ${
				isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
			}`}
		>
			<div className="container mx-auto">
				{/* Header */}
				<header
					className={`  ${
						isDarkMode ? "bg-gray-900 text-green-400" : "bg-green-200"
					} flex flex-col items-center  p-4 rounded-lg shadow-md mb-6`}
				>
					<h1 className={`text-2xl flex text-center items-center font-bold`}>
						Welcome to the Former Dashboard
					</h1>
					<p className="text-sm flex text-center items-center">
						Your one-stop hub for managing farming activities.
					</p>
				</header>

				{/* User Info Section */}
				<section className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-6 rounded-lg shadow-md mb-6`}>
					<h2 className="text-xl font-semibold mb-4">Your Profile</h2>
					<div>
						<p>
							<strong>Name:</strong> {farmerData?.name || "Not available"}
						</p>
						<p>
							<strong>Email:</strong> {farmerData?.email || "Not available"}
						</p>
					</div>
				</section>

				{/* Dashboard Widgets */}
				<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{[
						{ title: "Total Earnings", value: `₹${totalEarnings}` },
						{ title: "Total Sales", value: soldCrops.length },
						{
							title: "Sold Crops",
							value: soldCrops.map((crop) => crop.name).join(", ") || "N/A",
						},
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

				{/* All Merchats Section */}
				<div className={`${isDarkMode ? "bg-gray-700" : "bg-gray-200"} mb-5`}>
					<section className="mt-6">
						<h3 className="text-2xl font-semibold mb-4 pt-6 pl-6">
							All Merchants
						</h3>
						{merchants.length > 0 ? (
							<div className="overflow-x-auto px-6 ">
								<table
									className={`w-full mb-10 table-auto border-collapse border rounded-md ${
										isDarkMode
											? "bg-gray-800 text-gray-100 border-gray-700"
											: "bg-white text-gray-800 border-gray-200"
									}`}
								>
									<thead>
										<tr className={isDarkMode ? "bg-gray-600" : "bg-gray-400"}>
											<th className="py-3 px-4 border-b border-gray-300 dark:border-gray-600 text-left">
												Name
											</th>
											<th className="py-3 px-4 border-b border-gray-300 dark:border-gray-600 text-left">
												Email
											</th>
											<th className="py-3 px-4 border-b border-gray-300 dark:border-gray-600 text-left">
												Contact
											</th>
										</tr>
									</thead>
									<tbody>
										{merchants.map((merchant, index) => (
											<tr
												key={index}
												className={`   ${
													isDarkMode
														? "bg-gray-700 hover:text-black hover:bg-gray-100"
														: "bg-gray-200 hover:bg-gray-300 hover:text-black"
												}`}
											>
												<td className="py-3 px-4 border-b  border-gray-300 dark:border-gray-600">
													{merchant.name}
												</td>
												<td className="py-3 px-4 border-b border-gray-300 dark:border-gray-600">
													{merchant.email}
												</td>
												<td className="py-3 px-4 border-b border-gray-300 dark:border-gray-600">
													{merchant.phone}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						) : (
							<p className="text-gray-500 px-6">No merchants available.</p>
						)}
					</section>
				</div>

				{/* Crop Management Section */}

				<section
					className={`p-6 rounded-lg shadow-md mb-6 ${
						isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
					}`}
				>
					<h2 className="text-2xl font-bold mb-6 text-center">Your Crops</h2>

					{loading ? (
						<p className="text-center text-gray-500">Loading crops...</p>
					) : error ? (
						<p className="text-center text-red-500">{error}</p>
					) : crops.length === 0 ? (
						<p className="text-center text-gray-500">No crops found.</p>
					) : (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
							{crops.map((crop) => (
								<div
									key={crop._id}
									className={`p-4 ${
										isDarkMode ? "bg-gray-800" : "bg-gray-100"
									} rounded-lg shadow-lg`}
								>
									{/* Crop Image */}
									<div className="relative">
										<img
											src={
												crop.image ||
												"https://icarda.org/sites/default/files/styles/d11_standard/public/images/2018-10/14177187055_41e65491fa_o.webp?h=16013371&itok=1WYmBZGr"
											}
											alt={crop.name}
											className="w-full h-40 object-cover rounded-lg"
										/>

										<span
											className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-150 text-white ${
												crop.status === "sold"
													? "bg-red-600"
													: crop.status === "pending"
													? "bg-yellow-500"
													: "bg-green-500"
											}`}
										>
											{crop.status}
										</span>
									</div>

									{/* Crop Details */}
									<div className="mt-4 space-y-2">
										<h3
											className={`text-lg font-semibold ${
												isDarkMode ? "text-green-400" : "text-blue-700"
											}`}
										>
											{crop.name}
										</h3>
										<p className="text-sm">
											<strong>Category:</strong> {crop.category}
										</p>
										<p className="text-sm">
											<strong>Quantity:</strong> {crop.quantity} Quintal
										</p>
										<p className="text-sm">
											<strong>Quantity in Kg:</strong> {crop.quantity * 100} Kg
										</p>
										<p className="text-sm">
											<strong>Price Per Quintal:</strong> ₹{crop.price}
										</p>
										<p className="text-sm">
											<strong>Price Per Kg:</strong> ₹{crop.price / 100}
										</p>
										<p className="text-sm">
											<strong>Total Price </strong> ₹
											{crop.price * crop.quantity}
										</p>
										<p className="text-sm">
											<strong>Description:</strong> {crop.description}
										</p>
										<p className="text-sm gap-5">
											<strong>Status:</strong>
											{/* <span
											className={` top-2 right-2 px-3 py-1 m-4 rounded-full text-white font-semibold   ${
												crop.status === "sold"
													? "bg-red-600"
													: crop.status === "pending"
													? "bg-yellow-500"
													: "text-green-400 bg-green-700"
											}`}
										>
											{crop.status}
										</span> */}
											<span
												className={`m-3 top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-150 text-white animate-pulse ${
													crop.status === "sold"
														? "bg-red-600"
														: crop.status === "pending"
														? "bg-yellow-500"
														: "bg-green-500"
												}`}
											>
												{crop.status}
											</span>
										</p>
									</div>

									{/* Edit Button */}
									<button
										onClick={() => handleEditClick(crop)}
										className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
									>
										Edit Crop
									</button>
									<button
										onClick={() => handleDeleteCrop(crop._id)}
										className="mt-2 w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
									>
										Delete Crop
									</button>
								</div>
							))}
						</div>
					)}

					{/* Update Crop Modal */}
					{showModal && editCrop && (
						<div
							className={`fixed inset-0 flex items-center justify-center bg-opacity-50 ${
								isDarkMode ? "bg-black" : "bg-gray-800"
							}`}
						>
							<div
								className={`p-6 rounded-lg w-96 shadow-xl ${
									isDarkMode
										? "bg-gray-900 text-white"
										: "bg-white text-gray-900"
								}`}
							>
								<h2 className="text-xl font-semibold mb-4 text-center">
									Update Crop
								</h2>

								<label className="block mb-2 text-sm font-medium">Name:</label>
								<input
									type="text"
									name="name"
									value={editCrop.name}
									onChange={handleInputChange}
									className={`border p-2 w-full rounded ${
										isDarkMode
											? "bg-gray-800 border-gray-600 text-white"
											: "bg-white border-gray-300 text-black"
									}`}
								/>

								<label className="block mt-2 text-sm font-medium">
									Quantity (Quintal):
								</label>
								<input
									type="number"
									name="quantity"
									value={editCrop.quantity}
									onChange={handleInputChange}
									className={`border p-2 w-full rounded ${
										isDarkMode
											? "bg-gray-800 border-gray-600 text-white"
											: "bg-white border-gray-300 text-black"
									}`}
								/>

								<label className="block mt-2 text-sm font-medium">
									Price Per Quintal:
								</label>
								<input
									type="number"
									name="price"
									value={editCrop.price}
									onChange={handleInputChange}
									className={`border p-2 w-full rounded ${
										isDarkMode
											? "bg-gray-800 border-gray-600 text-white"
											: "bg-white border-gray-300 text-black"
									}`}
								/>

								<label className="block mt-2 text-sm font-medium">
									Status:
								</label>
								<select
									name="status"
									value={editCrop.status}
									onChange={handleInputChange}
									className={`border p-2 w-full rounded ${
										isDarkMode
											? "bg-gray-800 border-gray-600 text-white"
											: "bg-white border-gray-300 text-black"
									}`}
								>
									<option value="available">Available</option>
									<option value="pending">Pending</option>
									<option value="sold">Sold</option>
								</select>

								{/* Modal Buttons */}
								<div className="mt-4 flex justify-between">
									<button
										onClick={() => setShowModal(false)}
										className="px-4 py-2 bg-gray-400 text-white rounded-md"
									>
										Cancel
									</button>
									<button
										onClick={handleUpdateCrop}
										className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition"
									>
										Update
									</button>
								</div>
							</div>
						</div>
					)}
				</section>

				{/* Dashboard Actions */}
				<section className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-6 rounded-lg shadow-md`}>
					<h2 className="text-xl font-semibold mb-4">Dashboard Actions</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						<div
							className={`p-4 ${
								isDarkMode
									? "bg-gray-700 hover:bg-gray-600"
									: "bg-gray-200 hover:bg-gray-300"
							} rounded-lg shadow cursor-pointer`}
						>
							<h3 className="text-lg font-semibold">Manage Crops</h3>
							<p className="text-sm">View and update your crop details.</p>
						</div>
						<div
							className={`p-4 ${
								isDarkMode
									? "bg-gray-700 hover:bg-gray-600"
									: "bg-gray-200 hover:bg-gray-300"
							} rounded-lg shadow cursor-pointer`}
						>
							<Link to={"/market-price"}>
								<h3 className="text-lg font-semibold">View Market Prices</h3>
								<p className="text-sm">Check current market rates for crops.</p>
							</Link>
						</div>
						<div
							className={`p-4 ${
								isDarkMode
									? "bg-gray-700 hover:bg-gray-600"
									: "bg-gray-200 hover:bg-gray-300"
							} rounded-lg shadow cursor-pointer`}
						>
							<h3 className="text-lg font-semibold">Order Supplies</h3>
							<p className="text-sm">
								Order seeds, fertilizers, and other essentials.
							</p>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};

export default FarmerDashboard;
