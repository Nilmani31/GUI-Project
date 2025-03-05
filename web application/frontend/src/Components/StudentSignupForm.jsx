import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./StudentSignupForm.css"; 

const StudentSignup = () => {
  const [Susername, setUsername] = useState("");
  const [Semail, setEmail] = useState("");
  const [Spassword, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (Spassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5215/api/students", {
        username: Susername,
        email: Semail,
        password: Spassword,
      });

      if (response.status === 200) {
        alert("Signup successful!");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        navigate("/login"); // Redirect to login page
      }
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signuppage">
        <h2>Student Signup</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <form onSubmit={handleSignup}>
          <input type="text" placeholder="Username" value={Susername} onChange={(e) => setUsername(e.target.value)} required />
          <input type="email" placeholder="Email" value={Semail} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={Spassword} onChange={(e) => setPassword(e.target.value)} required />
          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          <button  className = "signupbutton" type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default StudentSignup;

