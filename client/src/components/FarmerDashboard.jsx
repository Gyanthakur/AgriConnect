import React from "react";
import { useUser } from "@clerk/clerk-react";
import { sampleCrops } from "../assets/assets"; // Import sampleCrops from assets

const FarmerDashboard = ({ isDarkMode }) => {
	const { user, isLoaded, isLoading } = useUser(); // Using Clerk's hook to track user loading state

	// Check if user data is loading or not loaded yet
	if (isLoading || !isLoaded) {
		return <div>Loading user data...</div>; // Show loading while user data is being fetched
	}

	// If no user data is available
	if (!user) {
		return <div>No user data available.</div>;
	}

	// Accessing user details from Clerk
	const { firstName, lastName, emailAddresses } = user;
	const email = emailAddresses?.[0]?.emailAddress || "No email available";

	// Conditional styles for dark mode
	const containerClass = isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900";
	const sectionClass = isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900";
	const headerClass = isDarkMode ? "bg-gray-700 text-white" : "bg-green-600 text-white";

	return (
		<div className={`min-h-screen ${containerClass} p-6`}>
			<div className="container mx-auto">
				{/* Header */}
				<header className={`${headerClass} p-4 rounded-lg shadow-md mb-6`}>
					<h1 className="text-2xl font-bold">Welcome to the Former Dashboard</h1>
					<p className="text-sm">Your one-stop hub for managing farming activities.</p>
				</header>

				{/* User Info Section */}
				<section className={`${sectionClass} p-6 rounded-lg shadow-md mb-6`}>
					<h2 className="text-xl font-semibold mb-4">Your Profile</h2>
					<div>
						<p>
							<strong>Name:</strong> {firstName} {lastName}
						</p>
						<p>
							<strong>Email:</strong> {email}
						</p>
					</div>
				</section>

				{/* Crop Management Section */}
				<section className={`${sectionClass} p-6 rounded-lg shadow-md mb-6`}>
					<h2 className="text-xl font-semibold mb-4">Your Crops</h2>
					<div className="space-y-4">
						{sampleCrops.map((crop, index) => (
							<div key={index} className={`p-4 ${isDarkMode ? "bg-gray-700" : "bg-gray-200"} rounded-lg shadow`}>
								<h3 className="text-lg font-semibold">{crop.cropName}</h3>
								<p>
									<strong>Hindi Name:</strong> {crop.hindiCropName}
								</p>
								<p>
									<strong>Quantity:</strong> {crop.quantity}
								</p>
								<p>
									<strong>Price Per Unit:</strong> ₹{crop.pricePerUnit}
								</p>
								<p>
									<strong>Description:</strong> {crop.description}
								</p>
								<p className="flex items-center">
									<strong>Status:</strong>
									<span
										className={`ml-3 px-3 pb-1 mt-1 rounded-full text-white ${
											crop.status === "Sold"
												? "bg-red-600"
												: crop.status === "Pending"
												? "bg-blue-600"
												: "bg-green-500"
										}`}
									>
										{crop.status}
									</span>
								</p>
							</div>
						))}
					</div>
				</section>

				{/* Dashboard Actions */}
				<section className={`${sectionClass} p-6 rounded-lg shadow-md`}>
					<h2 className="text-xl font-semibold mb-4">Dashboard Actions</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						<div className={`p-4 ${isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"} rounded-lg shadow cursor-pointer`}>
							<h3 className="text-lg font-semibold">Manage Crops</h3>
							<p className="text-sm">View and update your crop details.</p>
						</div>
						<div className={`p-4 ${isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"} rounded-lg shadow cursor-pointer`}>
							<h3 className="text-lg font-semibold">View Market Prices</h3>
							<p className="text-sm">Check current market rates for crops.</p>
						</div>
						<div className={`p-4 ${isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"} rounded-lg shadow cursor-pointer`}>
							<h3 className="text-lg font-semibold">Order Supplies</h3>
							<p className="text-sm">Order seeds, fertilizers, and other essentials.</p>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};

export default FarmerDashboard;
