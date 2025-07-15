import React, { useState } from "react";
import InputField from "../components/Input";
import Button from "../components/Button";

const VerifyEmail = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setMessage("OTP sent to your email.");
      setStep(2);
    } else {
      setMessage(data.message || "Failed to send OTP.");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setMessage("Email verified successfully.");
      // Optional redirect or state update
    } else {
      setMessage(data.message || "OTP verification failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="w-full max-w-md bg-base-200 p-8 rounded-2xl shadow-xl border border-base-300">
        <h2 className="text-2xl font-bold text-center mb-6">Verify Email</h2>

        {step === 1 && (
          <form onSubmit={handleSendEmail} className="space-y-6">
            <InputField
              type="email"
              name="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              text={loading ? "Sending OTP..." : "Send Verification OTP"}
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
              text={loading ? "Verifying..." : "Verify Email"}
              disabled={loading}
            />
          </form>
        )}

        {message && (
          <div className="mt-4 text-center text-sm text-info">{message}</div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
