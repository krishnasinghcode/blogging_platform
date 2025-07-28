import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      console.error("Authorization header is missing");
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    if (!authHeader.startsWith("Bearer ")) {
      console.error("Authorization header malformed:", authHeader);
      return res.status(401).json({ message: "Unauthorized: Malformed token" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      console.error("User not found for ID:", decoded.id);
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    req.user = user;
    next();

  } catch (error) {
    if (error.name === "TokenExpiredError") {
      console.error("TokenExpiredError:", error.message);
      return res.status(401).json({ message: "TokenExpiredError" });
    }

    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
