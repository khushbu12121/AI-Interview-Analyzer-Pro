import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import {
FiMail,
FiLock,
FiEye,
FiEyeOff
} from "react-icons/fi";

import "./Login.css";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/login",
        {
          email,
          password,
        }
      );

      console.log("LOGIN RESPONSE =", JSON.stringify(response.data, null, 2));

localStorage.setItem(
  "token",
  response.data.access_token
);

console.log(
  "ACCESS TOKEN =",
  response.data.access_token
);

console.log(
  "TOKEN SAVED =",
  localStorage.getItem("token")
);

alert("Login Successful!");

      navigate("/dashboard");

    } catch (error) {
      console.log(error);

      alert("Login Failed!");
    }
  };

  return (

<div className="login-page">

<div className="login-card">


<div className="login-header">
<div className="login-logo">

🤖

</div>
<h1>Welcome Back 👋</h1>

<p>
Login to continue your AI Interview journey.
</p>

</div>

<form onSubmit={handleLogin}>

<div className="input-group">

<FiMail className="input-icon" />

<input
type="email"
placeholder="Enter your email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
/>

</div>

<div className="input-group">

<FiLock className="input-icon" />

<input
type={showPassword ? "text" : "password"}
placeholder="Enter your password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>
<span
className="password-toggle"
onClick={() => setShowPassword(!showPassword)}
>

{showPassword ? <FiEyeOff /> : <FiEye />}

</span>
</div>
<div className="login-options">

<label>

<input type="checkbox"/>

Remember Me

</label>

<a href="#">

Forgot Password?

</a>

</div>

<button
type="submit"
className="login-button"
>

Login

</button>

<div className="login-footer">

Don't have an account?

<Link to="/register">

Register

</Link>

</div>

</form>

</div>

</div>

);
}

export default Login;