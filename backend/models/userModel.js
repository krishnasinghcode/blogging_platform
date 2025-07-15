import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // Account Verification
    verifyOtp: { type: String, default: "" },
    verifyOtpExpireAt: { type: Date, default: Date.now },
    isAccountVerified: { type: Boolean, default: false },

    // Password Reset
    resetOtp: { type: String, default: "" },
    resetOtpExpireAt: { type: Date, default: Date.now },
    isResetVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
