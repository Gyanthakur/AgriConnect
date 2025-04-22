import jwt from "jsonwebtoken";
export const generateJWT = (payload, secret, expiresIn = "30d") => {
    try {
        return jwt.sign(payload, secret, { expiresIn });
    } catch (error) {
        console.error("Error generating JWT:", error);
        return null;
    }
};