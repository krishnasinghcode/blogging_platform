import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const authenticateUser = async (req, res, next) => {
    try {
        if(process.env.DEBUG) console.log("Auth Middleware");
        const authHeader = req.headers["authorization"];
        if(process.env.DEBUG) console.log(authHeader);
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const token = authHeader.split(" ")[1];

        // ✅ Use ACCESS_SECRET now (not JWT_SECRET)
        const decoded = jwt.verify(token, process.env.ACCESS_SECRET);

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        if(process.env.DEBUG) console.log("auth middleware",user)
        req.user = user;
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        return res.status(401).json({ message: "Unauthorized" });
    }
};