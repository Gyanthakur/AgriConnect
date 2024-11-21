import React, { useState } from "react";
import { SignIn } from "@clerk/clerk-react";
import { UserCircle } from "phosphor-react"; // Import Phosphor icon

const FarmerLogin = ({ isDarkMode }) => {
	return (
		<div
			className={`min-h-screen flex items-center justify-center ${
				isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-800"
			}`}
		>
			<div
				className={`shadow-md rounded-lg p-6 w-full max-w-md mt-5 mb-5 ${
					isDarkMode ? "bg-gray-700 text-gray-100" : "bg-white"
				}`}
			>
				{/* Header with Icon */}
				<h2 className="text-2xl font-bold text-center mb-4 flex items-center justify-center gap-2">
					<UserCircle
						size={32}
						className={`${isDarkMode ? "text-green-300" : "text-green-600"}`}
					/>
					Farmer Login
				</h2>

				{/* Description */}
				<p className="text-center mb-6">
					Please log in to access your account.
				</p>

				{/* SignIn Component */}
				<SignIn
					path="/farmer-login"
					routing="path"
					signUpUrl="/farmer-signup"
					forceRedirectUrl={"/farmer-dashboard"}
					appearance={{
						elements: {
							card: `shadow-lg ${
								isDarkMode ? "border-gray-600" : "border-gray-300"
							}`,
							formFieldInput: `rounded-md ${
								isDarkMode
									? "bg-gray-700 border-gray-500 focus:ring-green-300"
									: "border-gray-300 focus:ring-2 focus:ring-green-500"
							}`,
							primaryButton: `font-bold py-2 px-4 rounded ${
								isDarkMode
									? "bg-green-500 hover:bg-green-400 text-white"
									: "bg-green-600 hover:bg-green-700 text-white"
							}`,
						},
					}}
				/>
			</div>
		</div>
	);
};

export default FarmerLogin;
