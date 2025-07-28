import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import GoogleLoginButton from "../components/GoogleLoginButton";
import Button from "../components/Button";
import Input from "../components/Input";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:5000/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      localStorage.setItem("accessToken", res.data.access);
      navigate('/');
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <form
        onSubmit={handleLogin}
        className="card w-full max-w-sm bg-base-100 shadow-xl p-6 sm:p-8 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-base-content">
          Login
        </h2>

        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        <Button text="Login" type="submit" className="w-full" />

        <div className="divider">OR</div>
        <GoogleLoginButton />

        <p className="text-sm text-center text-neutral-content">
          New here?{" "}
          <Link to="/signup" className="link link-primary">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}
