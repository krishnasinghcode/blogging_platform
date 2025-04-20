import express from 'express';
import { 
    signup, 
    login,  
    sendVerificationOTP, 
    verifyOTP, 
    sendResetOTP, 
    verifyResetOTP, 
    resetPassword 
} from '../controllers/authController.js';

const router = express.Router();

// Signup Route
router.post('/signup', signup);

// Login Route
router.post('/login', login);

// Send Email Verification OTP
router.post('/verify', sendVerificationOTP);

// Email Verification OTP check
router.post('/verify-otp', verifyOTP);

// Send Password Reset OTP
router.post('/reset-otp', sendResetOTP);

// Verify Reset OTP
router.post('/verify-reset-otp', verifyResetOTP);

// Reset Password
router.post('/reset-password', resetPassword);

export default router;
