import React, { useState } from "react";
import { SignIn } from "@clerk/clerk-react";
import { ShoppingBag, UserCircle } from "phosphor-react"; // Import a merchant-related icon

const MerchantLogin = ({ isDarkMode }) => {
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
						className={`${isDarkMode ? "text-yellow-400" : "text-blue-600"}`}
					/>
					Merchant Login
				</h2>

				{/* Description */}
				<p className="text-center mb-6">
					Welcome back! Please log in to manage your store.
				</p>

				{/* SignIn Component */}
				<SignIn
					path="/merchant-login"
					routing="path"
					signUpUrl="/merchant-signup"
					forceRedirectUrl={"/merchant-dashboard"}
					appearance={{
						elements: {
							card: `shadow-lg ${
								isDarkMode ? "border-gray-600" : "border-gray-300"
							}`,
							formFieldInput: `rounded-md ${
								isDarkMode
									? "bg-gray-700 border-gray-500 focus:ring-blue-300"
									: "border-gray-300 focus:ring-2 focus:ring-blue-500"
							}`,
							primaryButton: `font-bold py-2 px-4 rounded ${
								isDarkMode
									? "bg-blue-500 hover:bg-blue-400 text-white"
									: "bg-blue-600 hover:bg-blue-700 text-white"
							}`,
						},
					}}
				/>
			</div>
		</div>
	);
};

export default MerchantLogin;
