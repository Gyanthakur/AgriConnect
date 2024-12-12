import validator from "validator";
import bcript from "bcrypt";

import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

import razorpay from "razorpay";
import merchantModel from "../models/merchantModel.js";
// api to resister merchant

const registerMerchant = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		if (!name || !email || !password) {
			return res.json({ success: false, message: "Missing Details" });
		}

		// validating email format
		if (!validator.isEmail(email)) {
			return res.json({
				success: false,
				message: "Please enter a valid email!",
			});
		}

		// validating strong password
		if (password.length < 8) {
			return res.json({ success: false, message: "Enter a strong password!" });
		}

		// hashing merchant password
		const salt = await bcript.genSalt(10);
		const hashedPassword = await bcript.hash(password, salt);

		const merchantData = {
			name,
			email,
			password: hashedPassword,
		};
		const newMerchant = new merchantModel(merchantData);
		const merchant = await newMerchant.save();

		const mtoken = jwt.sign({ id: merchant._id }, process.env.JWT_SECRET);
		res.json({ success: true, mtoken });
	} catch (error) {
		console.error(error);
		res.json({ success: false, message: error.message });
	}
};

// API for Login merchant
const LoginMerchant = async (req, res) => {
	try {
		const { email, password } = req.body;
		const merchant = await merchantModel.findOne({ email });

		if (!merchant) {
			return res.json({ success: false, message: "merchant doesn't exist!" });
		}

		const isMatch = await bcript.compare(password, merchant.password);
		if (isMatch) {
			const mtoken = jwt.sign({ id: merchant._id }, process.env.JWT_SECRET);
			res.json({ success: true, mtoken });
		} else {
			res.json({ success: false, message: "Invalid credentials" });
		}
	} catch (error) {
		console.error(error);
		res.json({ success: false, message: error.message });
	}
};

// API to get merchant profile data

const getprofile = async (req, res) => {
	try {
		const { merchantId } = req.body;
		const merchantData = await merchantModel.findById(merchantId).select("-password");
		res.json({ success: true, merchantData });
	} catch (error) {
		console.error(error);
		res.json({ success: false, message: error.message });
	}
};

// API for update merchant profile

// const updateProfile = async (req, res) => {
// 	try {
// 		const { merchantId, name, phone, address, dob, gender } = req.body;
// 		const imageFile = req.file;

// 		if (!name || !phone || !dob || !gender) {
// 			return res.json({ success: false, message: "Missing data" });
// 		}

// 		await merchantModel.findByIdAndUpdate(merchantId, {
// 			name,
// 			phone,
// 			address: JSON.parse(address),
// 			dob,
// 			gender,
// 		});

// 		if (imageFile) {
// 			// upload image to clouduinary
// 			const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
// 				resource_type: "image",
// 			});

// 			const imageURL = imageUpload.secure_url;

// 			await merchantModel.findByIdAndUpdate(merchantId, { image: imageURL });
// 		}

// 		res.json({ success: true, message: "Profile Updated" });
// 	} catch (error) {
// 		console.error(error);
// 		res.json({ success: false, message: error.message });
// 	}
// };


const updateProfile = async (req, res) => {
	try {
		const { merchantId, name, phone, address, dob, gender } = req.body;
		const imageFile = req.file;

		if (!name || !phone || !dob || !gender) {
			return res.json({ success: false, message: "Missing data" });
		}

		await merchantModel.findByIdAndUpdate(merchantId, {
			name,
			phone,
			address: JSON.parse(address),
			dob,
			gender,
		});

		if (imageFile) {
			// upload image to clouduinary
			const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
				resource_type: "image",
			});

			const imageURL = imageUpload.secure_url;

			await merchantModel.findByIdAndUpdate(merchantId, { image: imageURL });
		}

		res.json({ success: true, message: "Profile Updated" });
	} catch (error) {
		console.error(error);
		res.json({ success: false, message: error.message });
	}
};

// const updateProfile = async (req, res) => {
// 	try {
// 		const { merchantId, name, phone, address, dob, gender } = req.body;
// 		const imageFile = req.file;

// 		// Check for required fields
// 		if (!name || !phone || !dob || !gender) {
// 			return res.json({ success: false, message: "Missing data" });
// 		}

// 		// Parse the address if it's provided
// 		let parsedAddress = null;
// 		if (address) {
// 			try {
// 				parsedAddress = JSON.parse(address);
// 			} catch (error) {
// 				return res.json({ success: false, message: "Invalid address format" });
// 			}
// 		}

// 		// Update merchant profile
// 		await merchantModel.findByIdAndUpdate(merchantId, {
// 			name,
// 			phone,
// 			address: parsedAddress,
// 			dob,
// 			gender,
// 		});

// 		// Handle image upload if provided
// 		if (imageFile) {
// 			const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
// 				resource_type: "image",
// 			});
// 			const imageURL = imageUpload.secure_url;

// 			await merchantModel.findByIdAndUpdate(merchantId, { image: imageURL });
// 		}

// 		res.json({ success: true, message: "Profile Updated" });
// 	} catch (error) {
// 		console.error(error);
// 		res.json({ success: false, message: error.message });
// 	}
// };


const razorpayInstance = new razorpay({
	key_id: process.env.RAZORPAY_KAY_ID,
	key_secret: process.env.RAZORPAY_KAY_SECRET,
});
// API to make payment of appointment uding razorpay
const paymentRazorpay = async (req, res) => {
	try {
		const { appointmentId } = req.body;

		const appointmentData = await appointmentModel.findById(appointmentId);
		if (!appointmentData || appointmentData.cancelled) {
			return res.json({
				success: false,
				message: "Appointment Cancelled or not found!",
			});
		}

		// creating options for razorpay payment
		const options = {
			amount: appointmentData.amount * 100,
			currency: process.env.CURRENCY,
			receipt: appointmentId,
		};

		// creation of an order
		const order = await razorpayInstance.orders.create(options);
		res.json({ success: true, order });
	} catch (error) {
		console.error(error);
		res.json({ success: false, message: error.message });
	}
};

// API to verify payment of razorpay

const verifyRazorpay = async (req, res) => {
	try {
		const { razorpay_order_id } = req.body;
		const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

		if (orderInfo.status === "paid") {
			await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {
				payment: true,
			});
			res.json({ success: true, message: "Payment successfylly paid." });
		} else {
			res.json({ success: false, message: "Payment failed!" });
		}
	} catch (error) {
		console.error(error);
		res.json({ success: false, message: error.message });
	}
};

export {
	registerMerchant,
	LoginMerchant,
	getprofile,
	updateProfile,
	paymentRazorpay,
	verifyRazorpay,
};
