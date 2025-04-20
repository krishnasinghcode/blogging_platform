import React, { useState } from "react";
import AuthFormContainer from "../components/AuthFormContainer";
import InputField from "../components/InputField";
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
            // Optional: Trigger redirect or callback here
        } else {
            setMessage(data.message || "OTP verification failed.");
        }
    };

    return (
        <AuthFormContainer title="Verify Email">
            {step === 1 && (
                <form onSubmit={handleSendEmail} className="space-y-6">
                    <InputField type="email" name="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Button type="submit" text={loading ? "Sending OTP..." : "Send Verification OTP"} disabled={loading} />
                </form>
            )}

            {step === 2 && (
                <form onSubmit={handleVerifyOtp} className="space-y-6">
                    <InputField type="text" name="otp" label="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                    <Button type="submit" text={loading ? "Verifying..." : "Verify Email"} disabled={loading} />
                </form>
            )}

            {message && <p className="text-center mt-4">{message}</p>}
        </AuthFormContainer>
    );
};

export default VerifyEmail;
