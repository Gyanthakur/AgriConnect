import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
export default function getToken(req, res, next) {
    try {
        const bearerToken = req.header("Authorization");
        if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
            return next(); // return to stop further execution
        }

        const token = bearerToken.split(" ")[1];
        if (!token) {
            return next();
        }

        jwt.verify(token, process.env.JWT_SECRET ?? "", async (err, user) => {
            if (err || !user || !user?.id) {
                return next();
            }

            const userDetails = await UserModel.findById(user.id).select("-password -__v -createdAt -updatedAt");
            if (!userDetails) {
                return next();
            }

            req.user = userDetails;
            return next();
        });
    } catch (error) {
        console.error("Error in getToken middleware:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}
