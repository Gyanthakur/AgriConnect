import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CropAdvisory = ({ isDarkMode }) => {
	const navigate = useNavigate();

	const handleGetStarted = () => {
		const farmerToken = localStorage.getItem("token");
		const merchantToken = localStorage.getItem("mtoken");
		console.log(farmerToken, merchantToken);

		if (farmerToken) {
			navigate("/farmer-dashboard");
		} else if (merchantToken) {
			navigate("/merchant-dashboard");
		} else {
			navigate("/login");
		}
	};

	return (
		<div
			className={`flex flex-col items-center justify-center min-h-screen p-6 transition-colors ${
				isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
			}`}
		>
			<header className="text-4xl font-extrabold leading-normal text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-400">
				Crop Advisory
			</header>
			<main
				className={`mt-6 p-8 rounded-lg shadow-lg max-w-3xl transition-colors ${
					isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
				}`}
			>
				<h2
					className={`text-3xl font-semibold ${
						isDarkMode ? "text-green-400" : "text-green-500"
					} `}
				>
					Why Crop Advisory?
				</h2>
				<p className="mt-4 text-lg">
					Our Crop Advisory service helps farmers and agricultural enthusiasts
					make informed decisions about crop selection, soil health, pest
					control, and best practices for each season. We provide expert
					guidance tailored to your location and farm conditions.
				</p>
				<h3
					className={`text-3xl font-semibold ${
						isDarkMode ? "text-green-400" : "text-green-500"
					} `}
				>
					Key Features
				</h3>
				<ul className="mt-3 list-disc list-inside text-lg">
					<li>Personalized crop recommendations</li>
					<li>Soil health analysis and improvement tips</li>
					<li>Guidance on pest and disease management</li>
					<li>Seasonal best practices for optimal yield</li>
					<li>Weather-based farming suggestions</li>
				</ul>
				<h3
					className={`text-3xl font-semibold ${
						isDarkMode ? "text-green-400" : "text-green-500"
					} `}
				>
					How It Works?
				</h3>
				<p className="mt-3 text-lg">
					Simply provide details about your location, soil type, and preferred
					crops. Our AI-driven system, backed by agricultural experts, will
					offer the best farming practices tailored to your needs.
				</p>
				<div className="mt-6 flex justify-center">
					<button
						className="px-6 py-3 bg-green-500 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition"
						onClick={handleGetStarted}
					>
						Get Started
					</button>
				</div>
			</main>
		</div>
	);
};

export default CropAdvisory;
