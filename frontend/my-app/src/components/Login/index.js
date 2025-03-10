import React, { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import "./index.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showpassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onchangeusername = (event) => setUsername(event.target.value);
  const onchangepassword = (event) => setPassword(event.target.value);

  const token = Cookies.get("jwt_token");
  console.log(token);
  if (token !== undefined) {
    return <Navigate to="/" replace />;
  }

  const onSubmitSuccess = (jwttoken) => {
    console.log(Cookies.set("jwt_token", jwttoken, { expires: 7 }));
    navigate("/", { replace: true });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showpassword);
  };

  const submitForm = async (event) => {
    event.preventDefault();

    // Input validation
    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }

    setError("");

    const userDetails = { username, password };

    try {
      const url = "http://localhost:3001/login";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      };

      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        onSubmitSuccess(data.jwtToken);
      } else {
        setError(data.error || "Invalid username or password");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-bg-container">
      <div className="wrapper">
        <form action="#" onSubmit={submitForm}>
          <h2>Login</h2>
          <div className="input-field">
            <input
              type="text"
              required
              value={username}
              onChange={onchangeusername}
            />
            <label>Enter your username</label>
          </div>
          <div className="input-field">
            <input
              type={showpassword ? "text" : "password"}
              required
              value={password}
              onChange={onchangepassword}
            />
            <span
              onClick={togglePasswordVisibility}
              className="icon"
              aria-label={showpassword ? "Hide password" : "Show password"}>
              {showpassword ? <FaEye /> : <FaEyeSlash />}
            </span>
            <label>Enter your password</label>
          </div>
          <button type="submit">Log In</button>
          <div className="register">
            <Link to="/register">Don't have an account? Register</Link>
            <p>{error}</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
