import express from 'express'
import {allFarmers, getprofile, LoginFarmer, paymentRazorpay, registerFarmer, updateProfile, verifyRazorpay } from '../controllers/farmerController.js'

import upload from '../moddlewares/multer.js';
import authFarmer from '../moddlewares/farmerUser.js';

const farmerRouter = express.Router();

farmerRouter.post('/register',registerFarmer)
farmerRouter.post('/login',LoginFarmer)

farmerRouter.get('/get-profile',authFarmer,getprofile)
farmerRouter.post('/update-profile',upload.single('image'),authFarmer,updateProfile)

farmerRouter.post('/payment-razorpay',authFarmer,paymentRazorpay)
farmerRouter.post('/verifyRazorpay',authFarmer,verifyRazorpay)

farmerRouter.get('/all-farmer',allFarmers)

export default farmerRouter;