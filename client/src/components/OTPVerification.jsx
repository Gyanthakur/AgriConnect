import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OTPVerification = ({ isDarkMode }) => {
	const [otp, setOtp] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleOTPSubmit = () => {
		// Simulate OTP verification
		if (otp === "123456") {
			// Redirect to Farmer Dashboard on successful OTP
			navigate("/farmer-dashboard");
		} else {
			setError("Invalid OTP. Please try again.");
		}
	};

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
				<h2 className="text-2xl font-bold text-center mb-4">OTP Verification</h2>
				<p className="text-center mb-6">Enter the OTP sent to your registered mobile number.</p>

				{/* OTP Input Field */}
				<input
					type="text"
					placeholder="Enter OTP"
					value={otp}
					onChange={(e) => setOtp(e.target.value)}
					className={`w-full p-2 border rounded-md mb-4 ${
						isDarkMode
							? "bg-gray-700 border-gray-500 text-white"
							: "border-gray-300 text-gray-800"
					}`}
				/>

				{/* Error Message */}
				{error && <p className="text-red-500 text-sm mb-4">{error}</p>}

				{/* Submit Button */}
				<button
					onClick={handleOTPSubmit}
					className={`w-full py-2 px-4 rounded ${
						isDarkMode
							? "bg-green-500 hover:bg-green-400 text-white"
							: "bg-green-600 hover:bg-green-700 text-white"
					}`}
				>
					Verify OTP
				</button>
			</div>
		</div>
	);
};

export default OTPVerification;
