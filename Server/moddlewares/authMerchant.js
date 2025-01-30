import jwt from "jsonwebtoken";

// Doctor authentication middlewares

const authMerchant = async (req, res, next) => {
	try {

        // mtoken = merchant token
        const {mtoken} = req.headers;
        if(!mtoken){
            return res.json({success:false,message:"Not Authorized Login Again!"})
        }
        const tokenDecode = jwt.verify(mtoken,process.env.JWT_SECRET);
        req.body.merchantId = tokenDecode.id;

        next();


	} catch (error) {
		console.error(error);
		res.json({ success: false, message: error.message });
	}
};

export default authMerchant;
