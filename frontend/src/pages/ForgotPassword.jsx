import React, { useState } from "react";
import InputField from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/reset-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setMessage("OTP sent successfully.");
      setStep(2);
    } else {
      setMessage(data.message || "Failed to send OTP.");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/verify-reset-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setMessage("OTP verified.");
      setStep(3);
    } else {
      setMessage(data.message || "Invalid OTP.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        newPassword: password,
        confirmPassword: confirmPassword,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setMessage("Password reset successful!");
      setTimeout(() => navigate("/dashboard"), 1500);
    } else {
      setMessage(data.message || "Password reset failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>

        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-6">
            <InputField
              type="email"
              name="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              text={loading ? "Sending OTP..." : "Send OTP"}
              disabled={loading}
            />
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <InputField
              type="text"
              name="otp"
              label="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <Button
              type="submit"
              text={loading ? "Verifying..." : "Verify OTP"}
              disabled={loading}
            />
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-6">
            <InputField
              type="password"
              name="password"
              label="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputField
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              type="submit"
              text={loading ? "Resetting..." : "Reset Password"}
              disabled={loading}
            />
          </form>
        )}

        {message && (
          <div className="text-center mt-4 text-sm text-primary">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
