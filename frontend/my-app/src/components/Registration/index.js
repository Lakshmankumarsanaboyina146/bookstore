import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "./index.css";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [error, setError] = useState(null);

  if (error === "User registered successfully") {
    return <Navigate to="/login" />;
  }

  const onchangeusername = (event) => setUsername(event.target.value);

  const onchangefirstname = (event) => setFirstname(event.target.value);

  const onchangelastname = (event) => setLastname(event.target.value);

  const onchangeemail = (event) => setEmail(event.target.value);

  const onchangepassword = (event) => setPassword(event.target.value);

  const onchangeconfirmpassword = (event) =>
    setConfirmpassword(event.target.value);

  const submitForm = async (event) => {
    event.preventDefault();
    /*if (
      username === "" ||
      firstname === "" ||
      lastname === "" ||
      email === "" ||
      password === "" ||
      confirmpassword === ""
    ) {
      setError("Please fill in all fields");
      return;
    }
*/
    if (password !== confirmpassword) {
      setError("Password and confirm password should be same");
      return;
    } else {
      setError("");
      const userDetails = {
        username,
        firstname,
        lastname,
        email,
        password,
      };

      const url = "http://localhost:3001/register";
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
      if (data.success) {
        setError("User registered successfully");
        console.log("User registered successfully");
      } else {
        setError(data.error);
      }
    }
  };

  return (
    <div className="registration-bg">
      <div className="container">
        <h1 className="title">Registration</h1>
        <div className="content">
          <form action="#" onSubmit={submitForm}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">FirstName</span>
                <input
                  type="text"
                  placeholder="Enter your firstname"
                  required
                  value={firstname}
                  onChange={onchangefirstname}
                />
              </div>
              <div className="input-box">
                <span className="details">LastName</span>
                <input
                  type="text"
                  placeholder="Enter your lastname"
                  value={lastname}
                  onChange={onchangelastname}
                  required
                />
              </div>

              <div className="input-box">
                <span className="details">Username</span>
                <input
                  type="text"
                  placeholder="Enter your username"
                  required
                  value={username}
                  onChange={onchangeusername}
                />
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input
                  type="text"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={onchangeemail}
                />
              </div>

              <div className="input-box">
                <span className="details">Password</span>
                <input
                  type="text"
                  placeholder="Enter your password"
                  required
                  onChange={onchangepassword}
                  value={password}
                />
              </div>

              <div className="input-box">
                <span className="details">Confirm Password</span>
                <input
                  type="text"
                  placeholder="Confirm your password"
                  required
                  onChange={onchangeconfirmpassword}
                  value={confirmpassword}
                />
              </div>
            </div>

            <div className="button">
              <button type="Submit">Register</button>
            </div>
            <p className="error">{error}</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
