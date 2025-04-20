import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../utils/auth";
import InputField from "../components/InputField";
import Button from "../components/Button";
import AuthFormContainer from "../components/AuthFormContainer";

const Signup = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
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

        const result = await signupUser(formData);

        if (result.success) {
            setSuccessMessage(result.message);
            setFormData({ name: "", email: "", password: "" });

            setTimeout(() => navigate("/login"), 1500);
        } else {
            setErrorMessage(result.message);
        }

        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center h-screen bg-background">
            <AuthFormContainer title="Signup">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <InputField type="text" name="name" label="Name" value={formData.name} onChange={handleChange} />
                    <InputField type="email" name="email" label="Email" value={formData.email} onChange={handleChange} />
                    <InputField type="password" name="password" label="Password" value={formData.password} onChange={handleChange} />

                    <Button type="submit" text={loading ? "Signing up..." : "Signup"} disabled={loading} />
                </form>

                {/* Redirect to login */}
                <div className="mt-4 text-center">
                    <p>
                        Already have an account?{" "}
                        <span className="text-accent cursor-pointer" onClick={() => navigate("/login")}>
                            Login
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

export default Signup;
