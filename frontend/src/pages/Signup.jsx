import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:5000/api/auth/signup/`,
        { username, email, password },
        { withCredentials: true }
      );
      localStorage.setItem("access", res.data.access);
      navigate("/");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <form
        onSubmit={handleRegister}
        className="card w-full max-w-sm bg-base-100 shadow-xl p-6 sm:p-8 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-base-content">
          Register
        </h2>

        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button text="Signup" type="submit" className="w-full" />

        <p className="text-sm text-center text-neutral-content">
          Already a user?{" "}
          <Link to="/login" className="link link-primary">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

