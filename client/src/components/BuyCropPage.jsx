import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { PhoneCall } from "phosphor-react";
import { Phone, MapPin, Calendar, User, Mail } from "lucide-react";
import axios from "axios";

const BuyCropPage = ({ isDarkMode }) => {
	const { cropId } = useParams();
	const { backendUrl } = useContext(AppContext);
	const [crop, setCrop] = useState(null);
	const [loading, setLoading] = useState(true);
	const [farmer, setFarmer] = useState(null);

	useEffect(() => {
		if (!cropId) {
			console.error("Crop ID is undefined");
			setLoading(false);
			return;
		}

		const fetchCrop = async () => {
			try {
				const response = await axios.get(
					`${backendUrl}/api/farmer/crop/${cropId}`
				);

				if (response.data.success) {
					setCrop(response.data.crop);
					setFarmer(response.data.farmer);
				} else {
					console.error("Crop not found");
				}
			} catch (error) {
				console.error("Error fetching crop:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchCrop();
	}, [cropId, backendUrl]);

	if (loading)
		return (
			<div className="flex justify-center items-center h-screen">
				<p className="text-lg font-semibold text-green-600">
					Loading crop details...
				</p>
			</div>
		);

	if (!crop)
		return (
			<div className="flex justify-center items-center h-screen">
				<p className="text-lg font-semibold text-red-500">Crop not found</p>
			</div>
		);

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="grid md:grid-cols-2 gap-8">
				{/* Crop Details Section */}
				<div
					className={`${
						isDarkMode ? "bg-gray-800 text-white" : "bg-green-50 text-green-900"
					} p-6 rounded-lg shadow-md`}
				>
					<img
						src={crop.image || "/images/default-crop.jpg"}
						alt={crop.cropName}
						className="w-full h-64 object-cover rounded-lg mb-6"
					/>
					<h1
						className={`text-3xl font-bold ${
							isDarkMode ? "text-green-300" : "text-green-800"
						} mb-4`}
					>
						{crop.name}
					</h1>

					<div className="space-y-3">
						<p className="flex justify-between">
							<span className="font-semibold">Category:</span>
							<span>{crop.category}</span>
						</p>
						<p className="flex justify-between">
							<span className="font-semibold">Quantity:</span>
							<span>
								{crop.quantity} Quintal ({crop.quantity * 100} Kg)
							</span>
						</p>
						<p className="flex justify-between">
							<span className="font-semibold">Price per Quintal:</span>
							<span>₹{crop.price}</span>
						</p>
						<p className="flex justify-between">
							<span className="font-semibold">Price per Kg:</span>
							<span>₹{(crop.price / 100).toFixed(2)}</span>
						</p>
						<p className="flex justify-between">
							<span className="font-semibold">Total Price:</span>
							<span>₹{crop.price * crop.quantity}</span>
						</p>
						<div className="mt-4">
							<p className="font-semibold mb-2">
								Description:
								<span
									className={`ml-3 ${
										isDarkMode ? "text-gray-300" : "text-green-700"
									}`}
								>
									{crop.description}
								</span>
							</p>
						</div>

						<div className="flex items-center mt-4">
							<span className="font-semibold mr-3">Status:</span>
							<span
								className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
									crop.status === "sold"
										? "bg-red-500"
										: crop.status === "pending"
										? "bg-yellow-500"
										: "bg-green-600"
								}`}
							>
								{crop.status.toUpperCase()}
							</span>
						</div>
					</div>

					{/* Buy Now Button (Only if crop is available) */}
					{crop.status !== "sold" && (
						<button className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300 ease-in-out">
							Buy Now
						</button>
					)}
				</div>

				{/* Farmer Details Section */}
				{farmer && (
					<div
						className={`${
							isDarkMode
								? "bg-gray-800 text-white"
								: "bg-green-50 text-green-900"
						} p-6 rounded-lg shadow-md`}
					>
						{/* <h2
							className={`text-2xl font-bold ${
								isDarkMode ? "text-green-300" : "text-green-800"
							} mb-6`}
						>
							Farmer Details
						</h2> */}
						<div className="flex flex-col items-center mb-6">
							<img
								src={farmer.image || "/images/default-farmer.jpg"}
								alt={farmer.name}
								className="w-[245px] h-[245px] rounded-full object-cover border-4 border-green-600 mb-4"
							/>
							<h3 className="text-3xl font-semibold">{farmer.name}</h3>
						</div>

						<div className="space-y-3 mt-">
							<p className="flex justify-between">
								<span className="font-semibold">Email:</span>
								<span>{farmer.email}</span>
							</p>
							<p className="flex justify-between">
								<span className="font-semibold">Phone:</span>
								<span>{farmer.phone}</span>
							</p>
							<p className="flex justify-between">
								<span className="font-semibold">Gender:</span>
								<span>{farmer.gender}</span>
							</p>
							<p className="flex justify-between">
								<span className="font-semibold">Date of Birth:</span>
								<span>{new Date(farmer.dob).toLocaleDateString()}</span>
							</p>
							<p className="flex justify-between">
								<span className="font-semibold block mb-2">Address:</span>
								<span
									className={`${
										isDarkMode ? "text-gray-300" : "text-green-700"
									}`}
								>
									{farmer.address.line1} <br />
									{farmer.address.line2}
								</span>
							</p>
						</div>
						<p className="flex mt-2 justify-between items-center">
							<span className="font-semibold text-lg">Call {farmer.name}:</span>
							<a
								href={`tel:${farmer.phone}`}
								className="flex items-center gap-3 text-green-600 hover:text-green-800 dark:text-green-300 dark:hover:text-green-400 transition-all duration-300"
							>
								{farmer.phone}
								<PhoneCall
									size={24}
									weight="bold"
									className="text-red-600 dark:text-green-300 transition-transform duration-300 hover:scale-125"
								/>
							</a>
						</p>
						{/* Direct Call Button */}
						<div className="mt-14">
							<a
								href={`tel:${farmer.phone}`}
								className="w-full flex items-center justify-center bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors duration-300 ease-in-out shadow-md hover:shadow-lg gap-3"
							>
								<Phone size={20} />
								Call {farmer.name}
							</a>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default BuyCropPage;
