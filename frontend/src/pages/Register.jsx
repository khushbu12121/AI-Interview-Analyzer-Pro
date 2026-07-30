import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await api.post(
    "/register",
    {
        name,
        email,
        password,
    }
);

      alert(response.data.message);

      navigate("/login");
    } catch (error) {
      console.log(error);

      alert("Registration Failed");
    }
  };

  return (
    <div className="register-page">

      <div className="register-card">

        <div className="register-header">

          <div className="register-logo">
            🤖
          </div>

          <h1>Create Account</h1>

          <p>
            Start your AI Interview journey today.
          </p>

        </div>

        <div className="input-group">

          <FiUser className="input-icon" />

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

        </div>

        <div className="input-group">

          <FiMail className="input-icon" />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

        </div>

        <div className="input-group">

          <FiLock className="input-icon" />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            className="password-toggle"
            onClick={() =>
              setShowPassword(!showPassword)
            }
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>

        </div>

        <div className="input-group">

          <FiLock className="input-icon" />

          <input
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
          />

          <span
            className="password-toggle"
            onClick={() =>
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }
          >
            {showConfirmPassword ? (
              <FiEyeOff />
            ) : (
              <FiEye />
            )}
          </span>

        </div>

        <div className="register-options">

          <label>

            <input type="checkbox" />

            I agree to the Terms & Conditions

          </label>

        </div>

        <button
          className="register-button"
          onClick={handleRegister}
        >
          Create Account
        </button>

        <div className="register-footer">

          Already have an account?

          <Link to="/login">
            Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Register;