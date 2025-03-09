import React, { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onchangeusername = (event) => setUsername(event.target.value);
  const onchangepassword = (event) => setPassword(event.target.value);

  const token = Cookies.get("jwt_token");
  console.log(token);
  if (token !== undefined) {
    return <Navigate to="/books" replace />;
  }

  const onSubmitSuccess = (jwttoken) => {
    console.log(Cookies.set("jwt_token", jwttoken, { expires: 7 }));
    navigate("/books", { replace: true });
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
      console.log(response);
      const data = await response.json();

      if (response.ok) {
        onSubmitSuccess(data.jwt_token);
      } else {
        setError(data.error || "Invalid username or password");
      }
    } catch (error) {
      // console.error("Login error:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-bg-container">
      <div class="wrapper">
        <form action="#" onSubmit={submitForm}>
          <h2>Login</h2>
          <div class="input-field">
            <input
              type="text"
              required
              value={username}
              onChange={onchangeusername}
            />
            <label>Enter your username</label>
          </div>
          <div class="input-field">
            <input
              type="password"
              required
              value={password}
              onChange={onchangepassword}
            />
            <label>Enter your password</label>
          </div>
          <button type="submit">Log In</button>
          <div class="register">
            <Link to="/register">Don't have an account? Register</Link>
            <p>{error}</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
