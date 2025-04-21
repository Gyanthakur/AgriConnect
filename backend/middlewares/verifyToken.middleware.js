import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
export default function verifyToken(
    req,
    res,
    next
) {
    try {
        const bearerToken = req.header("Authorization");
        if (!bearerToken || !bearerToken.startsWith("Bearer "))
            return res.status(403).json({ success: false, message: "Missing Token" });
        const token = bearerToken ? bearerToken.split(" ")[1] : undefined;
        if (!token) return res.status(403).json({ success: false, message: "Missing Token" });
        jwt.verify(
            token,
            process.env.JWT_SECRET ?? "",
            async (err, user) => {
                if (err)
                    return res.status(403).json({ success: false, message: "Invalid Token" });
                if (!user) return res.status(403).json({ success: false, message: "Invalid Token" });
                const userDetails = await UserModel.findById(user.id).select("name email phoneNumber firstName lastName profileImage verified image").lean();
                if (!userDetails) return res.status(403).json({ success: false, message: "Invalid Token" });
                req.user = userDetails;
                next();
            }
        );
    } catch (error) {
        console.error("Error in verifyToken middleware:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}