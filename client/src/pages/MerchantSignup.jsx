import React from "react";
import { SignUp } from "@clerk/clerk-react";
import { UserCircle } from "phosphor-react";

const MerchantSignup = ({ isDarkMode }) => {
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
						className={`${isDarkMode ? "text-yellow-400" : "text-green-600"}`}
					/>
					Merchant SignUp
				</h2>

				{/* Description */}
				<p className="text-center mb-6">
					Please log in or sign up to access your dashboard.
				</p>

				{/* SignUp Component */}
				<div className="mt-6">
					<h3 className="text-center text-lg font-medium mb-4">
						New here? Sign up below.
					</h3>
					<SignUp
						path="/merchant-signup" // Updated path
						routing="path"
						afterSignUpUrl="/merchant-dashboard" // Redirect to merchant dashboard after sign up
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
		</div>
	);
};

export default MerchantSignup;
