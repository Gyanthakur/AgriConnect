import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MerchantProfile = ({isDarkMode}) => {
	const { backendUrl,mtoken,
		setMtoken,
		merchantData,
		setMerchantData,
		loadMerchantProfileData, } = useContext(AppContext);
	console.log(merchantData);
	

	const [isEdit, setIsEdit] = useState(false);
	const [image, setimage] = useState(false);
	const [isLoading, setIsLoading] = useState(false); // Loader state

	const updateuserProfileData = async () => {
		setIsLoading(true); // Show loader
		try {
			const formData = new FormData();
			formData.append("name", merchantData.name);
			formData.append("phone", merchantData.phone);
			formData.append("address", JSON.stringify(merchantData.address));
			formData.append("gender", merchantData.gender);
			formData.append("dob", merchantData.dob);

			image && formData.append("image", image);

			const { data } = await axios.post(
				backendUrl + "/api/merchant/update-profile",
				formData,
				{ headers: { mtoken } }
			);

			if (data.success) {
				toast.success(data.message);
				await loadMerchantProfileData();
				setIsEdit(false);
				setimage(false);
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
		setIsLoading(false); // Hide loader after operation
	};

	return (
		merchantData && (
			<div className={`max-w-lg flex rounded-md flex-col ${isDarkMode? 'text-white bg-gray-800' : ''} gap-2 text-sm pl-10 m-10`}>
				{/* Image upload and edit */}
				{isEdit ? (
					<label htmlFor="image">
						<div className="inline-block relative cursor-pointer mt-5">
							<img
								className="w-36 rounded opacity-75"
								src={image ? URL.createObjectURL(image) : merchantData.image}
								alt=""
							/>
							<img
								className="w-10 absolute bottom-12 right-12"
								src={image ? "" : assets.upload_icon}
								alt=""
							/>
						</div>
						<input
							onChange={(e) => setimage(e.target.files[0])}
							type="file"
							id="image"
							hidden
						/>
					</label>
				) : (
					<img className="w-36 mt-6 rounded" src={merchantData.image} alt="" />
				)}

				{/* Name input */}
				{isEdit ? (
					<input
						className={`${isDarkMode ? 'text-green-400 bg-gray-700' : 'bg-gray-50'}  text-3xl font-medium max-w-60 mt-4`}
						type="text"
						value={merchantData.name}
						onChange={(e) =>
							setMerchantData((prev) => ({ ...prev, name: e.target.value }))
						}
					/>
				) : (
					<p className={`font-medium text-3xl ${isDarkMode? 'text-white bg-gray-800' : 'text-neutral-800'}  mt-4`}>
						{merchantData.name}
					</p>
				)}
				<hr className="bg-zinc-400 h-[1px] border-none" />

				{/* Contact information */}
				<div>
					<p className={` ${isDarkMode? 'text-gray-300 bg-gray-800' : 'text-neutral-500'}   underline mt-3`}>CONTACT INFORMATION</p>
					<div className={`grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 ${isDarkMode? 'text-gray-200 bg-gray-800' : 'text-neutral-700'}  `}>
						<p className="font-medium">Email id:</p>
						<p className="text-blue-500">{merchantData.email}</p>
						<p className="font-medium">Phone:</p>
						{isEdit ? (
							<input
								className={`${isDarkMode ? 'text-green-400 bg-gray-700' : 'bg-gray-100 '} max-w-52`}
								type="tel"
								value={merchantData.phone}
								onChange={(e) =>
									setMerchantData((prev) => ({
										...prev,
										phone: e.target.value,
									}))
								}
							/>
						) : (
							<p className="text-blue-400">{merchantData.phone}</p>
						)}

						<p className="font-medium">Address:</p>
						{isEdit ? (
							<p>
								<input
									className={`${isDarkMode? 'text-green-500 bg-gray-700' : 'bg-gray-50'} `}
									value={merchantData.address.line1}
									onChange={(e) =>
										setMerchantData((prev) => ({
											...prev,
											address: { ...prev.address, line1: e.target.value },
										}))
									}
									type="text"
								/>
								<br />
								<input
									className={`${isDarkMode? 'text-green-500 bg-gray-700' : 'bg-gray-50'} `}
									value={merchantData.address.line2}
									onChange={(e) =>
										setMerchantData((prev) => ({
											...prev,
											address: { ...prev.address, line2: e.target.value },
										}))
									}
									type="text"
								/>
							</p>
						) : (
							<p className="text-gray-500">
								{merchantData.address.line1}
								<br />
								{merchantData.address.line2}
							</p>
						)}
					</div>
				</div>

				{/* Basic information */}
				<div>
					<p className={` ${isDarkMode? 'text-gray-300 bg-gray-800' : 'text-neutral-500'}   underline mt-3`}>BASIC INFORMATION</p>
					<div className={`grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 ${isDarkMode? 'text-gray-200 bg-gray-800' : 'text-neutral-700'}  `}>
						<p className="font-medium">Gender:</p>
						{isEdit ? (
							<select
								className={`max-w-20 ${isDarkMode? 'text-green-500 bg-gray-700' : 'bg-gray-100'}`}
								onChange={(e) =>
									setMerchantData((prev) => ({ ...prev, gender: e.target.value }))
								}
								value={merchantData.gender}
							>
								<option value="Male">Male</option>
								<option value="Female">Female</option>
							</select>
						) : (
							<p className="text-gray-400">{merchantData.gender}</p>
						)}

						<p className="font-medium">Birthday:</p>
						{isEdit ? (
							<input
								className={`${isDarkMode? 'text-green-500 bg-gray-700' : 'bg-gray-100'} max-w-28 `} 
								onChange={(e) =>
									setMerchantData((prev) => ({ ...prev, dob: e.target.value }))
								}
								value={merchantData.dob}
								type="date"
							/>
						) : (
							<p className="text-gray-400">{merchantData.dob}</p>
						)}
					</div>
				</div>

				{/* Save and Edit buttons */}
				<div className="mt-10 mb-5">
					{isEdit ? (
						<button
							className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
							onClick={updateuserProfileData}
							disabled={isLoading} // Disable button while loading
						>
							{isLoading ? (
								<div className="flex items-center justify-center">
									{/* Loader */}
									<div className="w-5 h-5 border-4 border-black border-t-transparent border-solid rounded-full animate-spin"></div>
									<span className="ml-2">Saving...</span>
								</div>
							) : (
								"Save information"
							)}
						</button>
					) : (
						<button
							className="border mb-6 border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
							onClick={() => setIsEdit(true)}
						>
							Edit
						</button>
					)}
				</div>
			</div>
		)
	);
};

export default MerchantProfile;