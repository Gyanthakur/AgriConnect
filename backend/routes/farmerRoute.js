import express from 'express'
// import {addProduct, allFarmers, deleteProduct, getAllProducts, getProductById, getprofile, LoginFarmer,  registerFarmer, updateProduct, updateProfile } from '../controllers/farmerController.js'
import {allFarmers, getProfile, LoginFarmer, paymentRazorpay, registerFarmer, updateProfile, verifyRazorpay } from '../controllers/farmerController.js'

import upload from '../moddlewares/multer.js';
import authFarmer from '../moddlewares/farmerUser.js';
import cropRouter from './cropRoutes.js';

const farmerRouter = express.Router();

farmerRouter.post('/register',registerFarmer)
farmerRouter.post('/login',LoginFarmer)

farmerRouter.get('/get-profile',authFarmer,getProfile)
farmerRouter.post('/update-profile',upload.single('image'),authFarmer,updateProfile)



// farmerRouter.post('/payment-razorpay',authFarmer,paymentRazorpay)
// farmerRouter.post('/verifyRazorpay',authFarmer,verifyRazorpay)

farmerRouter.get('/all-farmer',allFarmers)

farmerRouter.use("/crop", cropRouter);



export default farmerRouter;
