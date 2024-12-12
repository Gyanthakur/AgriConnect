import validator from "validator";
import bcript from "bcrypt";
import farmerModel from "../models/farmerModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
// import doctorModel from "../models/doctorModel.js";
// import appointmentModel from "../models/appointmentModel.js";
import razorpay from "razorpay";
// api to resister farmer

const registerFarmer = async (req, res) => {
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

		// hashing farmer password
		const salt = await bcript.genSalt(10);
		const hashedPassword = await bcript.hash(password, salt);

		const farmerData = {
			name,
			email,
			password: hashedPassword,
		};
		const newFarmer = new farmerModel(farmerData);
		const farmer = await newFarmer.save();

		const token = jwt.sign({ id: farmer._id }, process.env.JWT_SECRET);
		res.json({ success: true, token });
	} catch (error) {
		console.error(error);
		res.json({ success: false, message: error.message });
	}
};

// API for Login farmer
const LoginFarmer = async (req, res) => {
	try {
		const { email, password } = req.body;
		const farmer = await farmerModel.findOne({ email });

		if (!farmer) {
			return res.json({ success: false, message: "farmer doesn't exist!" });
		}

		const isMatch = await bcript.compare(password, farmer.password);
		if (isMatch) {
			const token = jwt.sign({ id: farmer._id }, process.env.JWT_SECRET);
			res.json({ success: true, token });
		} else {
			res.json({ success: false, message: "Invalid credentials" });
		}
	} catch (error) {
		console.error(error);
		res.json({ success: false, message: error.message });
	}
};

// API to get farmer profile data

const getprofile = async (req, res) => {
	try {
		const { farmerId } = req.body;
		const farmerData = await farmerModel.findById(farmerId).select("-password");
		res.json({ success: true, farmerData });
	} catch (error) {
		console.error(error);
		res.json({ success: false, message: error.message });
	}
};

// API for update farmer profile

const updateProfile = async (req, res) => {
	try {
		const { farmerId, name, phone, address, dob, gender } = req.body;
		const imageFile = req.file;

		if (!name || !phone || !dob || !gender) {
			return res.json({ success: false, message: "Missing data" });
		}

		await farmerModel.findByIdAndUpdate(farmerId, {
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

			await farmerModel.findByIdAndUpdate(farmerId, { image: imageURL });
		}

		res.json({ success: true, message: "Profile Updated" });
	} catch (error) {
		console.error(error);
		res.json({ success: false, message: error.message });
	}
};

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
	registerFarmer,
	LoginFarmer,
	getprofile,
	updateProfile,
	paymentRazorpay,
	verifyRazorpay,
};
