import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { sendOTPEmail } from "../utils/nodeMailer.js"; // Import email service
import { generateTokens } from "../utils/tokenUtils.js";

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Signup Controller

const signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        const hashedPassword = await bcrypt.hash(String(password), 10);
        const newUser = new User({ username, email, password: hashedPassword });
        const savedUser = await newUser.save();

        const { accessToken, refreshToken } = generateTokens(savedUser._id, savedUser.email);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(200).json({
            message: "Login successful!",
            access: accessToken,
        });

    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Signup unsuccessful!" });
    }
};


// Login Controller
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({ message: "User does not exist, please signup!" });
        }

        const isMatch = await bcrypt.compare(String(password), existingUser.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Wrong password!" });
        }

        const { accessToken, refreshToken } = generateTokens(existingUser._id, existingUser.email);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(200).json({
            message: "Login successful!",
            access: accessToken,
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Login unsuccessful!" });
    }
};


// Logout Controller
const logout = async (req, res) => {
    try {
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict'
        });
        res.status(200).json({ message: "Logout successful!" });
    } catch (error) {
        console.error("Logout Error:", error);
        res.status(500).json({ message: "Logout unsuccessful!" });
    }
};


// Send Verification OTP
const sendVerificationOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const otp = generateOTP();
        user.verifyOtp = otp; // Use verifyOtp from the schema
        user.verifyOtpExpireAt = new Date(Date.now() + 10 * 60 * 1000); // Expires in 10 minutes
        await user.save();

        await sendOTPEmail(email, otp, "Email Verification OTP");
        res.status(200).json({ message: "OTP sent to email" });
    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Verify OTP
const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });

        if (!user || user.verifyOtp !== otp || new Date() > user.verifyOtpExpireAt) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        user.isAccountVerified = true;
        user.verifyOtp = null; // Clear OTP after verification
        user.verifyOtpExpireAt = null;
        await user.save();

        res.status(200).json({ message: "OTP verified successfully!" });
    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Send Password Reset OTP
const sendResetOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const otp = generateOTP();
        user.resetOtp = otp; // Use resetOtp from the schema
        user.resetOtpExpireAt = new Date(Date.now() + 10 * 60 * 1000); // Expires in 10 minutes
        await user.save();

        await sendOTPEmail(email, otp, "Password Reset OTP");
        res.status(200).json({ message: "Reset OTP sent to email" });
    } catch (error) {
        console.error("Error sending Reset OTP:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Verify Reset OTP
const verifyResetOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });

        if (!user || user.resetOtp !== otp || new Date() > user.resetOtpExpireAt) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        // Mark OTP as verified
        user.isResetVerified = true;
        await user.save();

        res.status(200).json({ message: "OTP verified successfully! You can now reset your password." });
    } catch (error) {
        console.error("Error verifying Reset OTP:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Reset Password
const resetPassword = async (req, res) => {
    try {
        const { email, newPassword, confirmPassword } = req.body;

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match!" });
        }

        const user = await User.findOne({ email });

        // Check if OTP was verified
        if (!user || !user.isResetVerified) {
            return res.status(400).json({ message: "OTP verification required before resetting password!" });
        }

        // Reset password and clear verification status
        user.password = await bcrypt.hash(newPassword, 10);
        user.isResetVerified = false; // Prevent reuse
        user.resetOtp = null;
        user.resetOtpExpireAt = null;
        await user.save();

        res.status(200).json({ message: "Password reset successful! You can now log in." });
    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const refreshAccessToken = (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: "No refresh token" });

    jwt.verify(token, process.env.REFRESH_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid refresh token" });

        const newAccessToken = jwt.sign(
            { id: user.id },
            process.env.ACCESS_SECRET,
            { expiresIn: "15m" }
        );

        res.status(200).json({ accessToken: newAccessToken });
    });
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Export Controllers
export {
    signup,
    login,
    logout,
    sendVerificationOTP,
    verifyOTP,
    sendResetOTP,
    verifyResetOTP,
    resetPassword,
    refreshAccessToken,
    getProfile
};