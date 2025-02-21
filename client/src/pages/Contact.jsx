// src/pages/Contact.jsx

import React, { useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { useNavigate } from "react-router-dom";

const Contact = ({ isDarkMode }) => {
	const navigate = useNavigate();
	const [state, handleSubmit] = useForm("myzkoovw");
	useEffect(() => {
		if (state.succeeded) {
			setTimeout(() => {
				navigate("/");
			}, 5000);
		}
	}, [state.succeeded, navigate]);

	if (state.succeeded) {
		// return <p className={` ${isDarkMode ? 'text-green-400' : 'text-black'} text-lg flex justify-center items-center mt-20 md:mb-40 font-semibold`}>We will get back to you soon!</p>;
		return (
			<div className="flex justify-center items-center min-h-[50vh]">
				<p
					className={`
            ${
							isDarkMode
								? "text-green-400 bg-gray-800 shadow-lg shadow-green-500/50"
								: "text-black bg-white shadow-xl shadow-gray-500/40"
						} 
            text-lg font-semibold px-8 py-6 rounded-lg border border-gray-300 
            transform transition-all duration-300 hover:scale-105 hover:shadow-2xl
          `}
					style={{
						boxShadow: isDarkMode
							? "5px 5px 15px rgba(0, 255, 0, 0.5), -5px -5px 15px rgba(0, 255, 0, 0.2)"
							: "5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.8)",
					}}
				>
					We will get back to you soon!
				</p>
			</div>
		);
	}
	return (
		<div
			className={`min-h-screen flex flex-col items-center justify-center ${
				isDarkMode ? "bg-gray-900" : "bg-gray-100"
			} p-6`}
		>
			<h1
				className={`text-4xl font-bold ${
					isDarkMode ? "text-green-400" : "text-green-600"
				} mb-6`}
			>
				Contact Us
			</h1>
			<p
				className={`text-lg ${
					isDarkMode ? "text-gray-50" : "text-gray-700"
				} mb-10 text-center max-w-xl`}
			>
				Have any questions or need assistance? Reach out to us, and we'll get
				back to you as soon as possible.
			</p>

			<form
				action="https://formspree.io/f/myzkoovw"
				method="POST"
				target="_top"
				onSubmit={handleSubmit}
				className={`w-full max-w-2xl ${
					isDarkMode ? "bg-gray-800" : "bg-white"
				} rounded-lg shadow-lg p-8`}
			>
				<fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label
							className={`block ${
								isDarkMode ? "text-gray-50" : "text-gray-700"
							} text-sm font-bold mb-2`}
						>
							Business Area
						</label>
						<select
							name="business-area"
							required
							className={`w-full p-3 border ${
								isDarkMode
									? "border-gray-900 bg-gray-500 text-gray-50"
									: "border-black bg-gray-200"
							} rounded-md focus:outline-none focus:ring-2 focus:ring-green-400`}
						>
							<option value="dept-1">Sales Department</option>
							<option value="dept-2">Buyer Department</option>
						</select>
					</div>

					<div>
						<label
							className={`block ${
								isDarkMode ? "text-gray-50" : "text-gray-700"
							} text-sm font-bold mb-2`}
						>
							Type of Request
						</label>
						<select
							name="request-type"
							required
							className={`w-full p-3 border ${
								isDarkMode
									? "border-gray-900 bg-gray-500 text-gray-50"
									: "border-black bg-gray-200"
							} rounded-md focus:outline-none focus:ring-2 focus:ring-green-400`}
						>
							<option value="product-inquiry">Product Inquiry</option>
							<option value="purchase-request">Purchase Request</option>
							<option value="general-inquiry">General Inquiry</option>
						</select>
					</div>

					<div>
						<label
							className={`block ${
								isDarkMode ? "text-gray-50" : "text-gray-700"
							} text-sm font-bold mb-2`}
						>
							Title
						</label>
						<select
							name="title"
							required
							className={`w-full p-3 border ${
								isDarkMode
									? "border-gray-900 bg-gray-500 text-gray-50"
									: "border-black bg-gray-200"
							} rounded-md focus:outline-none focus:ring-2 focus:ring-green-400`}
						>
							<option value="mr">Mr</option>
							<option value="ms">Ms</option>
							<option value="mx">Mx</option>
						</select>
					</div>

					<div>
						<label
							className={`block ${
								isDarkMode ? "text-gray-50" : "text-gray-700"
							} text-sm font-bold mb-2`}
						>
							Name
						</label>
						<input
							type="text"
							name="name"
							placeholder="Name"
							required
							className={`w-full p-3 border ${
								isDarkMode
									? "border-gray-900 bg-gray-500 text-gray-50"
									: "border-black bg-gray-200"
							} rounded-md focus:outline-none focus:ring-2 focus:ring-green-400`}
						/>
					</div>

					<div>
						<label
							className={`block ${
								isDarkMode ? "text-gray-50" : "text-gray-700"
							} text-sm font-bold mb-2`}
						>
							Email
						</label>
						<input
							type="email"
							name="email"
							placeholder="jhon@gmail.com"
							required
							className={`w-full p-3 border ${
								isDarkMode
									? "border-gray-900 bg-gray-500 text-gray-50"
									: "border-black bg-gray-200"
							} rounded-md focus:outline-none focus:ring-2 focus:ring-green-400`}
						/>
					</div>

					<div>
						<label
							className={`block ${
								isDarkMode ? "text-gray-50" : "text-gray-700"
							} text-sm font-bold mb-2`}
						>
							Company
						</label>
						<input
							type="text"
							name="company"
							placeholder="name"
							// required
							className={`w-full p-3 border ${
								isDarkMode
									? "border-gray-900 bg-gray-500 text-gray-50"
									: "border-black bg-gray-200"
							} rounded-md focus:outline-none focus:ring-2 focus:ring-green-400`}
						/>
					</div>

					<div>
						<label
							className={`block ${
								isDarkMode ? "text-gray-50" : "text-gray-700"
							} text-sm font-bold mb-2`}
						>
							Country
						</label>
						<input
							type="text"
							name="country"
							placeholder="India"
							required
							className={`w-full p-3 border ${
								isDarkMode
									? "border-gray-900 bg-gray-500 text-gray-50"
									: "border-black bg-gray-200"
							} rounded-md focus:outline-none focus:ring-2 focus:ring-green-400`}
						/>
					</div>

					<div>
						<label
							className={`block ${
								isDarkMode ? "text-gray-50" : "text-gray-700"
							} text-sm font-bold mb-2`}
						>
							Phone Number
						</label>
						<input
							type="tel"
							name="phone-number"
							placeholder="+91 1234567890"
							className={`w-full p-3 border ${
								isDarkMode
									? "border-gray-900 bg-gray-500 text-gray-50"
									: "border-black bg-gray-200"
							} rounded-md focus:outline-none focus:ring-2 focus:ring-green-400`}
						/>
					</div>

					<div className="col-span-1 md:col-span-2">
						<label
							className={`block ${
								isDarkMode ? "text-gray-50" : "text-gray-700"
							} text-sm font-bold mb-2`}
						>
							Your Message
						</label>
						<textarea
							name="message"
							required
							rows="4"
							className={`w-full p-3 border ${
								isDarkMode
									? "border-gray-900 bg-gray-500 text-gray-50"
									: "border-black bg-gray-200"
							} rounded-md focus:outline-none focus:ring-2 focus:ring-green-400`}
						></textarea>
					</div>
				</fieldset>

				<div className="mt-5 flex items-start">
        {/* <label htmlFor="chechBox"></label> */}
					<input
						required
						type="checkbox"
						value="consent"
						className="w-4 h-4 mr-3 border border-gray-300 rounded appearance-none bg-gray-200 focus:ring-1 focus:ring-green-400 cursor-pointer peer checked:bg-green-500 checked:border-green-500 checked:text-white"
					/>

					<div>
						<label
							className={`block ${
								isDarkMode ? "text-gray-50" : "text-gray-700"
							} text-sm font-bold`}
						>
							Declaration of consent for data processing
						</label>
						<p
							className={`text-sm ${
								isDarkMode ? "text-gray-300/90" : "text-gray-500"
							}`}
						>
							You agree that your data from the form will be collected and
							processed to answer your request. You can revoke your consent at
							any time via email to agriconnect.com. Detailed information on
							user data handling can be found in our data protection
							declaration.
						</p>
					</div>
				</div>

				<div className="mt-6 text-center">
					<button
						type="submit"
						className="px-6 py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default Contact;
