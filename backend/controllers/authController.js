import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { sendOTPEmail } from "../utils/nodeMailer.js"; // Import email service

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Signup Controller
const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        const hashedPassword = await bcrypt.hash(String(password), 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        
        // Generate JWT Token after successful signup
        const token = jwt.sign(
            { id: savedUser._id, email: savedUser.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        
        // Set token in cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'strict',
            maxAge: 3600000 // 1 hour in milliseconds
        });

        res.status(200).json({ message: "Signup successful!" });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Signup unsuccessful!" });
    }
};

// Login Controller
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        res.clearCookie('token');

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(401).json({ message: "User does not exist, please signup!" });
        }

        const isMatch = await bcrypt.compare(String(password), existingUser.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Wrong password!" });
        }

        const token = jwt.sign(
            { id: existingUser._id, email: existingUser.email },
            process.env.JWT_SECRET,
            { expiresIn: "24h" } 
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({ message: "Login successful!" });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Login unsuccessful!" });
    }
};



// Logout Controller
const logout = async (req, res) => {
    try {
        // Clear the token cookie
        res.cookie('token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            expires: new Date(0) // Immediate expiration
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
};