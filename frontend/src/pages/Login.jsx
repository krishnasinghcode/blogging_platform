import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/auth";
import InputField from "../components/InputField";
import Button from "../components/Button";
import AuthFormContainer from "../components/AuthFormContainer";
import ForgotPassword from "./ForgotPassword";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");
        setSuccessMessage("");

        const result = await loginUser(formData);

        if (result.success) {
            setSuccessMessage(result.message);
            setFormData({ email: "", password: "" });

            // Redirect to dashboard after successful login
            setTimeout(() => navigate("/dashboard"), 1500);
        } else {
            setErrorMessage(result.message);
        }

        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center h-screen bg-background">
            <AuthFormContainer title="Login">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <InputField type="email" name="email" label="Email" value={formData.email} onChange={handleChange} />
                    <InputField type="password" name="password" label="Password" value={formData.password} onChange={handleChange} />

                    <Button type="submit" text={loading ? "Logging in..." : "Login"} disabled={loading} />
                </form>

                {/* Redirect to Signup */}
                <div className="mt-4 text-center">
                    <p>
                        <a href="/ForgotPassword">Forgot password?</a>
                    </p>
                    <p>
                        Don't have an account?{" "}
                        <span className="text-accent cursor-pointer" onClick={() => navigate("/signup")}>
                            Signup
                        </span>
                    </p>
                </div>

                {/* Feedback Messages */}
                {errorMessage && <p className="text-red-500 mt-4 text-center">{errorMessage}</p>}
                {successMessage && <p className="text-green-500 mt-4 text-center">{successMessage}</p>}
            </AuthFormContainer>
        </div>
    );
};

export default Login;
